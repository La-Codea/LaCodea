import { defineType, defineField } from "sanity";

export default defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  fields: [
    defineField({
      name: "app",
      title: "App",
      type: "reference",
      to: [{ type: "app" }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "question",
      title: "Question",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "answerText",
      title: "Answer",
      type: "text",
      validation: (r) => r.required(),
    }),
  ],
});
