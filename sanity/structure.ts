export default (S: any) =>
  S.list()
    .title("Content")
    .items([
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

      S.documentTypeListItem("faq")
      .title("FAQs")
      .child(
        S.documentTypeList("faq")
          .title("FAQs")
          .defaultOrdering([
            { field: "sortOrder", direction: "asc" },
            { field: "question.de", direction: "asc" },
            { field: "question.en", direction: "asc" },
          ])
      ),

      S.divider(),

      S.documentTypeListItem("announcement").title("Announcements"),
    ]);