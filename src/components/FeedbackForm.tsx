"use client";

import type { Locale } from "@/i18n";
import { useMemo, useState } from "react";

type Props = {
  locale?: Locale;
  app?: string | null;
  defaultApp?: string;
};

// Nur en/de gepflegt? Dann sauber auf en fallbacken.
const CATEGORIES: Record<"en" | "de", { value: string; label: string }[]> = {
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

type I18nLabel = Partial<Record<Locale, string>>;

const APP_OPTIONS: { value: string; label: I18nLabel }[] = [
  {
    value: "lacodea",
    label: { en: "LaCodea", de: "LaCodea", fr: "LaCodea", es: "LaCodea", it: "LaCodea", ru: "LaCodea", hy: "LaCodea" },
  },
  {
    value: "simpletime",
    label: { en: "SimpleTime", de: "SimpleTime", fr: "SimpleTime", es: "SimpleTime", it: "SimpleTime", ru: "SimpleTime", hy: "SimpleTime" },
  },
];

function pickLabel(label: I18nLabel, locale: Locale) {
  return (
    label[locale] ||
    label.en ||
    label.de ||
    label.fr ||
    label.es ||
    label.it ||
    label.ru ||
    label.hy ||
    ""
  );
}

export default function FeedbackForm({ locale = "en", app, defaultApp }: Props) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState("idea");

  const [selectedApp, setSelectedApp] = useState<string>(
    (app ?? defaultApp ?? "lacodea") || "lacodea"
  );

  const effectiveApp = app ?? selectedApp;

  // Kategorien: für alles außer de -> en
  const catLocale: "en" | "de" = locale === "de" ? "de" : "en";

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const ui = useMemo(() => {
    // Minimale UI-Texte mit Fallback (du kannst das später in i18n keys umziehen)
    const isDe = locale === "de";
    const isFr = locale === "fr";
    const isEs = locale === "es";
    const isIt = locale === "it";
    const isRu = locale === "ru";
    const isHy = locale === "hy";

    const AppLabel =
      isDe ? "App" :
      isFr ? "App" :
      isEs ? "App" :
      isIt ? "App" :
      isRu ? "Приложение" :
      isHy ? "Հավելված" :
      "App";

    const AppHint =
      isDe ? "Wähle die App aus, zu der du Feedback geben möchtest." :
      isFr ? "Choisis l’app pour laquelle tu veux donner un avis." :
      isEs ? "Elige la app para la que quieres enviar feedback." :
      isIt ? "Scegli l’app per cui vuoi inviare un feedback." :
      isRu ? "Выберите приложение, по которому вы хотите оставить отзыв." :
      isHy ? "Ընտրեք հավելվածը, որի վերաբերյալ ցանկանում եք արձագանքել։" :
      "Choose the app you want to give feedback for.";

    const EmailLabel =
      isDe ? "E-Mail-Adresse" :
      isFr ? "Adresse e-mail" :
      isEs ? "Correo electrónico" :
      isIt ? "Indirizzo email" :
      isRu ? "Email" :
      isHy ? "Էլ․ փոստ" :
      "Email address";

    const CategoryLabel =
      isDe ? "Kategorie" :
      isFr ? "Catégorie" :
      isEs ? "Categoría" :
      isIt ? "Categoria" :
      isRu ? "Категория" :
      isHy ? "Կատեգորիա" :
      "Category";

    const MessageLabel =
      isDe ? "Nachricht" :
      isFr ? "Message" :
      isEs ? "Mensaje" :
      isIt ? "Messaggio" :
      isRu ? "Сообщение" :
      isHy ? "Հաղորդագրություն" :
      "Message";

    const SentTitle =
      isDe ? "Feedback gesendet" :
      isFr ? "Avis envoyé" :
      isEs ? "Feedback enviado" :
      isIt ? "Feedback inviato" :
      isRu ? "Отзыв отправлен" :
      isHy ? "Արձագանքը ուղարկված է" :
      "Feedback sent";

    const SentBody =
      isDe ? "Vielen Dank für dein Feedback!" :
      isFr ? "Merci pour votre retour !" :
      isEs ? "¡Gracias por tu feedback!" :
      isIt ? "Grazie per il tuo feedback!" :
      isRu ? "Спасибо за ваш отзыв!" :
      isHy ? "Շնորհակալություն արձագանքի համար։" :
      "Thank you for your feedback!";

    const Sending =
      isDe ? "Senden…" :
      isFr ? "Envoi…" :
      isEs ? "Enviando…" :
      isIt ? "Invio…" :
      isRu ? "Отправка…" :
      isHy ? "Ուղարկվում է…" :
      "Sending…";

    const Send =
      isDe ? "Feedback senden" :
      isFr ? "Envoyer" :
      isEs ? "Enviar feedback" :
      isIt ? "Invia feedback" :
      isRu ? "Отправить отзыв" :
      isHy ? "Ուղարկել արձագանք" :
      "Send feedback";

    return {
      AppLabel,
      AppHint,
      EmailLabel,
      CategoryLabel,
      MessageLabel,
      SentTitle,
      SentBody,
      Sending,
      Send,
    };
  }, [locale]);

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
          app: effectiveApp,
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
        <h2 className="text-xl font-semibold">{ui.SentTitle}</h2>
        <p className="mt-2 opacity-80">{ui.SentBody}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border p-6 space-y-4 max-w-xl"
    >
      {!app && (
        <div>
          <label className="block text-sm font-medium mb-1">{ui.AppLabel}</label>
          <select
            value={selectedApp}
            onChange={(e) => setSelectedApp(e.target.value)}
            className="w-full rounded-xl border px-3 py-2 bg-transparent"
          >
            {APP_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {pickLabel(opt.label, locale)}
              </option>
            ))}
          </select>
          <p className="mt-2 text-xs opacity-70">{ui.AppHint}</p>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-1">{ui.EmailLabel}</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border px-3 py-2 bg-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">{ui.CategoryLabel}</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-xl border px-3 py-2 bg-transparent"
        >
          {CATEGORIES[catLocale].map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">{ui.MessageLabel}</label>
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
        {loading ? ui.Sending : ui.Send}
      </button>
    </form>
  );
}