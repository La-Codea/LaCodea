// sanity/schemaTypes/faq.ts
import { defineType, defineField } from "sanity";
import { LOCALES } from "./locales";

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
      fields: LOCALES.map((l) =>
        defineField({
          name: l.name,
          title: l.title,
          type: "string",
        })
      ),
      validation: (r) => r.required(),
    }),

    defineField({
      name: "answerText",
      title: "Answer",
      type: "object",
      fields: LOCALES.map((l) =>
        defineField({
          name: l.name,
          title: l.title,
          type: "text",
        })
      ),
      validation: (r) => r.required(),
    }),
  ],

  preview: {
    select: {
      appName: "app.name",
      qDe: "question.de",
      qEn: "question.en",
      qFr: "question.fr",
      qEs: "question.es",
      qIt: "question.it",
      qRu: "question.ru",
      qHy: "question.hy",
    },
    prepare({ appName, qDe, qEn, qFr, qEs, qIt, qRu, qHy }) {
      const title = qDe || qEn || qFr || qEs || qIt || qRu || qHy || "FAQ";
      return {
        title,
        subtitle: appName ? `App: ${appName}` : "No app selected",
      };
    },
  },
});