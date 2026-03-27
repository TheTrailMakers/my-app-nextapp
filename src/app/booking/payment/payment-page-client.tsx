"use client";

import { useState } from "react";
import Link from "next/link";
import Script from "next/script";
import { useRouter } from "next/navigation";
import { FiArrowLeft, FiCheckCircle } from "react-icons/fi";

type RazorpaySuccessResponse = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

type RazorpayCheckoutOptions = {
  key: string | undefined;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpaySuccessResponse) => Promise<void>;
  prefill: {
    email: string;
    contact: string;
  };
  theme: {
    color: string;
  };
  modal: {
    ondismiss: () => void;
  };
};

type RazorpayInstance = {
  open: () => void;
};

declare global {
  interface Window {
    Razorpay: new (options: RazorpayCheckoutOptions) => RazorpayInstance;
  }
}

type PaymentPageClientProps = {
  bookingId: string | null;
  amount: string | null;
};

export default function PaymentPageClient({
  bookingId,
  amount,
}: PaymentPageClientProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);

  const handlePayment = async () => {
    if (!bookingId || !amount) {
      setError("Invalid booking details");
      return;
    }

    setLoading(true);
    setProcessing(true);
    setError("");

    try {
      const orderResponse = await fetch("/api/payments/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookingId,
          amount: Number.parseInt(amount, 10),
        }),
      });

      if (!orderResponse.ok) {
        throw new Error("Failed to create payment order");
      }

      const orderData = await orderResponse.json();
      const orderId = orderData.data.razorpayOrderId;

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: Number.parseInt(amount, 10),
        currency: "INR",
        name: "The Trail Makers",
        description: "Trek Booking Payment",
        order_id: orderId,
        handler: async (response: RazorpaySuccessResponse) => {
          try {
            const verifyResponse = await fetch("/api/payments/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              credentials: "include",
              body: JSON.stringify({
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
                bookingId,
              }),
            });

            if (!verifyResponse.ok) {
              throw new Error("Payment verification failed");
            }

            router.push(`/booking/confirmation?bookingId=${bookingId}`);
          } catch (err) {
            const message =
              err instanceof Error ? err.message : "payment_failed";
            router.push(
              `/booking/failure?bookingId=${bookingId}&amount=${amount}&error=${encodeURIComponent(message)}`,
            );
            setProcessing(false);
          }
        },
        prefill: {
          email: "",
          contact: "",
        },
        theme: {
          color: "#3b82f6",
        },
        modal: {
          ondismiss: () => {
            setProcessing(false);
            setLoading(false);
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Payment failed");
      setProcessing(false);
    } finally {
      setLoading(false);
    }
  };

  if (!bookingId || !amount) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-linear-to-b from-background to-muted/40 text-foreground">
        <div className="text-center">
          <p className="text-red-400 mb-4">Invalid booking details</p>
          <Link href="/all" className="text-primary hover:text-primary/90">
            Back to Treks
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Script
        id="razorpay-checkout"
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
      />
      <div className="min-h-screen bg-linear-to-b from-background to-muted/40 text-foreground">
        <div className="border-b border-border">
          <div className="max-w-4xl mx-auto px-4 py-6">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-primary hover:text-primary/90"
            >
              <FiArrowLeft /> Back to Summary
            </button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h1 className="text-4xl font-bold mb-2">Complete Payment</h1>
              <p className="mb-12 text-muted-foreground">
                Secure payment via Razorpay
              </p>

              <div className="mb-8 rounded-lg border border-border bg-card p-6">
                <h2 className="text-2xl font-bold mb-6">Payment Method</h2>

                <div className="space-y-3">
                  <label className="flex cursor-pointer items-center rounded-lg border-2 border-primary bg-primary/10 p-4">
                    <input
                      type="radio"
                      name="payment"
                      defaultChecked
                      className="w-4 h-4"
                    />
                    <span className="ml-3 font-semibold">
                      Credit/Debit Card
                    </span>
                  </label>

                  <label className="flex cursor-pointer items-center rounded-lg border border-border p-4 hover:border-primary/40">
                    <input
                      type="radio"
                      name="payment"
                      disabled
                      className="w-4 h-4"
                    />
                    <span className="ml-3 font-semibold text-muted-foreground">
                      UPI and Wallets{" "}
                      <span className="text-xs text-muted-foreground/70">
                        (Coming soon)
                      </span>
                    </span>
                  </label>
                </div>
              </div>

              <div className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-6 mb-8">
                <h3 className="font-bold mb-3 flex items-center gap-2">
                  <FiCheckCircle className="text-yellow-500" />
                  Test Mode: Use This Card
                </h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Card Number:</strong> 4111 1111 1111 1111
                  </p>
                  <p>
                    <strong>Expiry:</strong> Any future date (MM/YY)
                  </p>
                  <p>
                    <strong>CVV:</strong> Any 3 digits
                  </p>
                  <p>
                    <strong>OTP:</strong> 123456
                  </p>
                </div>
              </div>

              {error && (
                <div className="bg-red-900/20 border border-red-700 rounded-lg p-4 text-red-300 mb-6">
                  {error}
                </div>
              )}
            </div>

            <div className="h-fit">
              <div className="sticky top-20 rounded-lg border border-primary/20 bg-linear-to-br from-primary/10 to-secondary/50 p-6">
                <h3 className="text-lg font-bold mb-6">Order Summary</h3>

                <div className="mb-6 space-y-4 border-b border-border pb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Booking ID</span>
                    <span className="font-mono text-xs">
                      {bookingId.slice(-8)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Amount</span>
                    <span className="font-bold">
                      ₹{(Number.parseInt(amount, 10) / 100).toLocaleString()}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handlePayment}
                  disabled={loading || processing}
                  className="w-full rounded-lg bg-primary py-3 font-bold text-primary-foreground transition hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground"
                >
                  {processing
                    ? "Processing..."
                    : `Pay ₹${(Number.parseInt(amount, 10) / 100).toLocaleString()}`}
                </button>

                <p className="mt-4 text-center text-xs text-muted-foreground">
                  Powered by Razorpay
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
