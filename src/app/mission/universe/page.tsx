import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

export default function UniversePage() {
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

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              The Universe in the Mountains
            </h1>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Standing atop a mountain peak at night, surrounded by millions of
              stars, you realize something profound: you're part of something
              cosmic and eternal. The mountains are a gateway to understanding
              our place in the universe.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Cosmic Perspective</h3>
                  <p className="text-muted-foreground">
                    Experience the night sky as it was meant to be seen:
                    pristine and endless
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></div>
                <div>
                  <h3 className="font-bold text-lg mb-1">
                    Spiritual Connection
                  </h3>
                  <p className="text-muted-foreground">
                    Mountains as spaces for contemplation, reflection, and inner
                    transformation
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Wonder & Discovery</h3>
                  <p className="text-muted-foreground">
                    Rekindling that sense of awe that connects us to something
                    greater
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative h-96 md:h-full min-h-96 rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=600&h=400&fit=crop"
              alt="Mountain night sky"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-8 mb-20">
          <h2 className="text-2xl font-bold mb-6">Our Cosmic Mission</h2>
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p>
              In a world increasingly disconnected from nature and cosmos, the
              mountains serve as a portal to remembering what matters. Trail
              Makers believes that every adventure is also a spiritual journey—a
              chance to re-establish our connection with the universe.
            </p>
            <p>
              From watching sunrise paint the peaks golden to lying under a
              blanket of stars at 13,000 feet, our treks are designed to awaken
              that sense of cosmic wonder that makes us appreciate life's
              infinite beauty.
            </p>
            <p>
              We're not just preserving mountains; we're preserving the human
              spirit's capacity for awe, wonder, and connection to something
              greater than ourselves.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <div className="bg-card border border-border rounded-lg p-8">
            <h3 className="text-xl font-bold text-primary mb-4">
              🌌 Astronomical Experiences
            </h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span>Stargazing sessions with astrophysics experts</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span>Dark sky reserves for pristine night sky viewing</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span>Sunrise to sunset photographic expeditions</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span>Meditation and contemplation guided walks</span>
              </li>
            </ul>
          </div>

          <div className="bg-accent border border-border rounded-lg p-8">
            <h3 className="text-xl font-bold text-primary mb-4">
              🧘 Spiritual Growth
            </h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span>Mindfulness and yoga sessions at mountain camps</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span>Journaling and reflection ceremonies</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span>Connection with local spiritual traditions</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span>Personal transformation programs</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-primary/10 border border-primary/20 rounded-lg p-8 mb-20 text-center">
          <p className="text-xl text-muted-foreground italic mb-6">
            "In the quiet moments atop a mountain peak, watching the sun merge
            with the horizon, you understand that you are part of something
            eternal, vast, and infinitely beautiful."
          </p>
          <p className="text-muted-foreground">— Every Trail Maker's Trekker</p>
        </div>

        <div className="text-center pb-10">
          <Link href="/all">
            <button className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-4 px-10 rounded-lg transition duration-300 text-lg">
              Experience the Universe
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
