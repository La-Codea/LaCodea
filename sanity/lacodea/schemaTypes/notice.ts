import { defineType, defineField } from "sanity";

export default defineType({
  name: "notice",
  title: "Notice",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "object",
      fields: [
        defineField({
          name: "type",
          title: "Type",
          type: "string",
          options: { list: ["general", "app"] },
          validation: (r) => r.required(),
        }),
        defineField({
          name: "app",
          title: "App",
          type: "reference",
          to: [{ type: "app" }],
          hidden: ({ parent }) => parent?.type !== "app",
        }),
      ],
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "text",
      description: "Short text for the notice (we can upgrade to rich text later).",
    }),
  ],
});
