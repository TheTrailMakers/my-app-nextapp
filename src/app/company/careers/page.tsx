import { NarrativePage } from "@/components/narrativePage";

export default function CareersPage() {
  const sections = [
    {
      id: "hero",
      title: "Careers at Trail Makers",
      subtitle: "Join Our Team and Shape the Future of Mountain Adventures",
      content: "Join a passionate team of adventurers, conservationists, and innovators. We're building the future of mountain trekking, and we want you to be part of the journey. Work with us and make a real difference in the lives of thousands of trekkers.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
      imageAlt: "Team of guides and staff",
      imagePosition: "right" as const,
    },
    {
      id: "opportunities",
      title: "Growth & Impact",
      content: "Growth Opportunities: Continuous learning and career development in adventure tourism.\n\nMeaningful Work: Directly impact conservation efforts and mountain communities.\n\nAdventure Lifestyle: Work in the mountains and be part of an adventure community.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
      imageAlt: "Mountain team members",
      imagePosition: "left" as const,
    },
    {
      id: "openings",
      title: "Open Positions",
      content: "Mountain Guide: Lead treks across the Himalayas with certified expertise.\n\nLogistics Coordinator: Manage camps, equipment, and on-ground operations.\n\nDigital Marketing Executive: Build our online community and reach adventure seekers.\n\nConservation Officer: Lead environmental initiatives and preserve mountain ecosystems.\n\nVisit our Contact page to apply for any of these positions.",
    },
    {
      id: "benefits",
      title: "Why Join Trail Makers?",
      content: "✓ Competitive salary and benefits package\n\n✓ Flexible work arrangements with adventure-first culture\n\n✓ Annual free treks and adventure training\n\n✓ Health insurance and wellness programs\n\n✓ Professional development and skill training\n\nJoin us and be part of something meaningful.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
      imageAlt: "Team celebrating",
      imagePosition: "right" as const,
    },
  ];

  return (
    <NarrativePage
      title="Careers at Trail Makers"
      breadcrumb={{ label: "Home", href: "/" }}
      sections={sections}
      cta={{ text: "View All Opportunities", href: "/contact" }}
    />
  );
}
