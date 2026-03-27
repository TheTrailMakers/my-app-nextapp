export default function LoadingFaqPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-background to-muted px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl text-center">
        <div className="mx-auto h-12 w-96 animate-pulse rounded-sm bg-muted" />
        <div className="mx-auto mt-4 h-6 w-full max-w-2xl animate-pulse rounded-sm bg-muted" />
      </div>

      <div className="mx-auto mt-12 max-w-4xl space-y-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="h-16 animate-pulse rounded-lg bg-card shadow-sm"
          />
        ))}
      </div>
    </div>
  );
}
