/**
 * Haptic feedback utility for key interactions.
 *
 * Fires only on devices that support the Vibration API.
 * Falls back silently — haptics are never required for usability.
 *
 * Permitted intents (design-spec enforced):
 *  - confirm  → primary CTA taps, booking success
 *  - select   → filter chip / tab selection on mobile
 *  - warning  → destructive confirmation prompt
 *  - success  → important state confirmations
 *
 * Reference: https://www.mintlify.com/lochie/web-haptics/guides/react
 */

type HapticIntent = "confirm" | "select" | "warning" | "success";

const patterns: Record<HapticIntent, number | number[]> = {
  confirm: 10,
  select: 6,
  warning: [15, 40, 15],
  success: [10, 30, 10],
};

function canVibrate(): boolean {
  return typeof navigator !== "undefined" && "vibrate" in navigator;
}

export function haptic(intent: HapticIntent): void {
  if (!canVibrate()) return;
  try {
    navigator.vibrate(patterns[intent]);
  } catch {
    // Silently degrade — never block interaction.
  }
}

// React hook wrapper for components that need declarative access.
import { useCallback } from "react";

export function useHaptic() {
  const fire = useCallback((intent: HapticIntent) => {
    haptic(intent);
  }, []);

  return fire;
}
