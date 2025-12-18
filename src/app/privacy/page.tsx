import { resolveSite } from "@/site/resolve";
import { getRequestLocale } from "@/lib/locale";

import HubPrivacyIndex from "@/sites/hub/pages/privacyIndex";
import SimpleTimePrivacy from "@/sites/simpletime/pages/privacy";

export default async function Page() {
  const site = await resolveSite();

  // SimpleTime Subdomain => direkt SimpleTime Privacy
  if (site.key === "simpletime") return <SimpleTimePrivacy />;

  // Hub => Auswahlseite (braucht locale)
  const locale = await getRequestLocale();
  return <HubPrivacyIndex locale={locale} />;
}