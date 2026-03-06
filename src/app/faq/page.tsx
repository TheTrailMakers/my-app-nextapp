'use client';

import { useEffect, useState } from 'react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
}

// Client component for FAQ accordion
function FAQAccordion({ faqs }: { faqs: FAQItem[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  // Group FAQs by category
  const groupedFAQs = faqs.reduce((acc, faq) => {
    if (!acc[faq.category]) {
      acc[faq.category] = [];
    }
    acc[faq.category].push(faq);
    return acc;
  }, {} as Record<string, FAQItem[]>);

  return (
    <div className="max-w-4xl mx-auto">
      {Object.entries(groupedFAQs).map(([category, categoryFaqs]) => (
        <div key={category} className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{category}</h2>
          <div className="space-y-3">
            {categoryFaqs.map((faq) => (
              <div key={faq.id} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <button
                  onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                  className="w-full px-6 py-4 text-left bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-between"
                >
                  <span className="font-semibold text-gray-900 dark:text-white">{faq.question}</span>
                  <span className="text-blue-600 dark:text-blue-400 ml-4 flex-shrink-0">
                    {openId === faq.id ? '−' : '+'}
                  </span>
                </button>
                {openId === faq.id && (
                  <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function FAQPage() {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getFAQs() {
      try {
        const response = await fetch('/api/faqs');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setFaqs(data.faqs || []);
      } catch (error) {
        console.error('Failed to fetch FAQs:', error);
      } finally {
        setLoading(false);
      }
    }

    getFAQs();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
      {/* Header Section */}
      <div className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Find answers to common questions about our treks, expeditions, and courses.
            Don't see your question? Contact us anytime!
          </p>
        </div>
      </div>

      {/* FAQs Section */}
      <div className="px-4 py-12 sm:px-6 lg:px-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="text-gray-600 dark:text-gray-400 mt-4">Loading FAQs...</p>
          </div>
        ) : faqs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">No FAQs available at the moment.</p>
          </div>
        ) : (
          <FAQAccordion faqs={faqs} />
        )}
      </div>

      {/* CTA Section */}
      <div className="px-4 py-12 sm:px-6 lg:px-8 bg-blue-50 dark:bg-gray-800 mt-12">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Still have questions?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Our team is here to help. Contact us directly for any inquiries.
          </p>
          <a
            href="/contact"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </div>
  );
}
