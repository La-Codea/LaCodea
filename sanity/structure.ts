// sanity/structure.ts
import type { StructureResolver } from "sanity/structure";

const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      // ✅ ListItem (ok) + child list (ok)
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

      S.documentTypeListItem("announcement")
        .title("Announcements")
        .child(
          S.documentTypeList("announcement")
            .title("Announcements")
            .defaultOrdering([{ field: "publishedAt", direction: "desc" }])
        ),
    ]);

export default structure;