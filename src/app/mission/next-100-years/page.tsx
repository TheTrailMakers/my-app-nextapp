import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

export default function Next100YearsPage() {
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
              Our Legacy: The Next 100 Years
            </h1>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              A century from now, we envision a world where mountains are
              thriving ecosystems, where adventure is accessible to all, and
              where Trail Makers is recognized as the steward of sustainable
              mountain experiences globally.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Global Impact</h3>
                  <p className="text-muted-foreground">
                    Trail Makers becomes the standard-bearer for ethical,
                    sustainable adventure tourism
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></div>
                <div>
                  <h3 className="font-bold text-lg mb-1">
                    Ecosystem Restoration
                  </h3>
                  <p className="text-muted-foreground">
                    Millions of trees and restored ecosystems across all
                    mountainous regions
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Human Flourishing</h3>
                  <p className="text-muted-foreground">
                    Thriving mountain communities with sustainable livelihoods
                    and prosperity
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative h-96 md:h-full min-h-96 rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop"
              alt="Vision of sustainable mountain future"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-8 mb-20">
          <h2 className="text-2xl font-bold mb-6">Our Century-Long Vision</h2>
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p>
              Over the next hundred years, Trail Makers will evolve from a
              trekking company into a global force for mountain conservation,
              education, and sustainable development. We reimagine adventure as
              a catalyst for positive change.
            </p>
            <p>
              Our goal is a world where every mountain range is thriving, where
              mountain communities prosper, and where millions of adventurers
              have discovered their passion while contributing to conservation.
            </p>
            <p>
              Trail Makers will be remembered not just for the trails we've
              walked, but for the ecosystems we've restored, the lives we've
              touched, and the mountains we've preserved for generations yet
              unborn.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <div className="bg-card border border-border rounded-lg p-8">
            <h3 className="text-xl font-bold text-primary mb-4">
              🌍 The World We're Building
            </h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span>Thriving, restored mountain ecosystems globally</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span>Adventure as a tool for environmental awareness</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span>Sustainable prosperity for mountain communities</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span>Climate-positive global operations</span>
              </li>
            </ul>
          </div>

          <div className="bg-accent border border-border rounded-lg p-8">
            <h3 className="text-xl font-bold text-primary mb-4">
              🌱 Legacy Milestones
            </h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span>100 million adventures experienced safely</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span>1 billion trees restored to mountain regions</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span>
                  10,000+ mountain families transformed through employment
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span>Global leader in sustainable adventure tourism</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center pb-10">
          <h3 className="text-2xl font-bold mb-6">
            Join our century-long mission
          </h3>
          <Link href="/contact">
            <button className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-4 px-10 rounded-lg transition duration-300 text-lg">
              Start Your Adventure Today
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
