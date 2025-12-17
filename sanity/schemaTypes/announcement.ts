// sanity/schemaTypes/announcement.ts
import { defineType, defineField } from "sanity";

const locales = [
  { title: "English", name: "en" },
  { title: "Deutsch", name: "de" },
  { title: "Français", name: "fr" },
];

export default defineType({
  name: "announcement",
  title: "Announcement",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "object",
      fields: locales.map((l) =>
        defineField({
          name: l.name,
          title: l.title,
          type: "string",
          validation: (r) => (l.name === "en" ? r.required() : r),
        })
      ),
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
      type: "object",
      description: "Write the announcement in all available languages.",
      fields: locales.map((l) =>
        defineField({
          name: l.name,
          title: l.title,
          type: "text",
        })
      ),
    }),
  ],
});