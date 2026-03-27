import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

export default function LivingBeingsPage() {
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
              Protecting Living Beings
            </h1>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              The mountains are home to countless species, from the majestic
              snow leopard to the tiniest alpine insect. We believe that
              preserving wildlife is as important as protecting the mountains
              themselves.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></div>
                <div>
                  <h3 className="font-bold text-lg mb-1">
                    Wildlife Conservation
                  </h3>
                  <p className="text-muted-foreground">
                    Protect habitat for endangered species including snow
                    leopards and musk deer
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></div>
                <div>
                  <h3 className="font-bold text-lg mb-1">
                    Research Partnership
                  </h3>
                  <p className="text-muted-foreground">
                    Support scientific studies on mountain wildlife and
                    ecosystems
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></div>
                <div>
                  <h3 className="font-bold text-lg mb-1">
                    Responsible Trekking
                  </h3>
                  <p className="text-muted-foreground">
                    Educate visitors on minimal impact trekking practices
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative h-96 md:h-full min-h-96 rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop"
              alt="Mountain wildlife"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="space-y-8 mb-20">
          <div className="bg-card border border-border rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6">
              Our Wildlife Protection Programs
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-lg text-primary mb-3">
                  🐆 Snow Leopard Project
                </h3>
                <p className="text-muted-foreground">
                  We support anti-poaching patrols and habitat preservation
                  programs to protect these elusive predators.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-lg text-primary mb-3">
                  🦌 Wildlife Corridors
                </h3>
                <p className="text-muted-foreground">
                  Creating safe passage for animals across fragmented mountain
                  habitats through reforestation efforts.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-lg text-primary mb-3">
                  🔬 Research Support
                </h3>
                <p className="text-muted-foreground">
                  Partnering with universities and NGOs to study species
                  behavior and ecosystem health.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-lg text-primary mb-3">
                  📚 Education
                </h3>
                <p className="text-muted-foreground">
                  Raising awareness among trekkers about biodiversity and
                  responsible mountain etiquette.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-accent border border-border rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6">
              Mountain Wildlife We Protect
            </h2>
            <div className="grid md:grid-cols-2 gap-6 text-muted-foreground">
              <div>
                <p className="font-bold text-primary mb-2">Large Mammals</p>
                <ul className="space-y-1 text-sm">
                  <li>• Snow Leopards</li>
                  <li>• Himalayan Bears</li>
                  <li>• Musk Deer</li>
                  <li>• Wild Yaks</li>
                </ul>
              </div>
              <div>
                <p className="font-bold text-primary mb-2">
                  Birds & Small Animals
                </p>
                <ul className="space-y-1 text-sm">
                  <li>• Golden Eagles</li>
                  <li>• Himalayan Pheasants</li>
                  <li>• Alpine Hares</li>
                  <li>• Himalayan Cats</li>
                </ul>
              </div>
              <div>
                <p className="font-bold text-primary mb-2">
                  Amphibians & Reptiles
                </p>
                <ul className="space-y-1 text-sm">
                  <li>• Alpine Frogs</li>
                  <li>• High-altitude Salamanders</li>
                  <li>• Mountain Vipers</li>
                  <li>• Agama Lizards</li>
                </ul>
              </div>
              <div>
                <p className="font-bold text-primary mb-2">
                  Insects & Pollinators
                </p>
                <ul className="space-y-1 text-sm">
                  <li>• Alpine Butterflies</li>
                  <li>• Himalayan Bees</li>
                  <li>• Mountain Beetles</li>
                  <li>• High-altitude Moths</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center pb-10">
          <Link href="/contact">
            <button className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-4 px-10 rounded-lg transition duration-300 text-lg">
              Support Our Wildlife Programs
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
