import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
// --------------------
// Validation Schema
// --------------------
const schema = z.object({
  type: z.enum(["support", "feedback", "contact"]),
  email: z.string().email(),
  message: z.string().min(10).max(5000),
  app: z.string().optional(),
  problemType: z.string().optional(),
  category: z.string().optional(),
  locale: z.enum(["en", "de"]).optional(),
});

// --------------------
// POST /api/forms
// --------------------
export async function POST(req: Request) {
  
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ ok: false, error: "Missing RESEND_API_KEY" }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
  const resend = new Resend(apiKey);

try {
    const data = schema.parse(await req.json());

    const from = process.env.MAIL_FROM;

    const to =
      data.type === "support"
        ? process.env.MAIL_TO_SUPPORT
        : data.type === "feedback"
        ? process.env.MAIL_TO_FEEDBACK
        : process.env.MAIL_TO_CONTACT;

    if (!to || !from || !process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { ok: false, error: "Missing mail environment variables." },
        { status: 500 }
      );
    }

    // --------------------
    // Internal Mail (to you)
    // --------------------
    const subject =
      data.type === "support"
        ? `LaCodea Support (${data.app ?? "unknown app"})`
        : data.type === "feedback"
        ? `LaCodea Feedback (${data.app ?? "general"})`
        : "LaCodea Contact";

    const text = [
      `Type: ${data.type}`,
      `Locale: ${data.locale ?? "en"}`,
      `Email: ${data.email}`,
      data.app ? `App: ${data.app}` : "",
      data.problemType ? `Problem: ${data.problemType}` : "",
      data.category ? `Category: ${data.category}` : "",
      "",
      "Message:",
      data.message,
    ]
      .filter(Boolean)
      .join("\n");

    await resend.emails.send({
      from,
      to,
      subject,
      text,
      replyTo: data.email,
    });

    // --------------------
    // Auto-reply to user
    // --------------------
    const userSubject =
      data.locale === "de"
        ? "Wir haben deine Nachricht erhalten"
        : "We received your message";

    const userText =
      data.locale === "de"
        ? `Hallo,

vielen Dank für deine Nachricht an LaCodea.
Wir haben sie erhalten und melden uns so bald wie möglich.

Deine Nachricht:
--------------------------------
${data.message}
--------------------------------

— LaCodea`
        : `Hi,

thank you for contacting LaCodea.
We have received your message and will get back to you as soon as possible.

Your message:
--------------------------------
${data.message}
--------------------------------

— LaCodea`;

    await resend.emails.send({
      from,
      to: data.email,
      subject: userSubject,
      text: userText,
    });

    // --------------------
    // Success
    // --------------------
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message ?? "Invalid request" },
      { status: 400 }
    );
  }
}