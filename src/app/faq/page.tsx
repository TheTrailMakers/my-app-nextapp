import Link from "next/link";
import { asc } from "drizzle-orm";
import Accordion from "@/components/accordion";
import db from "@/drizzle/db";
import { faq } from "@/drizzle/schema";
import { isDatabaseConfigured } from "@/lib/databaseAvailability";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string | null;
  order: number;
}

export const revalidate = 3600;

async function getFaqs(): Promise<FAQItem[]> {
  if (!isDatabaseConfigured()) {
    return [];
  }

  try {
    return await db
      .select({
        id: faq.id,
        question: faq.question,
        answer: faq.answer,
        category: faq.category,
        order: faq.order,
      })
      .from(faq)
      .orderBy(asc(faq.category), asc(faq.order));
  } catch (error) {
    console.warn("Skipping FAQs page data during prerender:", error);
    return [];
  }
}

function groupFaqs(faqs: FAQItem[]) {
  return faqs.reduce<Record<string, FAQItem[]>>((acc, faq) => {
    const category = faq.category || "General";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(faq);
    return acc;
  }, {});
}

export default async function FAQPage() {
  const faqs = await getFaqs();
  const groupedFAQs = groupFaqs(faqs);

  return (
    <div className="min-h-screen bg-linear-to-b from-background to-muted/40">
      {/* Header Section */}
      <div className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="mb-4 text-4xl font-bold text-foreground sm:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-muted-foreground">
            Find answers to common questions about our treks, expeditions, and
            courses. Don't see your question? Contact us anytime!
          </p>
        </div>
      </div>

      {/* FAQs Section */}
      <div className="px-4 py-12 sm:px-6 lg:px-8">
        {faqs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No FAQs available at the moment.
            </p>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            {Object.entries(groupedFAQs).map(([category, categoryFaqs]) => (
              <div key={category} className="mb-12">
                <h2 className="mb-6 text-2xl font-bold text-foreground">
                  {category}
                </h2>
                <div className="space-y-3">
                  {categoryFaqs.map((faq) => (
                    <Accordion
                      key={faq.id}
                      question={faq.question}
                      answer={faq.answer}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="mt-12 bg-muted/60 px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="mb-4 text-2xl font-bold text-foreground">
            Still have questions?
          </h2>
          <p className="mb-6 text-muted-foreground">
            Our team is here to help. Contact us directly for any inquiries.
          </p>
          <Link
            href="/contact"
            className="inline-block rounded-lg bg-primary px-8 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </div>
  );
}
