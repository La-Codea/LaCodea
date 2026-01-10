// sanity/schemaTypes/app.ts
import { defineField, defineType } from "sanity";
import { LOCALES } from "./locales";

console.log("✅ LOADED app schema (with sortOrder)");

export default defineType({
  name: "app",
  title: "App",
  type: "document",

  initialValue: {
    sortOrder: 999,
  },

  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (r) => r.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug (Subdomain)",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (r) => r.required(),
    }),

    defineField({
      name: "sortOrder",
      title: "Sort order",
      type: "number",
      description: "Kleinere Zahl = weiter oben (z.B. 1,2,3,...)",
      validation: (r) => r.min(0).integer(),
    }),

    defineField({
      name: "shortDescription",
      title: "Short description (legacy)",
      type: "string",
      description:
        "Altes Feld (wird noch in bestehenden Dokumenten verwendet). Bitte künftig 'description' (EN/DE/FR/ES/IT/RU/HY) nutzen.",
      hidden: true,
    }),

    defineField({
      name: "description",
      title: "Short description",
      type: "object",
      fields: LOCALES.map((l) =>
        defineField({
          name: l.name,
          title: l.title,
          type: "string",
        })
      ),
    }),

    defineField({
      name: "appStoreUrl",
      title: "App Store URL",
      type: "url",
    }),

    defineField({
      name: "icon",
      title: "Icon",
      type: "image",
      options: { hotspot: true },
    }),
  ],
});