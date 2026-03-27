import React from "react";
import Link from "next/link";

import { FaWhatsapp } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";

function Contact() {
  return (
    <div className="min-h-screen bg-linear-to-b from-background via-background to-muted/60 pt-40 text-center text-foreground">
      <div className="font-bold text-5xl mb-4 mx-1 uppercase below-xs:text-2xl">
        Contact Us
      </div>
      <div className="mx-20 mb-8 text-muted-foreground">
        {" "}
        Get in touch with us for any trek details, bookings, or inquiries
      </div>

      <div className="py-8 flex justify-center gap-2">
        <Link
          href="https://wa.me/7980426832"
          className="flex flex-col items-center"
        >
          <div className="mb-3 rounded-xl bg-primary/15 p-4 text-primary">
            <FaWhatsapp className="size-10 mx-auto" />
          </div>
          <p className="text-sm font-semibold text-foreground">WhatsApp</p>
          <p className="text-xs text-muted-foreground">+91 7980426832</p>
        </Link>

        <div className="w-0.75 bg-border"></div>

        <Link
          href="https://www.instagram.com/the_trail_makers"
          className="flex flex-col items-center"
        >
          <div className="mb-3 rounded-xl bg-secondary p-4 text-secondary-foreground">
            <FaInstagram className="size-10" />
          </div>
          <p className="text-sm font-semibold text-foreground">Instagram</p>
          <p className="text-xs text-muted-foreground">@the_trail_makers</p>
        </Link>
      </div>

      {/* Contact Details */}
      <div className="mt-16 px-4">
        <h3 className="text-2xl font-bold mb-6">Quick Contacts</h3>
        <div className="mx-auto max-w-md space-y-4 rounded-lg border border-border bg-card p-8">
          <div>
            <p className="text-sm text-muted-foreground">Phone / WhatsApp</p>
            <a
              href="tel:+917980426832"
              className="font-semibold text-primary hover:text-primary/90"
            >
              +91 7980426832
            </a>
          </div>
          <div className="border-t border-border pt-4">
            <p className="text-sm text-muted-foreground">Follow Us On</p>
            <a
              href="https://www.instagram.com/the_trail_makers"
              className="font-semibold text-primary hover:text-primary/90"
            >
              Instagram - @the_trail_makers
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
