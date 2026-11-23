import Image from "next/image";
import Link from "next/link";
import type { Service } from "@/lib/site";

type Props = {
  service: Service;
  detailed?: boolean;
};

export default function ServiceCard({ service, detailed = false }: Props) {
  return (
    <article id={service.slug} className={`service-card${detailed ? " service-card-detailed" : ""}`}>
      <div className="service-media">
        <Image
          src={service.image}
          alt={service.title}
          fill
          sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 33vw"
        />
        <span className="service-number">{service.number}</span>
        <span className="service-badge">{service.badge}</span>
      </div>

      <div className="service-body">
        <div className="service-heading">
          <span className="service-icon" aria-hidden="true">
            {service.icon}
          </span>
          <h3>{service.title}</h3>
        </div>
        <p>{detailed ? service.description : service.short}</p>

        {detailed && (
          <ul className="service-features">
            {service.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        )}

        <Link className="service-link" href={`/contact?service=${encodeURIComponent(service.title)}#booking`}>
          {detailed ? "Book this service" : "Book this service"}
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}
