import { defineField, defineType } from "sanity";
console.log("✅ LOADED app schema (with sortOrder)");
export default defineType({
  name: "app",
  title: "App",
  type: "document",

  // ✅ sorgt zuverlässig dafür, dass neue Dokumente einen Default bekommen
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

    // ✅ Sortierung früh anzeigen (damit du’s sofort findest)
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
        "Altes Feld (wird noch in bestehenden Dokumenten verwendet). Bitte künftig 'description' (EN/DE/FR) nutzen.",
      hidden: true,
    }),

    defineField({
      name: "description",
      title: "Short description",
      type: "object",
      fields: [
        defineField({ name: "en", title: "English", type: "string" }),
        defineField({ name: "de", title: "Deutsch", type: "string" }),
        defineField({ name: "fr", title: "Français", type: "string" }),
      ],
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