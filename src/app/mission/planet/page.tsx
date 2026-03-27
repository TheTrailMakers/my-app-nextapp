import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

export default function PlanetPage() {
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
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Planet</h1>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              The mountains face unprecedented challenges from climate change to
              deforestation. Trail Makers is committed to being a
              climate-positive force, restoring ecosystems and demonstrating
              that adventure and conservation can go hand in hand.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></div>
                <div>
                  <h3 className="font-bold text-lg mb-1">
                    Carbon Neutral Operations
                  </h3>
                  <p className="text-muted-foreground">
                    All treks offset carbon footprint through reforestation and
                    renewable energy
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
                    1 million trees planted with 80% survival rate and
                    continuous monitoring
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Climate Research</h3>
                  <p className="text-muted-foreground">
                    Partner with universities on glacier monitoring and climate
                    adaptation studies
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative h-96 md:h-full min-h-96 rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=600&h=400&fit=crop"
              alt="Mountain ecosystem"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="space-y-8 mb-20">
          <div className="bg-card border border-border rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6">
              Our Climate Action Plans
            </h2>
            <div className="space-y-6">
              <div className="border-l-4 border-primary/40 pl-4">
                <h3 className="font-bold text-lg text-primary mb-2">
                  Carbon Negative by 2027
                </h3>
                <p className="text-muted-foreground">
                  Achieve 150% carbon offset through renewable energy,
                  reforestation, and renewable fuel initiatives
                </p>
              </div>
              <div className="border-l-4 border-primary/40 pl-4">
                <h3 className="font-bold text-lg text-primary mb-2">
                  Plastic-Free Operations
                </h3>
                <p className="text-muted-foreground">
                  Eliminate single-use plastics from camps and operations, using
                  biodegradable alternatives throughout
                </p>
              </div>
              <div className="border-l-4 border-primary/40 pl-4">
                <h3 className="font-bold text-lg text-primary mb-2">
                  Water Conservation
                </h3>
                <p className="text-muted-foreground">
                  Implement rainwater harvesting and water recycling systems at
                  all base camps
                </p>
              </div>
              <div className="border-l-4 border-primary/40 pl-4">
                <h3 className="font-bold text-lg text-primary mb-2">
                  Biodiversity Protection
                </h3>
                <p className="text-muted-foreground">
                  Restore 50,000 hectares of mountain forest cover by 2030 with
                  native species
                </p>
              </div>
            </div>
          </div>

          <div className="bg-accent border border-border rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Environmental Metrics</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Trees Planted</span>
                  <span className="text-2xl font-bold text-primary">100K+</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full"
                    style={{ width: "25%" }}
                  ></div>
                </div>

                <div className="flex justify-between items-center pt-4">
                  <span className="text-muted-foreground">
                    Carbon Offset (Tons)
                  </span>
                  <span className="text-2xl font-bold text-primary">5K+</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full"
                    style={{ width: "40%" }}
                  ></div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Plastic Removed</span>
                  <span className="text-2xl font-bold text-primary">50T+</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full"
                    style={{ width: "35%" }}
                  ></div>
                </div>

                <div className="flex justify-between items-center pt-4">
                  <span className="text-muted-foreground">Area Protected</span>
                  <span className="text-2xl font-bold text-primary">
                    25K Acres
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full"
                    style={{ width: "50%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center pb-10">
          <Link href="/contact">
            <button className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-4 px-10 rounded-lg transition duration-300 text-lg">
              Support Planet Protection
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
