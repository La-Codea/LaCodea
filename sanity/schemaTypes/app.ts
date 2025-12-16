import { defineField, defineType } from "sanity";

export default defineType({
  name: "app",
  title: "App",
  type: "document",
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
