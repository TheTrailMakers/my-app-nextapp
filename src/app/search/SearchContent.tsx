"use client"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { FiArrowLeft } from "react-icons/fi"

interface SearchResult {
  id: string
  type: "trek" | "lesson" | "faq" | "course" | "expedition"
  title: string
  description: string
  href: string
  image?: string
  category?: string
}

const mockData = {
  treks: [
    {
      id: "1",
      type: "trek" as const,
      title: "Beas Kund Trek",
      description: "A beautiful 3-day trek in Himachal Pradesh with stunning views of Dhauladhar range",
      href: "/treks/beas-kund-trek",
      category: "Himachal Pradesh"
    },
    {
      id: "2",
      type: "trek" as const,
      title: "Bhrigu Lake Trek",
      description: "A moderate 4-day trek offering breathtaking alpine meadows and pristine lakes",
      href: "/treks/bhrigu-lake-trek",
      category: "Himachal Pradesh"
    },
    {
      id: "3",
      type: "trek" as const,
      title: "Rani Sui Lake Trek",
      description: "Explore the hidden gem of Himachal with this scenic trekking route",
      href: "/treks/ranisui-lake-trek",
      category: "Himachal Pradesh"
    }
  ],
  lessons: [
    {
      id: "1",
      type: "lesson" as const,
      title: "The Only Difference Between Trekking And Hiking",
      description: "Learn the key differences between trekking and hiking to choose your adventure wisely",
      href: "/blog/The-Only-Difference-Between-Trekking-And-Hiking",
      category: "Trekking 101"
    },
    {
      id: "2",
      type: "lesson" as const,
      title: "Understanding The Layering System",
      description: "Master the art of layering for maximum comfort and performance during treks",
      href: "/blog/Understanding-The-Layering-System",
      category: "Gear Guide"
    },
    {
      id: "3",
      type: "lesson" as const,
      title: "10 Best Treks in Himachal Pradesh",
      description: "Discover the most stunning treks in Himachal with difficulty levels and best seasons",
      href: "/blog/10-Best-Treks-in-Himachal-Pradesh",
      category: "Destination Guide"
    }
  ],
  faqs: [
    {
      id: "1",
      type: "faq" as const,
      title: "What is the best season for trekking?",
      description: "The best trekking season varies by region, but generally autumn and spring offer ideal conditions...",
      href: "/faq",
      category: "Planning"
    },
    {
      id: "2",
      type: "faq" as const,
      title: "How to prepare physically for a trek?",
      description: "Preparation involves regular cardio, strength training, and practice hikes...",
      href: "/faq",
      category: "Training"
    }
  ],
  courses: [
    {
      id: "1",
      type: "course" as const,
      title: "Mountain Trekking Basics",
      description: "Learn the fundamentals of safe and enjoyable trekking",
      href: "/courses",
      category: "Beginner"
    }
  ],
  expeditions: [
    {
      id: "1",
      type: "expedition" as const,
      title: "Ladakh Expedition",
      description: "An epic 10-day expedition to the mountains of Ladakh",
      href: "/expeditions",
      category: "Advanced"
    }
  ]
}

function ResultCard({ result }: { result: SearchResult }) {
  const typeColors: Record<string, string> = {
    trek: "bg-blue-500",
    lesson: "bg-purple-500",
    faq: "bg-green-500",
    course: "bg-orange-500",
    expedition: "bg-red-500"
  }

  return (
    <Link href={result.href}>
      <div className="border border-gray-700 rounded-lg p-6 hover:border-blue-400 hover:bg-gray-800/50 transition cursor-pointer">
        <div className="flex items-start gap-4">
          <div className={`${typeColors[result.type]} text-white px-3 py-1 rounded-full text-xs font-semibold uppercase flex-shrink-0`}>
            {result.type}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-white mb-2">{result.title}</h3>
            <p className="text-gray-400 text-sm mb-2">{result.description}</p>
            {result.category && (
              <p className="text-xs text-gray-500">{result.category}</p>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [results, setResults] = useState<SearchResult[]>([])

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    const lowerQuery = query.toLowerCase()
    const filtered: SearchResult[] = []

    // Search in all data
    mockData.treks.forEach(trek => {
      if (trek.title.toLowerCase().includes(lowerQuery) || trek.description.toLowerCase().includes(lowerQuery)) {
        filtered.push(trek)
      }
    })

    mockData.lessons.forEach(lesson => {
      if (lesson.title.toLowerCase().includes(lowerQuery) || lesson.description.toLowerCase().includes(lowerQuery)) {
        filtered.push(lesson)
      }
    })

    mockData.faqs.forEach(faq => {
      if (faq.title.toLowerCase().includes(lowerQuery) || faq.description.toLowerCase().includes(lowerQuery)) {
        filtered.push(faq)
      }
    })

    mockData.courses.forEach(course => {
      if (course.title.toLowerCase().includes(lowerQuery) || course.description.toLowerCase().includes(lowerQuery)) {
        filtered.push(course)
      }
    })

    mockData.expeditions.forEach(exp => {
      if (exp.title.toLowerCase().includes(lowerQuery) || exp.description.toLowerCase().includes(lowerQuery)) {
        filtered.push(exp)
      }
    })

    setResults(filtered)
  }, [query])

  return (
    <main className="bg-black text-white min-h-screen pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition mb-8">
          <FiArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        {/* Header */}
        <section className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Search Results</h1>
          <p className="text-gray-400">
            {query ? `Showing results for "${query}"` : "Enter a search query to find treks, lessons, FAQs, courses, and expeditions"}
          </p>
        </section>

        {/* Results */}
        {results.length > 0 ? (
          <div className="space-y-4">
            {results.map((result) => (
              <ResultCard key={`${result.type}-${result.id}`} result={result} />
            ))}
          </div>
        ) : query ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg mb-4">No results found for "{query}"</p>
            <p className="text-gray-500">Try searching with different keywords or browse our categories.</p>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">Start searching to discover treks, lessons, FAQs, courses, and expeditions.</p>
          </div>
        )}
      </div>
    </main>
  )
}
