import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

export default function NewsRoomPage() {
  const news = [
    {
      date: "February 2026",
      title: "Trail Makers Reaches 50,000 Happy Trekkers Milestone",
      description:
        "Celebrating our growing community and the launch of new trek routes in Ladakh and Sikkim",
    },
    {
      date: "January 2026",
      title: "100,000 Trees Planted Initiative Completed",
      description:
        "Through our conservation efforts, we've successfully planted and protected 100,000 trees across Himalayan regions",
    },
    {
      date: "December 2025",
      title: "New Hiking App Launch",
      description:
        "Introducing our mobile app with real-time GPS tracking, offline maps, and community features for trekkers",
    },
    {
      date: "November 2025",
      title: "Partnership with Mountain Conservation Institute",
      description:
        "Joining forces to promote sustainable trekking and preserve Himalayan ecosystems for future generations",
    },
    {
      date: "October 2025",
      title: "Guide Training Academy Inaugurated",
      description:
        "Opening our international-standard training facility to certify and develop mountain guides",
    },
    {
      date: "September 2025",
      title: "Climate-Positive Trek Initiative",
      description:
        "All treks now include carbon offset credits and environmental contribution tracking for each participant",
    },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-6 pt-20 pb-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-12"
        >
          <FiArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="mb-20">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">News Room</h1>
          <p className="text-muted-foreground text-lg">
            Latest updates from Trail Makers
          </p>
        </div>

        <div className="space-y-8 mb-20">
          {news.map((item, idx) => (
            <div key={idx} className="border-l-4 border-primary/40 pl-6 pb-8">
              <p className="text-sm text-primary font-bold mb-2">{item.date}</p>
              <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {item.description}
              </p>
              <button className="mt-4 text-primary hover:text-primary/80 font-semibold text-sm">
                Read More →
              </button>
            </div>
          ))}
        </div>

        <div className="bg-card border border-border rounded-lg p-12 text-center mb-20">
          <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
          <p className="text-muted-foreground mb-6">
            Subscribe to our newsletter to get the latest news, trek updates,
            and exclusive offers.
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-background border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-hidden focus:border-primary"
            />
            <button className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-6 py-3 rounded-lg transition duration-300">
              Subscribe
            </button>
          </div>
        </div>

        <div className="text-center pb-10">
          <Link href="/contact">
            <button className="border-2 border-primary/30 bg-primary/10 text-primary hover:bg-primary/15 font-bold py-3 px-8 rounded-lg transition duration-300">
              Media Inquiries
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
