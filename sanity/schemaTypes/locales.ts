// sanity/schemaTypes/locales.ts
export const LOCALES = [
  { title: "English", name: "en" },
  { title: "Deutsch", name: "de" },
  { title: "Français", name: "fr" },
  { title: "Español", name: "es" },
  { title: "Italiano", name: "it" },
  { title: "Русский", name: "ru" },
  { title: "Հայերեն", name: "hy" },
] as const;

export type LocaleName = (typeof LOCALES)[number]["name"];