import Image from "next/image";
import Link from "next/link";
import { desc } from "drizzle-orm";
import db from "@/drizzle/db";
import { course as courseTable } from "@/drizzle/schema";
import { isDatabaseConfigured } from "@/lib/databaseAvailability";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

interface CourseCard {
  id: string;
  name: string;
  slug: string;
  description: string;
  location: string;
  price: number;
  difficulty: string;
  duration: number;
  thumbnailUrl?: string | null;
  imageUrl?: string | null;
}

const fallbackCourseImage =
  "https://res.cloudinary.com/thetrail/image/upload/v1714107209/default_trek_image.jpg";

export const revalidate = 3600;

function formatDifficulty(difficulty: string) {
  return difficulty.replace(/_/g, " ");
}

async function getCourses(): Promise<CourseCard[]> {
  if (!isDatabaseConfigured()) {
    return [];
  }

  try {
    return await db
      .select({
        id: courseTable.id,
        name: courseTable.name,
        slug: courseTable.slug,
        description: courseTable.description,
        location: courseTable.location,
        price: courseTable.price,
        difficulty: courseTable.difficulty,
        duration: courseTable.duration,
        thumbnailUrl: courseTable.thumbnailUrl,
        imageUrl: courseTable.imageUrl,
      })
      .from(courseTable)
      .orderBy(desc(courseTable.createdAt));
  } catch (error) {
    console.warn("Skipping courses page data during prerender:", error);
    return [];
  }
}

export default async function CoursesPage() {
  const courses = await getCourses();

  return (
    <div className="min-h-screen bg-linear-to-b from-background to-muted">
      {/* Header Section */}
      <div className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal animation="fade-up" offset={["start 95%", "start 80%"]}>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Adventure Courses
            </h1>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" offset={["start 90%", "start 70%"]}>
            <p className="text-lg text-muted-foreground">
              Learn outdoor skills from certified instructors. Our hands-on
              courses cover rock climbing, mountaineering techniques, and
              wilderness survival skills.
            </p>
          </ScrollReveal>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {courses.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No courses available at the moment.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <ScrollReveal
                  key={course.id}
                  animation="fade-up"
                  offset={["start 95%", "start 75%"]}
                >
                  <div
                    className="bg-card rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
                  >
                    {/* Image */}
                    <div className="h-48 bg-muted overflow-hidden">
                      <Image
                        src={
                          course.imageUrl ||
                          course.thumbnailUrl ||
                          fallbackCourseImage
                        }
                        alt={course.name}
                        width={800}
                        height={480}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="h-full w-full object-cover hover:scale-105 transition-transform"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h3 className="text-xl font-bold text-foreground mb-2">
                        {course.name}
                      </h3>

                      {/* Details Grid */}
                      <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">
                            Duration
                          </p>
                          <p className="font-semibold text-foreground">
                            {course.duration} days
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">
                            Price
                          </p>
                          <p className="font-semibold text-foreground">
                            ₹{(course.price / 100).toLocaleString("en-IN")}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">
                            Difficulty
                          </p>
                          <p className="font-semibold text-foreground capitalize">
                            {formatDifficulty(course.difficulty)}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">
                            Location
                          </p>
                          <p className="font-semibold text-foreground text-xs">
                            {course.location}
                          </p>
                        </div>
                      </div>

                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {course.description}
                      </p>

                      {/* Button */}
                      <Link
                        href={`/courses/${course.slug}`}
                        className="w-full inline-block bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2 px-4 rounded-lg transition-colors text-center"
                      >
                        Learn More
                      </Link>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
