import type { StructureResolver } from "sanity/structure";

const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      // ✅ ListItem + Child List (mit default ordering)
      S.documentTypeListItem("app")
        .title("Apps")
        .child(
          S.documentTypeList("app")
            .title("Apps")
            .defaultOrdering([
              { field: "sortOrder", direction: "asc" },
              { field: "name", direction: "asc" },
            ])
        ),

      S.divider(),

      // ✅ ebenfalls als ListItem
      S.documentTypeListItem("announcement").title("Announcements"),
    ]);

export default structure;