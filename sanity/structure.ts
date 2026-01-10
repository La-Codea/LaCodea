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
              { field: "question.fr", direction: "asc" },
              { field: "question.es", direction: "asc" },
              { field: "question.it", direction: "asc" },
              { field: "question.ru", direction: "asc" },
              { field: "question.hy", direction: "asc" },
            ])
        ),

      S.divider(),

      S.documentTypeListItem("announcement").title("Announcements"),
    ]);