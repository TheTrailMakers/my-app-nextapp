import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

export default function GetInTouchPage() {
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
              Get In Touch
            </h1>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Have questions about your trek? Want to plan a custom adventure?
              Or just want to share your excitement about mountain trekking?
              We'd love to hear from you. Reach out to our team anytime.
            </p>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-lg text-primary mb-2">
                  📱 WhatsApp
                </h3>
                <p className="text-muted-foreground">+91 7980426832</p>
                <a
                  href="https://wa.me/917980426832"
                  className="text-primary hover:text-primary/80 text-sm font-semibold"
                >
                  Chat Now →
                </a>
              </div>
              <div>
                <h3 className="font-bold text-lg text-primary mb-2">
                  📧 Email
                </h3>
                <p className="text-muted-foreground">
                  hello@thetrailmakers.com
                </p>
              </div>
              <div>
                <h3 className="font-bold text-lg text-primary mb-2">
                  📍 Office
                </h3>
                <p className="text-muted-foreground">Himachal Pradesh, India</p>
              </div>
            </div>
          </div>
          <div className="relative h-96 md:h-full min-h-96 rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop"
              alt="Contact our team"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-8 mb-20">
          <h2 className="text-2xl font-bold mb-6">How We Can Help</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-lg text-primary mb-3">
                🎯 Trek Inquiries
              </h3>
              <p className="text-muted-foreground">
                Get details about specific treks, schedules, pricing, and
                availability. We'll help you find your perfect adventure.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg text-primary mb-3">
                📝 Booking Support
              </h3>
              <p className="text-muted-foreground">
                Already booked? We're here to help with any booking changes,
                questions, or support you need.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg text-primary mb-3">
                🚀 Custom Treks
              </h3>
              <p className="text-muted-foreground">
                Looking for a custom adventure? Tell us your vision, and we'll
                craft the perfect trek for your group.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg text-primary mb-3">
                ❓ General Questions
              </h3>
              <p className="text-muted-foreground">
                Anything else? Whether it's safety, fitness, gear, or anything
                in between, we're here to help.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-primary/10 border border-primary/20 rounded-lg p-8 mb-20">
          <h2 className="text-2xl font-bold mb-4">Response Times</h2>
          <div className="space-y-3 text-muted-foreground">
            <p>
              📱 <span className="font-bold">WhatsApp:</span> Response within
              1-2 hours (9 AM - 6 PM IST)
            </p>
            <p>
              📧 <span className="font-bold">Email:</span> Response within 24
              hours
            </p>
            <p>
              ☎️ <span className="font-bold">Phone:</span> Available for
              bookings and urgent matters
            </p>
          </div>
        </div>

        <div className="text-center pb-10">
          <Link href="/contact">
            <button className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-4 px-10 rounded-lg transition duration-300 text-lg">
              Send Us a Message
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
