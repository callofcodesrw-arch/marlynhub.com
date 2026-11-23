import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { isDatabaseConfigured, listBookings, type Booking } from "@/lib/db";

export const runtime = "nodejs";

export const metadata: Metadata = {
  title: "Bookings",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const COOKIE = "msh_admin";

async function login(formData: FormData) {
  "use server";
  const token = String(formData.get("token") ?? "");
  const expected = process.env.ADMIN_TOKEN;
  if (!expected || token !== expected) {
    redirect("/admin?error=1");
  }
  const store = await cookies();
  store.set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin",
    maxAge: 60 * 60 * 8,
  });
  redirect("/admin");
}

async function logout() {
  "use server";
  const store = await cookies();
  store.delete(COOKIE);
  redirect("/admin");
}

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Africa/Kigali",
});

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  const expected = process.env.ADMIN_TOKEN;
  const store = await cookies();
  const authorised = Boolean(expected) && store.get(COOKIE)?.value === expected;

  if (!authorised) {
    return (
      <section className="admin-page">
        <div className="admin-login">
          <span className="eyebrow">Staff Access</span>
          <h1>Bookings Dashboard</h1>
          <p>Enter the admin token to view incoming service requests.</p>
          {!expected && (
            <div className="form-alert">
              Set the <code>ADMIN_TOKEN</code> environment variable to enable this page.
            </div>
          )}
          {params.error && <div className="form-alert">That token is not correct.</div>}
          <form action={login}>
            <label>
              <span>Admin token</span>
              <input name="token" type="password" autoComplete="current-password" required />
            </label>
            <button className="btn btn-gold" type="submit">
              Open Dashboard
            </button>
          </form>
        </div>
      </section>
    );
  }

  let bookings: Booking[] = [];
  let error: string | null = null;

  if (!isDatabaseConfigured()) {
    error = "DATABASE_URL is not configured, so bookings cannot be loaded.";
  } else {
    try {
      bookings = await listBookings();
    } catch (cause) {
      console.error("Failed to load bookings:", cause);
      error = "Could not load bookings from the database.";
    }
  }

  const pending = bookings.filter((booking) => booking.status === "pending").length;

  return (
    <section className="admin-page">
      <div className="admin-head">
        <div>
          <span className="eyebrow">Marlene Service Hub</span>
          <h1>Bookings Dashboard</h1>
          <p>
            {bookings.length} request{bookings.length === 1 ? "" : "s"} · {pending} pending
          </p>
        </div>
        <form action={logout}>
          <button className="btn btn-outline" type="submit">
            Sign out
          </button>
        </form>
      </div>

      {error && <div className="form-alert">{error}</div>}

      {!error && bookings.length === 0 && (
        <div className="admin-empty">No bookings yet. New requests will appear here.</div>
      )}

      {bookings.length > 0 && (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Received</th>
                <th>Customer</th>
                <th>Service</th>
                <th>Location</th>
                <th>Message</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{dateFormat.format(new Date(booking.created_at))}</td>
                  <td>
                    <strong>{booking.name}</strong>
                    <a href={`tel:${booking.phone}`}>{booking.phone}</a>
                    {booking.email && <a href={`mailto:${booking.email}`}>{booking.email}</a>}
                  </td>
                  <td>{booking.service}</td>
                  <td>{booking.location}</td>
                  <td className="admin-message">{booking.message}</td>
                  <td>
                    <span className={`status-pill status-${booking.status}`}>{booking.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
