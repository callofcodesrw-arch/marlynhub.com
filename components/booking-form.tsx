"use client";

import { useEffect, useState } from "react";
import { serviceOptions, site } from "@/lib/site";

type Status = "idle" | "submitting" | "success" | "error";

export default function BookingForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    const raw = new URLSearchParams(window.location.search).get("service") ?? "";
    const match = serviceOptions.find(
      (option) => option.toLowerCase() === raw.trim().toLowerCase(),
    );
    if (!match) return;
    const select = document.getElementById("service") as HTMLSelectElement | null;
    if (select) select.value = match;
  }, []);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus("submitting");
    setError("");

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = (await response.json()) as { ok?: boolean; error?: string };

      if (!response.ok || !result.ok) {
        setError(result.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      form.reset();
      setStatus("success");
    } catch {
      setError("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="booking-success" role="status">
        <span className="booking-success-icon" aria-hidden="true">
          ✓
        </span>
        <h3>Booking request received</h3>
        <p>
          Thank you. Our team will confirm your service by phone or WhatsApp shortly. For an
          immediate response, message us directly.
        </p>
        <div className="booking-success-actions">
          <a className="btn btn-gold" href={site.whatsapp} target="_blank" rel="noopener">
            Chat on WhatsApp
          </a>
          <button className="btn btn-outline" type="button" onClick={() => setStatus("idle")}>
            Book another service
          </button>
        </div>
      </div>
    );
  }

  return (
    <form className="booking-form" onSubmit={onSubmit} noValidate>
      {status === "error" && (
        <div className="form-alert" role="alert">
          {error}
        </div>
      )}

      <div className="form-grid">
        <label>
          <span>Your Name</span>
          <input name="name" type="text" placeholder="Enter your name" autoComplete="name" required />
        </label>
        <label>
          <span>Phone Number</span>
          <input
            name="phone"
            type="tel"
            placeholder="0781 155 229"
            autoComplete="tel"
            inputMode="tel"
            required
          />
        </label>
      </div>

      <div className="form-grid">
        <label>
          <span>Service Needed</span>
          <select id="service" name="service" defaultValue="" required>
            <option value="" disabled>
              Choose a service
            </option>
            {serviceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
            <option value="Other / Multiple services">Other / Multiple services</option>
          </select>
        </label>
        <label>
          <span>Location</span>
          <input
            name="location"
            type="text"
            placeholder="Your area or city"
            autoComplete="address-level2"
            required
          />
        </label>
      </div>

      <label>
        <span>
          Email <em>(optional)</em>
        </span>
        <input name="email" type="email" placeholder="you@example.com" autoComplete="email" />
      </label>

      <label>
        <span>Booking Message</span>
        <textarea
          name="message"
          rows={5}
          placeholder="Tell us what you need, preferred date and time, or any special instructions."
          required
        />
      </label>

      <input
        className="form-honeypot"
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <button className="btn btn-gold booking-submit" type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending…" : "Send Booking Request"}
        {status !== "submitting" && <span aria-hidden="true">→</span>}
      </button>
      <p className="booking-note">
        We reply quickly during working hours. Prefer to talk?{" "}
        <a href={site.whatsapp} target="_blank" rel="noopener">
          Message us on WhatsApp
        </a>
        .
      </p>
    </form>
  );
}
