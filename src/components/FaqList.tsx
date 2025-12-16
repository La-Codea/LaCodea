type FAQ = {
  _id: string;
  question: string;
  answerText: string;
};

export default function FaqList({ faqs }: { faqs: FAQ[] }) {
  if (!faqs || faqs.length === 0) {
    return (
      <div className="rounded-2xl border p-5 opacity-80">
        No FAQ entries yet.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {faqs.map((f) => (
        <details key={f._id} className="rounded-2xl border p-5">
          <summary className="cursor-pointer font-semibold">
            {f.question}
          </summary>
          <p className="mt-3 opacity-80 whitespace-pre-wrap">
            {f.answerText}
          </p>
        </details>
      ))}
    </div>
  );
}
