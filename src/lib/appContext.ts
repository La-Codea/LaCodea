export function getAppSlugFromSearchParams(
  searchParams: { [key: string]: string | string[] | undefined } | undefined
): string | null {
  if (!searchParams) return null;
  const v = searchParams["__app"];
  if (!v) return null;
  return Array.isArray(v) ? v[0] : v;
}
