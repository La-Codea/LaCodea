import { sanityClient } from "@/lib/sanityClient";

const APP_COUNT_QUERY = `count(*[_type == "app"])`;

export async function getAppCount(): Promise<number> {
  const count = await sanityClient.fetch<number>(APP_COUNT_QUERY);
  return Number(count ?? 0);
}
