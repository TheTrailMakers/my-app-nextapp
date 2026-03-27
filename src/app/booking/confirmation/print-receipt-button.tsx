"use client";

import { FiDownload } from "react-icons/fi";

export default function PrintReceiptButton() {
  return (
    <button
      onClick={() => window.print()}
      className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-card py-2 font-bold text-foreground transition hover:bg-muted"
    >
      <FiDownload /> Download Receipt
    </button>
  );
}
