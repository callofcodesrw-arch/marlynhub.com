import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Marlene Service Hub Rwanda — a premium service hub for car wash, laundry, cleaning, tourism, transport and hair salon services across Rwanda.",
};

const values = [
  {
    number: "01",
    title: "Professional service handling",
    text: "We focus on organised booking, clear communication and careful delivery so every customer knows what to expect.",
  },
  {
    number: "02",
    title: "Premium presentation",
    text: "From cleaning results to salon care and transport support, our goal is a polished, comfortable experience.",
  },
  {
    number: "03",
    title: "Multi-service convenience",
    text: "Customers can access car wash, laundry, cleaning, tourism, transport and beauty services from one trusted hub.",
  },
  {
    number: "04",
    title: "Customer-first mindset",
    text: "We listen, respond quickly and aim to solve each request with care, flexibility and respect for your time.",
  },
];

const process = [
  { title: "Choose the service you need", text: "Browse six categories built for modern homes, businesses and visitors." },
  { title: "Contact us with your request", text: "Use the online booking form, WhatsApp or a phone call." },
  { title: "Confirm details and timing", text: "We agree on location, schedule and any special requirements." },
  { title: "Enjoy a professional experience", text: "Our team delivers the service with a premium standard." },
];

export default function AboutPage() {
  return (
    <>
      <section className="page-hero about-hero">
        <span className="eyebrow">About Marlene Service Hub</span>
        <h1>Premium lifestyle, cleaning, beauty and travel services across Rwanda.</h1>
        <p className="page-hero-lede">
          Marlene Service Hub is built for people, families and businesses who want reliable
          service, elegant presentation and careful attention to detail. From spotless homes and
          fresh laundry to polished cars, hygienic restaurants, comfortable transport, tourism
          support and salon care, we bring multiple essential services together under one
          professional hub.
        </p>
        <div className="page-hero-actions">
          <Link className="btn btn-gold" href="/services">
            View Our Services
          </Link>
          <a className="btn btn-outline" href={site.whatsapp} target="_blank" rel="noopener">
            Book on WhatsApp
          </a>
        </div>
      </section>

      <section className="section">
        <div className="story-layout">
          <div className="story-copy">
            <span className="eyebrow">Our Story</span>
            <h2>Designed to make everyday service feel simple, premium and trusted.</h2>
            <p>
              We created Marlene Service Hub to give customers one dependable place for high-quality
              service requests. Instead of searching separately for cleaners, laundry support,
              transport, salon care or travel assistance, customers can connect with one team that
              understands professionalism, timing and customer comfort.
            </p>
            <p>
              Our approach is practical and premium: clear communication, neat presentation, trained
              service handling and a strong focus on customer satisfaction. Whether the request is
              personal, family-based or business-related, we aim to deliver a smooth experience from
              booking to completion.
            </p>
          </div>

          <div className="story-card">
            <div className="story-image">
              <Image
                src="/assets/contact-support-agent.png"
                alt="Marlene Service Hub support team member"
                fill
                sizes="(max-width: 900px) 100vw, 40vw"
              />
            </div>
            <div className="story-card-body">
              <span aria-hidden="true" className="story-spark">
                ✦
              </span>
              <h3>Service with care, class and consistency.</h3>
              <p>
                Every booking is treated with respect. We focus on clean results, safe handling,
                punctual support and a friendly customer experience.
              </p>
              <div className="tag-row">
                <span>Premium Finish</span>
                <span>Reliable Team</span>
                <span>Rwanda Focused</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="section-heading">
          <span className="eyebrow">Why Choose Us</span>
          <h2>A modern service hub with premium standards.</h2>
          <p>
            We combine convenience, professionalism and multi-service flexibility so customers can
            book with confidence and receive support that feels organised, respectful and refined.
          </p>
        </div>
        <div className="value-grid value-grid-wide">
          {values.map((value) => (
            <div className="value-card numbered" key={value.number}>
              <span className="value-index">{value.number}</span>
              <h3>{value.title}</h3>
              <p>{value.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <span className="eyebrow">How It Works</span>
          <h2>Simple booking. Clear service. Premium results.</h2>
          <p>
            Our process is designed to be easy, fast and comfortable whether you are booking for
            yourself, your home, your vehicle or your business.
          </p>
        </div>
        <div className="process-list">
          {process.map((item, index) => (
            <div className="process-row" key={item.title}>
              <span className="process-number">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-card">
          <span className="eyebrow">Ready to Book?</span>
          <h2>Let Marlene Service Hub handle your next service request.</h2>
          <p>
            Speak to us today about car wash, laundry, cleaning, tourism, transport or hair salon
            support across Rwanda.
          </p>
          <div className="cta-actions">
            <Link className="btn btn-gold" href="/contact#booking">
              Send Request
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
