import { defineType, defineField } from "sanity";

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
      title: "Slug",
      type: "slug",
      options: { source: "name" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "string",
    }),
    defineField({
      name: "appStoreUrl",
      title: "App Store URL",
      type: "url",
    }),
    defineField({
      name: "privacyText",
      title: "App Privacy Text",
      type: "text",
      description: "App-specific privacy text shown on the app subdomain.",
    }),
  ],
});
