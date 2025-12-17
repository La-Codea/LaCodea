import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_TOKEN!,
  useCdn: false,
});

async function run() {
  const docs = await client.fetch(`*[_type=="notice"]{
    _id, _rev, title, body, publishedAt, category
  }`);

  console.log("Found", docs.length, "notice docs");

  let tx = client.transaction();

  for (const d of docs) {
    const newId = d._id.replace(/^notice\./, "announcement."); // optional
    tx = tx.createOrReplace({
      _id: newId,
      _type: "announcement",
      title: { en: d.title, de: d.title, fr: d.title },
      body: { en: d.body, de: d.body, fr: d.body },
      publishedAt: d.publishedAt,
      category: d.category,
    });
  }

  await tx.commit();
  console.log("✅ Migration done");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});