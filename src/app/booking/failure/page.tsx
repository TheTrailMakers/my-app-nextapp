import Link from "next/link";
import { FiXCircle } from "react-icons/fi";

type PaymentFailurePageProps = {
  searchParams: Promise<{
    bookingId?: string;
    amount?: string;
    error?: string;
  }>;
};

export default async function PaymentFailurePage({
  searchParams,
}: PaymentFailurePageProps) {
  const params = await searchParams;
  const bookingId = params.bookingId;
  const amount = params.amount;
  const error = params.error;

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-b from-background to-muted/40 text-foreground">
      <div className="max-w-3xl mx-auto p-8">
        <div className="bg-red-900/20 border border-red-700 rounded-lg p-8 text-center">
          <FiXCircle className="w-16 h-16 mx-auto mb-4 text-red-400" />
          <h1 className="text-3xl font-bold mb-2">Payment Failed</h1>
          <p className="text-red-200 mb-4">
            We could not complete your payment.
          </p>

          {bookingId && (
            <p className="mb-4 text-sm text-muted-foreground">
              Booking Reference: <span className="font-mono">{bookingId}</span>
            </p>
          )}

          {error && (
            <p className="mb-6 text-sm text-muted-foreground">
              Reason: {error}
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href={
                bookingId && amount
                  ? `/booking/payment?bookingId=${bookingId}&amount=${amount}`
                  : "/all"
              }
              className="rounded-sm bg-secondary px-6 py-3 text-secondary-foreground hover:bg-secondary/90"
            >
              Try Again
            </Link>

            <Link
              href="/all"
              className="rounded-sm bg-primary px-6 py-3 text-center text-primary-foreground hover:bg-primary/90"
            >
              Browse Treks
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
