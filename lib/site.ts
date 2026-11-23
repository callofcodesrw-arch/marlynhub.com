export const site = {
  name: "Marlene Service Hub",
  tagline: "Luxury lifestyle services across Rwanda",
  phone: "0781155229",
  phoneIntl: "+250781155229",
  whatsapp: "https://wa.me/250781155229",
  email: "info@marlenhub.com",
  location: "Kigali, Rwanda",
  description:
    "Marlene Service Hub brings premium car wash, laundry, house cleaning, restaurant cleaning, tourism, transport and salon services together in one trusted hub across Rwanda.",
};

export type Service = {
  slug: string;
  number: string;
  title: string;
  badge: string;
  icon: string;
  image: string;
  short: string;
  description: string;
  features: string[];
};

export const services: Service[] = [
  {
    slug: "car-wash",
    number: "01",
    title: "Car Wash & Detailing",
    badge: "Auto Care",
    icon: "🚗",
    image: "/assets/service-cards/car-wash.jpg",
    short: "Premium car wash service for a spotless shine.",
    description:
      "We help your vehicle look clean, fresh and presentable with careful exterior washing, interior cleaning and finishing touches designed for daily drivers, private cars and professional vehicles.",
    features: [
      "Exterior wash with body-safe cleaning care",
      "Interior vacuuming, dashboard and seat refresh",
      "Wheel, tyre and glass cleaning for a polished look",
      "Detail-focused finishing for a premium appearance",
    ],
  },
  {
    slug: "laundry",
    number: "02",
    title: "Laundry & Dry Cleaning",
    badge: "Fabric Care",
    icon: "🧺",
    image: "/assets/service-cards/laundry.jpg",
    short: "Professional laundry and dry cleaning, handled with care.",
    description:
      "Our laundry service is made for customers who want fresh, clean and well-handled clothing without stress. We focus on neat handling, careful sorting and a clean finished presentation.",
    features: [
      "Washing, drying and folding for everyday clothing",
      "Careful handling for delicate fabrics and uniforms",
      "Fresh finish suitable for home, work and travel use",
      "Reliable service for individuals, families and businesses",
    ],
  },
  {
    slug: "house-cleaning",
    number: "03",
    title: "House Cleaning",
    badge: "Home Care",
    icon: "🏠",
    image: "/assets/service-cards/house-cleaning.jpg",
    short: "Spotless home cleaning services you can trust.",
    description:
      "We create a cleaner, healthier and more comfortable home environment. Our house cleaning service is suitable for regular maintenance, deep cleaning and special cleaning needs.",
    features: [
      "Living room, bedroom, kitchen and bathroom cleaning",
      "Dusting, mopping, surface care and organisation support",
      "Deep cleaning options for move-in, move-out or events",
      "Professional approach with respect for your space",
    ],
  },
  {
    slug: "restaurant-cleaning",
    number: "04",
    title: "Restaurant Cleaning",
    badge: "Business Hygiene",
    icon: "🍽️",
    image: "/assets/service-cards/restaurant-cleaning.jpg",
    short: "Professional cleaning for a hygienic, welcoming space.",
    description:
      "Restaurants need a clean environment that supports customer trust and daily operations. We assist with dining areas, service spaces and hygiene-focused cleaning routines.",
    features: [
      "Dining area cleaning and customer-facing presentation",
      "Kitchen surface support and general sanitation care",
      "Floor, table, counter and high-touch area cleaning",
      "Flexible cleaning support for restaurants and cafés",
    ],
  },
  {
    slug: "tourism-transport",
    number: "05",
    title: "Tourism & Transport",
    badge: "Travel Support",
    icon: "🚐",
    image: "/assets/service-cards/tourism-transport.jpg",
    short: "Comfortable travel and transport solutions.",
    description:
      "Enjoy a comfortable Rwanda travel experience with transport support for visitors, business guests, local movement and tourism activities arranged with care and convenience.",
    features: [
      "Airport, hotel and city transfer support",
      "Transport for tours, meetings and special visits",
      "Comfort-focused planning for smooth movement",
      "Helpful local service guidance for guests and groups",
    ],
  },
  {
    slug: "hair-salon",
    number: "06",
    title: "Hair Salon & Styling",
    badge: "Beauty Care",
    icon: "💇",
    image: "/assets/service-cards/hair-salon.jpg",
    short: "Expert hair and beauty care services.",
    description:
      "Our salon service is designed for clean, confident and stylish hair care. We focus on presentation, comfort and a professional beauty experience for everyday looks and special moments.",
    features: [
      "Hair styling support for casual and formal looks",
      "Neat grooming and beauty-focused presentation",
      "Comfortable service experience with personal attention",
      "Suitable for appointments, events and regular care",
    ],
  },
];

export const serviceOptions = services.map((s) => s.title);
