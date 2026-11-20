import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const contacts = new Map<string, number[]>();

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const subject = String(body.subject ?? "").trim();
  const message = String(body.message ?? "").trim();
  const honeypot = String(body.website ?? "").trim();

  if (honeypot) return NextResponse.json({ error: "Spam detected." }, { status: 400 });
  if (name.length < 2 || name.length > 80 || !validateEmail(email) || email.length > 160 || subject.length < 3 || subject.length > 140 || message.length < 10 || message.length > 5000) {
    return NextResponse.json({ error: "Please check the submitted fields." }, { status: 400 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const now = Date.now();
  const recent = (contacts.get(ip) ?? []).filter(time => now - time < 10 * 60 * 1000);
  if (recent.length >= 5) return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  recent.push(now); contacts.set(ip, recent);

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return NextResponse.json({ error: "Contact service is not configured yet." }, { status: 503 });

  try {
    const supabase = createClient(url, key);
    const { error } = await supabase.from("contact_messages").insert({ name, email, subject, message });
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Message could not be saved. Please try email directly." }, { status: 500 });
  }
}
