import { defineType, defineField } from "sanity";

export default defineType({
  name: "faq",
  title: "FAQ",
  type: "document",

  initialValue: {
    sortOrder: 999,
  },

  fields: [
    defineField({
      name: "app",
      title: "App",
      type: "reference",
      to: [{ type: "app" }],
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
      name: "question",
      title: "Question",
      type: "object",
      fields: [
        defineField({ name: "en", title: "English", type: "string" }),
        defineField({ name: "de", title: "Deutsch", type: "string" }),
        defineField({ name: "fr", title: "Français", type: "string" }),
      ],
      validation: (r) => r.required(),
    }),

    defineField({
      name: "answerText",
      title: "Answer",
      type: "object",
      fields: [
        defineField({ name: "en", title: "English", type: "text" }),
        defineField({ name: "de", title: "Deutsch", type: "text" }),
        defineField({ name: "fr", title: "Français", type: "text" }),
      ],
      validation: (r) => r.required(),
    }),
  ],

  preview: {
    select: {
      appName: "app.name",
      qEn: "question.en",
      qDe: "question.de",
      qFr: "question.fr",
    },
    prepare({ appName, qEn, qDe, qFr }) {
      const title = qDe || qEn || qFr || "FAQ";
      return {
        title,
        subtitle: appName ? `App: ${appName}` : "No app selected",
      };
    },
  },
});