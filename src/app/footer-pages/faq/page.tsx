import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

export default function FAQPage() {
  const faqs = [
    {
      question: "What is the best time to trek?",
      answer: "Each region has its special season. Generally, September-October and March-May are ideal. Check individual trek pages for specific recommendations."
    },
    {
      question: "Do I need to be fit to trek?",
      answer: "While basic fitness helps, treks cater to different difficulty levels. We have easy, moderate, and hard options. Start with easier treks and build up."
    },
    {
      question: "What's included in the package?",
      answer: "Our packages typically include accommodation, meals, guides, permits, and logistics. Check individual trek pages for exact inclusions."
    },
    {
      question: "Can I trek solo?",
      answer: "Absolutely! Solo trekking is safe and rewarding. You'll be part of a group with a guide, and you can go at your own pace."
    },
    {
      question: "How do I book a trek?",
      answer: "Browse our available treks, select your preferred dates, and follow the booking process. You can also contact us for assistance."
    },
    {
      question: "What if I get altitude sickness?",
      answer: "We prioritize acclimatization and have trained staff to handle it. Our guides are certified in high-altitude rescue and first aid."
    },
    {
      question: "Are group discounts available?",
      answer: "Yes! We offer special rates for groups of 8 or more. Contact us to discuss your group requirements."
    },
    {
      question: "What should I pack?",
      answer: "We provide a detailed packing list for each trek. Generally, bring layers, good hiking shoes, sun protection, and any personal medications."
    }
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-6 pt-20 pb-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-12"
        >
          <FiArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="mb-20">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-400 text-lg">
            Find answers to common questions about trekking with Trail Makers
          </p>
        </div>

        <div className="space-y-6 mb-20">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-gray-900 border border-gray-700 rounded-lg p-8 hover:border-blue-400 transition"
            >
              <h3 className="font-bold text-lg text-blue-400 mb-3">
                {faq.question}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-blue-900/30 border border-blue-600 rounded-lg p-8 mb-20">
          <h2 className="text-2xl font-bold mb-4">Didn't find your answer?</h2>
          <p className="text-gray-200 mb-6">
            We're here to help! Feel free to reach out with any specific questions about your trek.
          </p>
          <Link href="/contact">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300">
              Contact Our Team
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
