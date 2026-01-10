"use client";

import type { Locale } from "@/i18n";
import { useState } from "react";

type Props = {
  app?: string;
locale?: Locale;
  
  defaultApp?: string;
};

const PROBLEMS: Record<Locale, { value: string; label: string }[]> = {
  en: [
    { value: "crash", label: "App crashes" },
    { value: "bug", label: "Bug / unexpected behavior" },
    { value: "feature", label: "Feature request" },
    { value: "purchase", label: "Purchase / App Store issue" },
    { value: "privacy", label: "Privacy question" },
    { value: "other", label: "Other problem" },
  ],
  de: [
    { value: "crash", label: "App stürzt ab" },
    { value: "bug", label: "Bug / unerwartetes Verhalten" },
    { value: "feature", label: "Feature-Wunsch" },
    { value: "purchase", label: "Kauf / App-Store Problem" },
    { value: "privacy", label: "Datenschutz-Frage" },
    { value: "other", label: "Anderes Problem" },
  ],
  fr: [
    { value: "crash", label: "L’app plante" },
    { value: "bug", label: "Bug / comportement inattendu" },
    { value: "feature", label: "Demande de fonctionnalité" },
    { value: "purchase", label: "Achat / problème App Store" },
    { value: "privacy", label: "Question de confidentialité" },
    { value: "other", label: "Autre problème" },
  ],

  // Neue Sprachen (Fallback/Startwerte — kannst du später sauber übersetzen)
  es: [
    { value: "crash", label: "La app se cierra" },
    { value: "bug", label: "Error / comportamiento inesperado" },
    { value: "feature", label: "Solicitud de función" },
    { value: "purchase", label: "Compra / problema con App Store" },
    { value: "privacy", label: "Pregunta de privacidad" },
    { value: "other", label: "Otro problema" },
  ],
  it: [
    { value: "crash", label: "L’app si chiude" },
    { value: "bug", label: "Bug / comportamento inatteso" },
    { value: "feature", label: "Richiesta funzionalità" },
    { value: "purchase", label: "Acquisto / problema App Store" },
    { value: "privacy", label: "Domanda sulla privacy" },
    { value: "other", label: "Altro problema" },
  ],
  ru: [
    { value: "crash", label: "Приложение вылетает" },
    { value: "bug", label: "Ошибка / неожиданное поведение" },
    { value: "feature", label: "Запрос функции" },
    { value: "purchase", label: "Покупка / проблема App Store" },
    { value: "privacy", label: "Вопрос о приватности" },
    { value: "other", label: "Другая проблема" },
  ],
  hy: [
    { value: "crash", label: "Հավելվածը փակվում/խափանվում է" },
    { value: "bug", label: "Սխալ / անսպասելի վարք" },
    { value: "feature", label: "Ֆունկցիայի առաջարկ" },
    { value: "purchase", label: "Գնում / App Store-ի խնդիր" },
    { value: "privacy", label: "Գաղտնիության հարց" },
    { value: "other", label: "Այլ խնդիր" },
  ],
};

export default function SupportForm({ locale = "en", app }: Props) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [problemType, setProblemType] = useState("crash");
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
          type: "support",
          email,
          message,
          app,
          problemType,
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
          {locale === "de"
            ? "Support-Anfrage gesendet"
            : "Support request sent"}
        </h2>
        <p className="mt-2 opacity-80">
          {locale === "de"
            ? "Vielen Dank! Wir kümmern uns darum."
            : "Thank you! We’ll take care of it."}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border p-6 space-y-4 max-w-xl"
    >
      <div className="text-sm opacity-70">
        {locale === "de" ? "App:" : "App:"} <b>{app}</b>
      </div>

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
          {locale === "de" ? "Problemtyp" : "Problem type"}
        </label>
        <select
          value={problemType}
          onChange={(e) => setProblemType(e.target.value)}
          className="w-full rounded-xl border px-3 py-2 bg-transparent"
        >
          {(PROBLEMS[locale] ?? PROBLEMS.en).map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          {locale === "de" ? "Beschreibung" : "Description"}
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
          ? "Support senden"
          : "Send support request"}
      </button>
    </form>
  );
}
