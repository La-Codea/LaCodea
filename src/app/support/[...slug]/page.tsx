import AppSupportPage from "../AppSupportPage";

export default async function SupportCatchAll({
  params,
}: {
  params: { slug?: string[] };
}) {
  const appSlug = (params?.slug?.[0] ?? "").trim();

  if (!appSlug) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-3xl font-bold">Support</h1>
        <p className="mt-2 opacity-80">
          ERROR: No app slug in route params. (Expected /support/&lt;app&gt;)
        </p>
      </div>
    );
  }

  return <AppSupportPage appSlug={appSlug} />;
}
