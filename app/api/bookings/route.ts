import { NextResponse } from "next/server";
import { insertBooking, isDatabaseConfigured } from "@/lib/db";

export const runtime = "nodejs";

type Payload = Record<string, unknown>;

const clean = (value: unknown, max = 500) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

export async function POST(request: Request) {
  let payload: Payload;
  try {
    payload = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot: real visitors never fill this hidden field.
  if (clean(payload.website)) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(payload.name, 120);
  const phone = clean(payload.phone, 40);
  const email = clean(payload.email, 160);
  const service = clean(payload.service, 120);
  const location = clean(payload.location, 160);
  const message = clean(payload.message, 2000);

  if (!name || !phone || !service || !location || !message) {
    return NextResponse.json(
      { error: "Please fill in your name, phone, service, location and message." },
      { status: 400 },
    );
  }

  if (phone.replace(/[^\d+]/g, "").length < 9) {
    return NextResponse.json({ error: "Please enter a valid phone number." }, { status: 400 });
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  if (!isDatabaseConfigured()) {
    return NextResponse.json(
      {
        error:
          "Booking storage is not configured yet. Please call or WhatsApp us and we will help right away.",
      },
      { status: 503 },
    );
  }

  try {
    const booking = await insertBooking({
      name,
      phone,
      email: email || null,
      service,
      location,
      message,
    });
    return NextResponse.json({ ok: true, id: booking.id }, { status: 201 });
  } catch (error) {
    console.error("Failed to save booking:", error);
    return NextResponse.json(
      { error: "We could not save your booking. Please try again or contact us on WhatsApp." },
      { status: 500 },
    );
  }
}
