import { sanityClient } from "@/lib/sanity";
import { noticesQuery } from "@/lib/queries";

type Notice = {
  _id: string;
  title: string;
  body?: string;
  publishedAt?: string;
  category?: {
    type: "general" | "app";
    app?: { slug: { current: string }; name: string };
  };
};

function formatDate(iso?: string) {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  } catch {
    return "";
  }
}

export default async function NoticeList({ appSlug }: { appSlug?: string }) {
  const notices: Notice[] = await sanityClient.fetch(noticesQuery, {
    appSlug: appSlug ?? null,
  });

  return (
    <div className="grid gap-4">
      {notices.map((n) => (
        <article key={n._id} className="card p-6">
          <div className="muted text-sm flex flex-wrap items-center gap-2">
            {n.publishedAt ? <span>{formatDate(n.publishedAt)}</span> : null}

            {n.category?.type === "app" && n.category.app ? (
              <>
                <span>•</span>
                <span>{n.category.app.name}</span>
              </>
            ) : null}

            {n.category?.type === "general" ? (
              <>
                <span>•</span>
                <span>General</span>
              </>
            ) : null}
          </div>

          <h2 className="mt-2 text-xl font-semibold">{n.title}</h2>
          {n.body ? <p className="mt-2 opacity-80 whitespace-pre-wrap">{n.body}</p> : null}
        </article>
      ))}

      {notices.length === 0 ? (
        <p className="muted">No notices yet.</p>
      ) : null}
    </div>
  );
}
