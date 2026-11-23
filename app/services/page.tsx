import type { Metadata } from "next";
import Link from "next/link";
import ServiceCard from "@/components/service-card";
import { services, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Premium Services",
  description:
    "Explore Marlene Service Hub premium services: car wash, laundry and dry cleaning, house cleaning, restaurant cleaning, tourism, transport and hair salon care across Rwanda.",
};

const steps = [
  { number: "01", title: "Choose your service", text: "Pick the category that fits your home, vehicle, business, travel or beauty needs." },
  { number: "02", title: "Send the details", text: "Share your location, preferred date and time, and any special instructions." },
  { number: "03", title: "We confirm", text: "Our team confirms availability and the exact details with you." },
  { number: "04", title: "Premium finish", text: "Our professionals arrive prepared and deliver the service with care." },
];

export default function ServicesPage() {
  return (
    <>
      <section className="page-hero">
        <span className="eyebrow">Premium Lifestyle & Business Support</span>
        <h1>Services designed with detail, comfort and professional care.</h1>
        <p className="page-hero-lede">
          Marlene Service Hub brings reliable everyday services under one professional brand — from
          spotless cars and fresh laundry to clean homes, hygienic restaurants, smooth transport and
          elegant hair care.
        </p>
        <div className="page-hero-actions">
          <Link className="btn btn-gold" href="/contact#booking">
            Request a Service
          </Link>
          <a className="btn btn-outline" href={site.whatsapp} target="_blank" rel="noopener">
            Book on WhatsApp
          </a>
        </div>
        <dl className="hero-stats">
          <div>
            <dt>6+</dt>
            <dd>Core Services</dd>
          </div>
          <div>
            <dt>Premium</dt>
            <dd>Customer Care</dd>
          </div>
          <div>
            <dt>Rwanda</dt>
            <dd>Local Service Hub</dd>
          </div>
        </dl>
      </section>

      <section className="section">
        <div className="section-heading">
          <span className="eyebrow">What We Offer</span>
          <h2>Detailed Service Categories</h2>
          <p>
            Choose the service you need and our team will guide you with a clear process, proper
            timing and professional execution.
          </p>
        </div>

        <div className="service-grid detailed">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} detailed />
          ))}
        </div>
      </section>

      <section className="section section-alt">
        <div className="value-layout">
          <div className="value-copy">
            <span className="eyebrow">Why Choose Us</span>
            <h2>One hub, many services, one premium standard.</h2>
            <p>
              Instead of contacting different providers for different tasks, Marlene Service Hub
              gives you a simple way to request trusted everyday services. We focus on
              communication, quality control, timing and respectful customer care.
            </p>
            <Link className="btn btn-outline" href="/about">
              Learn About Us
            </Link>
          </div>
          <div className="value-grid">
            <div className="value-card">
              <span className="value-icon" aria-hidden="true">✦</span>
              <h3>Clear booking</h3>
              <p>Tell us what you need, your location and preferred timing.</p>
            </div>
            <div className="value-card">
              <span className="value-icon" aria-hidden="true">✦</span>
              <h3>Professional handling</h3>
              <p>Each service is organised with attention to detail and customer comfort.</p>
            </div>
            <div className="value-card">
              <span className="value-icon" aria-hidden="true">✦</span>
              <h3>Premium finish</h3>
              <p>We aim for a clean, polished and satisfying result every time.</p>
            </div>
            <div className="value-card">
              <span className="value-icon" aria-hidden="true">⌖</span>
              <h3>Local expertise</h3>
              <p>Kigali-based coordination with support across Rwanda.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <span className="eyebrow">Simple Process</span>
          <h2>How to Get Started</h2>
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
          <h2>Need a reliable service today?</h2>
          <p>
            Send your request and we will help you choose the right option for your home, business,
            vehicle, travel plan or beauty care needs.
          </p>
          <div className="cta-actions">
            <Link className="btn btn-gold" href="/contact#booking">
              Contact Us
            </Link>
            <a className="btn btn-outline" href={site.whatsapp} target="_blank" rel="noopener">
              WhatsApp Now
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
