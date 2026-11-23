import Link from "next/link";
import { services, site } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <Link className="logo" href="/" aria-label="Marlene Service Hub home">
            <span className="logo-mark">M</span>
            <span className="logo-type">
              Marlene<small>Service Hub</small>
            </span>
          </Link>
          <p>
            Premium lifestyle, cleaning, beauty and travel services for homes, businesses and
            visitors across Rwanda.
          </p>
          <a
            className="btn btn-gold"
            href={site.whatsapp}
            target="_blank"
            rel="noopener"
          >
            Book on WhatsApp
          </a>
        </div>

        <div className="footer-column">
          <h3>Services</h3>
          <ul>
            {services.map((service) => (
              <li key={service.slug}>
                <Link href={`/services#${service.slug}`}>{service.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-column">
          <h3>Company</h3>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/services">Services</Link>
            </li>
            <li>
              <Link href="/about">About Us</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
            <li>
              <Link href="/contact#booking">Book a Service</Link>
            </li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Get in Touch</h3>
          <ul>
            <li>
              <a href={`tel:${site.phoneIntl}`}>{site.phone}</a>
            </li>
            <li>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </li>
            <li>
              <a href={site.whatsapp} target="_blank" rel="noopener">
                WhatsApp Chat
              </a>
            </li>
            <li>{site.location}</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Marlene Service Hub. All rights reserved.</p>
        <p>Kigali · Rwanda</p>
      </div>
    </footer>
  );
}
