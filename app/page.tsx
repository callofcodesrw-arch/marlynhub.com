import Image from "next/image";
import Link from "next/link";
import ServiceCard from "@/components/service-card";
import { services, site } from "@/lib/site";

const values = [
  {
    icon: "✦",
    title: "Professional Staff",
    text: "Trained, respectful teams who handle every home, vehicle and guest with care.",
  },
  {
    icon: "◈",
    title: "Fast & Reliable Service",
    text: "Clear bookings, punctual arrivals and communication you can count on.",
  },
  {
    icon: "◇",
    title: "Luxury Experience",
    text: "A polished, premium finish on every service, from cleaning to salon care.",
  },
  {
    icon: "⌖",
    title: "Trusted Across Rwanda",
    text: "Serving Kigali homes, businesses and visitors with one dependable hub.",
  },
];

const steps = [
  { number: "01", title: "Choose your service", text: "Select the service you need from our six premium categories." },
  { number: "02", title: "Send your request", text: "Share your location, preferred date and any special instructions." },
  { number: "03", title: "We confirm", text: "Our team confirms the details and timing with you directly." },
  { number: "04", title: "Enjoy the result", text: "Relax while our professionals deliver a premium finish." },
];

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero-banner">
          <Image
            src="/assets/marlene-hero-banner.png"
            alt="Marlene Service Hub luxury lifestyle services across Rwanda — car wash, laundry, house cleaning, restaurant cleaning, transport and salon care"
            fill
            priority
            sizes="100vw"
          />
        </div>
        <div className="hero-actions">
          <div className="hero-actions-copy">
            <span className="eyebrow">Premium Services · Kigali, Rwanda</span>
            <p>One trusted team for your car, home, laundry, business, travel and beauty needs.</p>
          </div>
          <div className="hero-buttons">
            <Link className="btn btn-gold" href="/contact#booking">
              Book a Service
            </Link>
            <a className="btn btn-outline" href={site.whatsapp} target="_blank" rel="noopener">
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="section" id="services">
        <div className="section-heading">
          <span className="eyebrow">What We Do</span>
          <h2>Premium Services</h2>
          <p>
            Elegant lifestyle support for homes, businesses, travel and personal care across
            Rwanda.
          </p>
        </div>

        <div className="service-grid">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>

        <div className="section-cta">
          <Link className="text-link" href="/services">
            View all service details <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <section className="section section-alt">
        <div className="value-layout">
          <div className="value-copy">
            <span className="eyebrow">Why Marlene</span>
            <h2>Service with care, class and consistency.</h2>
            <p>
              Instead of searching separately for cleaners, laundry support, transport, salon care
              or travel assistance, customers connect with one team that understands
              professionalism, timing and comfort.
            </p>
            <Link className="btn btn-outline" href="/about">
              About Our Hub
            </Link>
          </div>

          <div className="value-grid">
            {values.map((value) => (
              <div className="value-card" key={value.title}>
                <span className="value-icon" aria-hidden="true">
                  {value.icon}
                </span>
                <h3>{value.title}</h3>
                <p>{value.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <span className="eyebrow">Simple Process</span>
          <h2>How It Works</h2>
          <p>Booking a premium service takes less than a minute.</p>
        </div>
        <div className="step-grid">
          {steps.map((step) => (
            <div className="step-card" key={step.number}>
              <span className="step-number">{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-card">
          <span className="eyebrow">Ready When You Are</span>
          <h2>Let Marlene Service Hub handle your next request.</h2>
          <p>
            Tell us what you need and we will confirm your booking quickly — by phone, WhatsApp or
            through our online request form.
          </p>
          <div className="cta-actions">
            <Link className="btn btn-gold" href="/contact#booking">
              Send Booking Request
            </Link>
            <a className="btn btn-outline" href={`tel:${site.phoneIntl}`}>
              Call {site.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
