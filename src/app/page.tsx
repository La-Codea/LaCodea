// src/app/page.tsx
import { resolveSite } from "@/site/resolve";

import HubHomeImport from "@/sites/hub/pages/home";
import SimpleTimeHomeImport from "@/sites/simpletime/pages/home";

const HubHome = (HubHomeImport as any)?.default ?? HubHomeImport;
const SimpleTimeHome = (SimpleTimeHomeImport as any)?.default ?? SimpleTimeHomeImport;

export default async function Page() {
  const site = await resolveSite();
  return site.key === "simpletime" ? <SimpleTimeHome /> : <HubHome />;
}