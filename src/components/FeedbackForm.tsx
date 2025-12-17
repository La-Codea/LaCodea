"use client";

import type { Locale } from "@/lib/i18n/shared";
import { useState } from "react";

type Props = {
  locale?: Locale;
  app?: string | null;
};

const CATEGORIES = {
  en: [
    { value: "idea", label: "Idea" },
    { value: "bug", label: "Bug" },
    { value: "improvement", label: "Improvement" },
    { value: "positive", label: "Positive feedback" },
    { value: "other", label: "Other" },
  ],
  de: [
    { value: "idea", label: "Idee" },
    { value: "bug", label: "Bug" },
    { value: "improvement", label: "Verbesserung" },
    { value: "positive", label: "Positives Feedback" },
    { value: "other", label: "Sonstiges" },
  ],
};

export default function FeedbackForm({ locale = "en", app }: Props) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState("idea");
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
          type: "feedback",
          email,
          message,
          category,
          app,
          locale,
        }),
      });

      const json = await res.json();
      if (!json.ok) throw new Error(json.error || "Error");

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
          {locale === "de" ? "Feedback gesendet" : "Feedback sent"}
        </h2>
        <p className="mt-2 opacity-80">
          {locale === "de"
            ? "Vielen Dank für dein Feedback!"
            : "Thank you for your feedback!"}
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
          {locale === "de" ? "Kategorie" : "Category"}
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-xl border px-3 py-2 bg-transparent"
        >
          {CATEGORIES[locale].map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
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
        <div className="text-sm text-red-600 dark:text-red-400">{error}</div>
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
          ? "Feedback senden"
          : "Send feedback"}
      </button>
    </form>
  );
}
