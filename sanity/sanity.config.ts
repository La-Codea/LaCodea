import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemaTypes";

export default defineConfig({
  name: "default",
  title: "LaCodea CMS",

  projectId: "ziv4u25u",
  dataset: "production",

  plugins: [structureTool()],

  schema: {
    types: schemaTypes,
  },
});
