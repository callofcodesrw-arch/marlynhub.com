import type { Metadata } from "next";
import Image from "next/image";
import BookingForm from "@/components/booking-form";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact & Booking",
  description:
    "Contact Marlene Service Hub for car wash, laundry, house cleaning, restaurant cleaning, tourism, transport and hair salon services across Rwanda.",
};

const trust = [
  { icon: "♢", title: "Fast", text: "Response" },
  { icon: "☺", title: "Friendly", text: "Support" },
  { icon: "✿", title: "Premium", text: "Quality" },
  { icon: "⌖", title: "Across", text: "Rwanda" },
];

export default function ContactPage() {
  return (
    <>
      <section className="contact-hero">
        <div className="contact-copy">
          <span className="eyebrow">Contact Us</span>
          <h1>
            Let&apos;s make your booking <em>easy</em>.
          </h1>
          <p>
            Contact Marlene Service Hub for car wash, laundry, house cleaning, restaurant cleaning,
            tourism, transport and hair salon services across Rwanda.
          </p>

          <div className="contact-actions">
            <a className="contact-action" href={`tel:${site.phoneIntl}`}>
              <span className="contact-icon" aria-hidden="true">
                ☎
              </span>
              <span>
                <small>Call Us</small>
                <strong>{site.phone}</strong>
              </span>
              <span className="contact-arrow" aria-hidden="true">
                →
              </span>
            </a>

            <a
              className="contact-action"
              href={site.whatsapp}
              target="_blank"
              rel="noopener"
            >
              <span className="contact-icon" aria-hidden="true">
                ☘
              </span>
              <span>
                <small>Chat on</small>
                <strong>WhatsApp</strong>
              </span>
              <span className="contact-arrow" aria-hidden="true">
                →
              </span>
            </a>

            <a className="contact-action" href={`mailto:${site.email}`}>
              <span className="contact-icon" aria-hidden="true">
                ✉
              </span>
              <span>
                <small>Email Us</small>
                <strong>{site.email}</strong>
              </span>
              <span className="contact-arrow" aria-hidden="true">
                →
              </span>
            </a>
          </div>

          <div className="trust-row">
            {trust.map((item) => (
              <div key={item.title}>
                <span aria-hidden="true">{item.icon}</span>
                <strong>{item.title}</strong>
                <small>{item.text}</small>
              </div>
            ))}
          </div>
        </div>

        <div className="contact-photo">
          <Image
            src="/assets/contact-support-agent.png"
            alt="Smiling Marlene Service Hub support agent"
            fill
            priority
            sizes="(max-width: 900px) 100vw, 45vw"
          />
        </div>
      </section>

      <section className="section booking-section" id="booking">
        <div className="booking-layout">
          <div className="booking-copy">
            <span className="eyebrow">Quick Request</span>
            <h2>Send a booking message</h2>
            <p>
              Tell us what service you need and our friendly team will help you confirm your booking
              quickly.
            </p>
            <ul className="booking-benefits">
              <li>Fast reply</li>
              <li>Premium service</li>
              <li>Across Rwanda</li>
            </ul>
            <div className="booking-contact-card">
              <h3>Prefer to talk?</h3>
              <p>Call or WhatsApp us and we will arrange everything for you.</p>
              <a href={`tel:${site.phoneIntl}`}>{site.phone}</a>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </div>
          </div>

          <BookingForm />
        </div>
      </section>
    </>
  );
}
