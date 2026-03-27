import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FiArrowLeft } from "react-icons/fi";

const blogPosts = [
  {
    id: 1,
    title: "10 Best Treks in Himachal Pradesh",
    slug: "10-Best-Treks-in-Himachal-Pradesh",
    excerpt:
      "Discover the most scenic and challenging treks in the beautiful Himachal Pradesh region.",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop",
    date: "Feb 20, 2026",
    category: "Destinations",
  },
  {
    id: 2,
    title: "The Only Difference Between Trekking And Hiking",
    slug: "The-Only-Difference-Between-Trekking-And-Hiking",
    excerpt:
      "Understand the key differences between trekking and hiking, and when to choose each adventure.",
    image:
      "https://images.unsplash.com/photo-1551362185-acf8f42d8e8d?w=800&h=400&fit=crop",
    date: "Feb 15, 2026",
    category: "Trekking 101",
  },
  {
    id: 3,
    title: "Understanding The Layering System",
    slug: "Understanding-The-Layering-System",
    excerpt:
      "Learn the importance of proper clothing layers to stay comfortable during treks in any weather.",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop",
    date: "Feb 10, 2026",
    category: "Gear Guide",
  },
  {
    id: 4,
    title: "Why I would do Sandakphu Trek at least once",
    slug: "Why-I-would-do-Sandakphu-Trek-atleast-once",
    excerpt:
      "Experience the breathtaking views and adventure of the Sandakphu Trek in the eastern Himalayas.",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop",
    date: "Feb 5, 2026",
    category: "Trek Reviews",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="px-4 py-12 border-b border-border">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition mb-8"
          >
            <FiArrowLeft size={18} />
            Back to Home
          </Link>
          <h1 className="text-5xl font-bold mb-4">Blog & Articles</h1>
          <p className="text-xl text-muted-foreground">
            Insights, guides, and stories from our trekking adventures
          </p>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <article className="group cursor-pointer border border-border rounded-lg overflow-hidden hover:border-primary transition">
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden bg-muted">
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={800}
                      height={400}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <p className="text-sm text-muted-foreground mb-3">
                      {post.date}
                    </p>
                    <h2 className="text-xl font-bold mb-3 group-hover:text-primary transition">
                      {post.title}
                    </h2>
                    <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                    <div className="flex items-center text-primary group-hover:text-primary/80">
                      Read More →
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-20 bg-primary rounded-lg p-12 text-center">
            <h2 className="text-3xl font-bold text-primary-foreground mb-4">
              Have a story to share?
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              We'd love to hear about your trekking experiences and adventures.
              Get in touch with us!
            </p>
            <Link
              href="/contact"
              className="inline-block bg-background text-primary font-bold px-8 py-3 rounded-lg hover:bg-muted transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
