export default function LoadingLessonsPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-background to-muted pb-24">
      {/* Header Section Skeleton */}
      <section className="relative px-6 md:px-12 lg:px-20 pt-32 md:pt-40 pb-16 md:pb-24">
        <div className="max-w-[1400px] mx-auto flex flex-col items-center text-center">
          <div className="h-4 w-32 bg-muted animate-pulse rounded-sm mb-6" />
          <div className="h-16 md:h-24 lg:h-32 w-[60%] bg-muted animate-pulse rounded-md" />
          <div className="mt-8 h-6 md:h-8 w-full max-w-2xl bg-muted animate-pulse rounded-sm" />
          <div className="mt-2 h-6 md:h-8 w-3/4 max-w-xl bg-muted animate-pulse rounded-sm" />
        </div>
      </section>

      {/* Grid Section Skeleton */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 md:gap-x-12 md:gap-y-24">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="flex flex-col h-full">
              <div className="relative w-full aspect-4/5 overflow-hidden rounded-xl bg-muted animate-pulse mb-6" />

              <div className="flex flex-col grow px-2 md:px-0">
                <div className="h-8 md:h-10 w-3/4 bg-muted animate-pulse rounded-sm mb-4" />

                <div className="h-4 w-full bg-muted animate-pulse rounded-sm mb-2" />
                <div className="h-4 w-5/6 bg-muted animate-pulse rounded-sm mb-6" />

                <div className="mt-auto border-t border-border pt-4 flex items-center justify-between">
                  <div className="h-4 w-32 bg-muted animate-pulse rounded-sm" />
                  <div className="h-4 w-24 bg-muted animate-pulse rounded-sm" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
