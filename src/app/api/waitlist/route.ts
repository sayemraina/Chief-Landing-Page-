import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, company } = body;

    if (!email || !name || !company) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    const sql = neon(process.env.DATABASE_URL!);

    // Create table if it doesn't exist (idempotent)
    await sql`
      CREATE TABLE IF NOT EXISTS waitlist (
        id SERIAL PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        name TEXT NOT NULL,
        company TEXT NOT NULL,
        source_url TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        contacted BOOLEAN DEFAULT FALSE,
        notes TEXT
      )
    `;

    // Check for duplicate
    const existing = await sql`SELECT id FROM waitlist WHERE email = ${email}`;
    if (existing.length > 0) {
      return NextResponse.json(
        { error: "You're already signed up" },
        { status: 409 }
      );
    }

    const sourceUrl = request.headers.get("referer") || null;

    await sql`
      INSERT INTO waitlist (email, name, company, source_url)
      VALUES (${email}, ${name.trim()}, ${company.trim()}, ${sourceUrl})
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Waitlist error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
