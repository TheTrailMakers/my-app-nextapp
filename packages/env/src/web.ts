import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  clientPrefix: "VITE_",
  client: {
    VITE_RAZORPAY_KEY_ID: z.string().min(1),
    VITE_SERVER_URL: z.url(),
  },
  runtimeEnv: (import.meta as any).env,
  emptyStringAsUndefined: true,
});
