"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { FiHeart, FiMessageCircle, FiShare2 } from "react-icons/fi"

const lessons = [
  {
    id: 1,
    title: "The Only Difference Between Trekking And Hiking",
    slug: "The-Only-Difference-Between-Trekking-And-Hiking",
    category: "Trekking 101",
    excerpt: "Understand the key differences between trekking and hiking, and when to choose each adventure.",
    image: "https://images.unsplash.com/photo-1551362185-acf8f42d8e8d?w=500&h=300&fit=crop",
    likes: 342,
    comments: 28,
    date: "Feb 15, 2026"
  },
  {
    id: 2,
    title: "Understanding The Layering System",
    slug: "Understanding-The-Layering-System",
    category: "Gear Guide",
    excerpt: "Learn the importance of proper clothing layers to stay comfortable during treks in any weather.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop",
    likes: 521,
    comments: 45,
    date: "Feb 10, 2026"
  },
  {
    id: 3,
    title: "10 Best Treks in Himachal Pradesh",
    slug: "10-Best-Treks-in-Himachal-Pradesh",
    category: "Destination Guide",
    excerpt: "Explore the most stunning treks in Himachal Pradesh with difficulty levels and best seasons.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop",
    likes: 1205,
    comments: 89,
    date: "Feb 5, 2026"
  },
  {
    id: 4,
    title: "Why I Would Do Sandakphu Trek At Least Once",
    slug: "Why-I-would-do-Sandakphu-Trek-atleast-once",
    category: "Experiences",
    excerpt: "A personal journey to one of the most unforgettable treks in the Eastern Himalayas.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop",
    likes: 892,
    comments: 67,
    date: "Jan 28, 2026"
  }
]

function LessonCard({ lesson }: { lesson: typeof lessons[0] }) {
  const [isLiked, setIsLiked] = useState(false)

  return (
    <Link href={`/blog/${lesson.slug}`}>
      <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-blue-400 transition duration-300 cursor-pointer h-full">
        {/* Image */}
        <div className="relative h-40 w-full overflow-hidden bg-gray-900">
          <Image
            src={lesson.image}
            alt={lesson.title}
            fill
            className="object-cover hover:scale-105 transition duration-300"
          />
          <div className="absolute top-3 right-3">
            <span className="bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
              {lesson.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">
            {lesson.title}
          </h3>
          <p className="text-gray-300 text-sm mb-4 line-clamp-2">
            {lesson.excerpt}
          </p>

          {/* Date */}
          <p className="text-gray-500 text-xs mb-4">{lesson.date}</p>

          {/* Engagement Stats */}
          <div className="flex items-center gap-4 pt-4 border-t border-gray-700">
            <button
              onClick={(e) => {
                e.preventDefault()
                setIsLiked(!isLiked)
              }}
              className="flex items-center gap-2 text-gray-400 hover:text-red-400 transition"
            >
              <FiHeart className={`w-4 h-4 ${isLiked ? "fill-red-400 text-red-400" : ""}`} />
              <span className="text-xs">{lesson.likes + (isLiked ? 1 : 0)}</span>
            </button>
            <div className="flex items-center gap-2 text-gray-400">
              <FiMessageCircle className="w-4 h-4" />
              <span className="text-xs">{lesson.comments}</span>
            </div>
            <button
              onClick={(e) => {
                e.preventDefault()
              }}
              className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition ml-auto"
            >
              <FiShare2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default function LessonsPage() {
  const [filter, setFilter] = useState("All")

  const categories = ["All", "Trekking 101", "Gear Guide", "Destination Guide", "Experiences"]
  const filtered = filter === "All" ? lessons : lessons.filter(l => l.category === filter)

  return (
    <main className="bg-black text-white min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <section className="mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Mountain Lessons</h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            Learn from experienced trekkers, discover gear tips, explore destinations, and read real stories from the trails.
          </p>
        </section>

        {/* Category Filter */}
        <div className="mb-12 flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                filter === cat
                  ? "bg-blue-500 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Lessons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((lesson) => (
            <LessonCard key={lesson.id} lesson={lesson} />
          ))}
        </div>

        {/* No Results */}
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No lessons found in this category.</p>
          </div>
        )}
      </div>
    </main>
  )
}
