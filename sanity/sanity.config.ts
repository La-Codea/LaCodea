import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemaTypes";
import deskStructure from "./structure";

export default defineConfig({
  name: "default",
  title: "LaCodea CMS",

  projectId: "ziv4u25u",
  dataset: "production",

  plugins: [
    structureTool({
      structure: deskStructure,
    }),
  ],

  schema: {
    types: schemaTypes,
  },
});