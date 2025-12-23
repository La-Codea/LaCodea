// sanity/structure.ts
export default function structure(S: any) {
  return S.list()
    .title("Content")
    .items([
      S.documentTypeList("app")
        .title("Apps")
        .defaultOrdering([
          { field: "sortOrder", direction: "asc" },
          { field: "name", direction: "asc" },
        ]),

      S.divider(),

      S.documentTypeList("announcement").title("Announcements"),
    ]);
}