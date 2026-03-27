import { GiShield, GiCompass, GiRosaShield } from "react-icons/gi";

export function WhatSetUsApart() {
  const features = [
    {
      icon: GiShield,
      title: "Priority Safety",
      description: "Priority Safety without losing sense of adventure",
    },
    {
      icon: GiCompass,
      title: "Knowledgeable Team",
      description: "Experienced guides who know every trail intimately",
    },
    {
      icon: GiRosaShield,
      title: "Quality Guarantee",
      description: "No quality compromise on any adventure",
    },
  ];

  return (
    <section className="py-20 px-6 bg-linear-to-b from-background to-background border-t border-muted">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            What Sets Us Apart
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We don't just organize treks. We create transformative experiences in the mountains.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="bg-card border border-border rounded-lg p-8 hover:border-primary transition duration-300"
              >
                <Icon className="w-16 h-16 text-primary mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
