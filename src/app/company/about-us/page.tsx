import { NarrativePage } from "@/components/narrativePage";

export default function AboutUsPage() {
  const sections = [
    {
      id: "hero",
      title: "About Trail Makers",
      subtitle: "Crafting Unforgettable Mountain Adventures Since Day One",
      content: "Trail Makers was born from a passion for mountains, adventure, and creating transformative experiences. Since our founding, we've been dedicated to making trekking accessible, safe, and unforgettable for every adventurer.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      imageAlt: "Mountain landscape",
      imagePosition: "right" as const,
    },
    {
      id: "mission",
      title: "Our Mission, Vision & Values",
      content: "Our Mission: Inspiring people to discover the mountains while preserving them for future generations.\n\nOur Vision: The world's most trusted and sustainable mountain adventure platform.\n\nOur Values: Safety, sustainability, authenticity, and community above everything else.",
      image: "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800&h=600&fit=crop",
      imageAlt: "Team on mountain",
      imagePosition: "left" as const,
    },
    {
      id: "journey",
      title: "Our Journey",
      content: "Founded by a group of passionate mountaineers and adventure enthusiasts, Trail Makers started with a simple idea: democratize mountain trekking and make it accessible to everyone with the spirit of adventure.\n\nOver the years, we've evolved from a small team of local guides to a comprehensive trekking platform serving thousands of adventurers worldwide. But our core values remain unchanged – safety, sustainability, and authenticity.\n\nWe've successfully organized over 5,000 treks, trained 200+ guides, and built a community of 50,000+ adventure enthusiasts. More importantly, we've planted over 100,000 trees and supported local mountain communities through our operations.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      imageAlt: "Trekking group",
      imagePosition: "right" as const,
    },
  ];

  return (
    <NarrativePage
      title="About Trail Makers"
      breadcrumb={{ label: "Home", href: "/" }}
      sections={sections}
      stats={[
        { number: "5000+", label: "Successful Treks" },
        { number: "50K+", label: "Happy Adventurers" },
        { number: "100K+", label: "Trees Planted" },
      ]}
      cta={{ text: "Join Our Community", href: "/contact" }}
    />
  );
}
