import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

export default function ReviewsPage() {
  const reviews = [
    {
      name: "Arjun Singh",
      trek: "Beas Kund Trek",
      rating: 5,
      text: "An absolutely unforgettable experience! The guides were knowledgeable, the camps were comfortable, and the views were breathtaking.",
    },
    {
      name: "Priya Sharma",
      trek: "Bhrigu Lake Trek",
      rating: 5,
      text: "Trail Makers made my first trek amazing. The safety measures were top-notch, and the team took great care of everyone.",
    },
    {
      name: "Rohan Patel",
      trek: "Rainsui Lake Trek",
      rating: 5,
      text: "Best trek I've ever done! The scenic beauty was incredible, and the guides shared amazing insights about the mountains.",
    },
    {
      name: "Neha Kapoor",
      trek: "Multiple Treks",
      rating: 5,
      text: "I've done three treks with Trail Makers now. Each one has been perfectly organized with exceptional guides and logistics.",
    },
    {
      name: "Vikram Reddy",
      trek: "High Altitude Trek",
      rating: 5,
      text: "The altitude management and medical support were excellent. I felt safe throughout the trek despite the high elevation.",
    },
    {
      name: "Ananya Desai",
      trek: "Himachal Trek",
      rating: 5,
      text: "More than just a trek - it was a journey of self-discovery. The community created on the trail was heartwarming.",
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
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            What Trekkers Say
          </h1>
          <p className="text-muted-foreground text-lg">
            Real experiences from real adventurers
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-20">
          {reviews.map((review, idx) => (
            <div
              key={idx}
              className="bg-card border border-border rounded-lg p-8 hover:border-primary/40 transition"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-lg">{review.name}</h3>
                  <p className="text-sm text-muted-foreground">{review.trek}</p>
                </div>
                <div className="text-yellow-400 text-lg">
                  {"⭐".repeat(review.rating)}
                </div>
              </div>
              <p className="text-muted-foreground italic leading-relaxed">
                "{review.text}"
              </p>
            </div>
          ))}
        </div>

        <div className="bg-primary/10 border border-primary/20 rounded-lg p-12 text-center mb-20">
          <h2 className="text-3xl font-bold mb-4">Join Our Happy Trekkers</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            With over 50,000 satisfied adventurers and a 4.9/5 average rating,
            Trail Makers is your trusted companion for unforgettable mountain
            experiences.
          </p>
          <Link href="/all">
            <button className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-4 px-10 rounded-lg transition duration-300 text-lg inline-flex items-center gap-2">
              Book Your Adventure
            </button>
          </Link>
        </div>

        <div className="text-center pb-10">
          <h3 className="text-2xl font-bold mb-6">Share Your Experience</h3>
          <Link href="/contact">
            <button className="border-2 border-primary/30 bg-primary/10 text-primary hover:bg-primary/15 font-bold py-3 px-8 rounded-lg transition duration-300">
              Submit Your Review
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
