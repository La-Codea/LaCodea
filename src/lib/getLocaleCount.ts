import { readdir } from "node:fs/promises";
import path from "node:path";

export async function getLocaleCount(): Promise<number> {
  const dir = path.join(process.cwd(), "src", "i18n", "messages");
  const files = await readdir(dir);
  // zählt z.B. en.ts, de.ts, fr.ts
  return files.filter((f) => /^[a-z]{2}\.ts$/i.test(f)).length;
}
