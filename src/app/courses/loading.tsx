export default function LoadingCoursesPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-background to-muted">
      <div className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="h-12 w-72 animate-pulse rounded-sm bg-muted" />
          <div className="mt-4 h-6 w-full max-w-3xl animate-pulse rounded-sm bg-muted" />
        </div>
      </div>

      <div className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-lg bg-card shadow-lg"
            >
              <div className="h-48 animate-pulse bg-muted" />
              <div className="space-y-4 p-4">
                <div className="h-6 w-2/3 animate-pulse rounded-sm bg-muted" />
                <div className="grid grid-cols-2 gap-3">
                  {Array.from({ length: 4 }).map((_, statIndex) => (
                    <div
                      key={statIndex}
                      className="h-10 animate-pulse rounded-sm bg-muted"
                    />
                  ))}
                </div>
                <div className="h-16 animate-pulse rounded-sm bg-muted" />
                <div className="h-10 animate-pulse rounded-sm bg-primary/30" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
