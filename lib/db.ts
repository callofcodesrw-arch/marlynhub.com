import { mkdirSync } from "node:fs";
import { join } from "node:path";
import { DatabaseSync } from "node:sqlite";
import { neon } from "@neondatabase/serverless";

export type Booking = {
  id: number;
  name: string;
  phone: string;
  email: string | null;
  service: string;
  location: string;
  message: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  created_at: string;
};

type Sql = ReturnType<typeof neon>;

let cachedSql: Sql | null = null;
let cachedLocalDb: DatabaseSync | null = null;
let schemaPromise: Promise<void> | null = null;

function useLocalSQLite() {
  return !process.env.DATABASE_URL && !process.env.VERCEL;
}

export function isDatabaseConfigured() {
  return Boolean(process.env.DATABASE_URL) || useLocalSQLite();
}

function getSql(): Sql {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not configured");
  }
  if (!cachedSql) {
    cachedSql = neon(process.env.DATABASE_URL);
  }
  return cachedSql;
}

function getLocalDatabase(): DatabaseSync {
  if (process.env.VERCEL) {
    throw new Error("DATABASE_URL is not configured");
  }
  if (!cachedLocalDb) {
    const dataDirectory = join(process.cwd(), ".data");
    mkdirSync(dataDirectory, { recursive: true });
    cachedLocalDb = new DatabaseSync(join(dataDirectory, "bookings.sqlite"));
  }
  return cachedLocalDb;
}

/**
 * Creates the bookings table on first use. Safe to call on every request.
 */
export function ensureSchema(): Promise<void> {
  if (useLocalSQLite()) {
    getLocalDatabase().exec(`
      CREATE TABLE IF NOT EXISTS bookings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        phone TEXT NOT NULL,
        email TEXT,
        service TEXT NOT NULL,
        location TEXT NOT NULL,
        message TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'pending'
          CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
        created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
      );
      CREATE INDEX IF NOT EXISTS bookings_created_at_idx ON bookings (created_at DESC);
    `);
    return Promise.resolve();
  }

  if (!schemaPromise) {
    schemaPromise = (async () => {
      const sql = getSql();
      await sql`
        CREATE TABLE IF NOT EXISTS bookings (
          id BIGSERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          phone TEXT NOT NULL,
          email TEXT,
          service TEXT NOT NULL,
          location TEXT NOT NULL,
          message TEXT NOT NULL,
          status TEXT NOT NULL DEFAULT 'pending',
          created_at TIMESTAMPTZ NOT NULL DEFAULT now()
        )
      `;
      await sql`CREATE INDEX IF NOT EXISTS bookings_created_at_idx ON bookings (created_at DESC)`;
    })().catch((error) => {
      schemaPromise = null;
      throw error;
    });
  }
  return schemaPromise;
}

export async function insertBooking(input: {
  name: string;
  phone: string;
  email: string | null;
  service: string;
  location: string;
  message: string;
}) {
  await ensureSchema();
  if (useLocalSQLite()) {
    const result = getLocalDatabase()
      .prepare(
        `INSERT INTO bookings (name, phone, email, service, location, message)
         VALUES (?, ?, ?, ?, ?, ?)`,
      )
      .run(input.name, input.phone, input.email, input.service, input.location, input.message);
    const row = getLocalDatabase()
      .prepare("SELECT created_at FROM bookings WHERE id = ?")
      .get(result.lastInsertRowid) as { created_at: string };
    return { id: Number(result.lastInsertRowid), created_at: row.created_at };
  }

  const sql = getSql();
  const rows = (await sql`
    INSERT INTO bookings (name, phone, email, service, location, message)
    VALUES (${input.name}, ${input.phone}, ${input.email}, ${input.service}, ${input.location}, ${input.message})
    RETURNING id, created_at
  `) as unknown as Array<{ id: number; created_at: string }>;
  return rows[0];
}

export async function listBookings(limit = 100): Promise<Booking[]> {
  await ensureSchema();
  if (useLocalSQLite()) {
    const rows = getLocalDatabase()
      .prepare(
        `SELECT id, name, phone, email, service, location, message, status, created_at
         FROM bookings
         ORDER BY created_at DESC
         LIMIT ?`,
      )
      .all(limit);
    return rows.map((row) => ({
      id: Number(row.id),
      name: String(row.name),
      phone: String(row.phone),
      email: typeof row.email === "string" ? row.email : null,
      service: String(row.service),
      location: String(row.location),
      message: String(row.message),
      status: row.status as Booking["status"],
      created_at: String(row.created_at),
    }));
  }

  const sql = getSql();
  const rows = await sql`
    SELECT id, name, phone, email, service, location, message, status, created_at
    FROM bookings
    ORDER BY created_at DESC
    LIMIT ${limit}
  `;
  return rows as Booking[];
}
