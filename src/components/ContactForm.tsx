import type { Locale } from "@/lib/i18n/shared";
"use client";

import { useState } from "react";

type Props = {
  locale?: Locale | "fr";
};

export default function ContactForm({ locale = "en" }: Props) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "contact",
          email,
          message,
          locale,
        }),
      });

      const json = await res.json();

      if (!json.ok) {
        throw new Error(json.error || "Unknown error");
      }

      setSuccess(true);
      setEmail("");
      setMessage("");
    } catch (err: any) {
      setError(err.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="rounded-2xl border p-6 bg-green-50 dark:bg-green-950">
        <h2 className="text-xl font-semibold">
          {locale === "de"
            ? "Nachricht gesendet"
            : "Message sent"}
        </h2>
        <p className="mt-2 opacity-80">
          {locale === "de"
            ? "Vielen Dank! Wir haben deine Nachricht erhalten."
            : "Thank you! We have received your message."}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border p-6 space-y-4 max-w-xl"
    >
      <div>
        <label className="block text-sm font-medium mb-1">
          {locale === "de" ? "E-Mail-Adresse" : "Email address"}
        </label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border px-3 py-2 bg-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          {locale === "de" ? "Nachricht" : "Message"}
        </label>
        <textarea
          required
          minLength={10}
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full rounded-xl border px-3 py-2 bg-transparent"
        />
      </div>

      {error && (
        <div className="text-sm text-red-600 dark:text-red-400">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="rounded-xl bg-black text-white px-4 py-2 disabled:opacity-50 dark:bg-white dark:text-black"
      >
        {loading
          ? locale === "de"
            ? "Senden…"
            : "Sending…"
          : locale === "de"
          ? "Nachricht senden"
          : "Send message"}
      </button>
    </form>
  );
}
