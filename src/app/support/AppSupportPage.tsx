import SupportForm from "@/components/SupportForm";
import { sanityClient } from "@/lib/sanity";
import { faqsForAppQuery } from "@/lib/queries";

type FAQ = {
  _id: string;
  question: string;
  answerText?: string;
};

export default async function AppSupportPage({ appSlug }: { appSlug: string }) {
  const slug = String(appSlug ?? "").trim();

  if (!slug) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-3xl font-bold">Support</h1>
        <p className="mt-2 opacity-80">ERROR: appSlug prop is empty.</p>
      </div>
    );
  }

  const faqs: FAQ[] = await sanityClient.fetch(faqsForAppQuery, { appSlug: slug });

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold">Support</h1>
      <p className="mt-2 opacity-80">Support for: <b>{slug}</b></p>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">FAQ</h2>
        <div className="mt-4 space-y-4">
          {faqs.map((f) => (
            <details key={f._id} className="rounded-2xl border p-4">
              <summary className="cursor-pointer font-medium">{f.question}</summary>
              {f.answerText && <p className="mt-2 opacity-80 whitespace-pre-wrap">{f.answerText}</p>}
            </details>
          ))}

          {faqs.length === 0 && (
            <p className="opacity-70">
              No FAQ entries yet. (Add them in Sanity Studio under <b>FAQ</b>.)
            </p>
          )}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold">Contact support</h2>
        <div className="mt-6">
          <SupportForm defaultApp={slug} />
        </div>
      </section>
    </div>
  );
}
