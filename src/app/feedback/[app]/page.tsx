import FeedbackForm from "@/components/FeedbackForm";

export default function FeedbackForApp({ params }: { params: { app: string } }) {
  const app = params.app === "general" ? undefined : params.app;
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold">Feedback</h1>
      <p className="mt-2 opacity-80">
        {app ? `Feedback for ${app}.` : "General feedback for LaCodea."}
      </p>

      <div className="mt-8">
        <FeedbackForm defaultApp={app} />
      </div>
    </div>
  );
}
