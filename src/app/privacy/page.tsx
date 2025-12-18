import { resolveSite } from "@/site/resolve";

import HubPrivacyIndex from "@/sites/hub/pages/privacyIndex";
import SimpleTimePrivacy from "@/sites/simpletime/pages/privacy";

export default async function Page() {
  const site = await resolveSite();

  // SimpleTime Subdomain => direkt SimpleTime Privacy (ohne Auswahl + ohne Layout-Header)
  if (site.key === "simpletime") return <SimpleTimePrivacy />;

  // Hub => Auswahlseite
  return <HubPrivacyIndex />;
}