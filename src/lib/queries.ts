// src/lib/queries.ts
export const appsQuery = `
  *[_type == "app"] | order(sortOrder asc, name asc) {
    _id,
    name,
    "slug": slug.current,
    sortOrder,
    description,
    shortDescription,
    appStoreUrl,
    icon
  }
`;

export const announcementsQuery = `
  *[_type == "announcement"] | order(publishedAt desc) {
    _id,
    title,
    body,
    publishedAt,
    category {
      type,
      app->{
        name,
        "slug": slug.current
      }
    }
  }
`;

export const announcementsForAppQuery = `
  *[_type == "announcement" && category.type == "app" && category.app->slug.current == $appSlug]
  | order(publishedAt desc) {
    _id,
    title,
    body,
    publishedAt,
    category {
      type,
      app->{
        name,
        "slug": slug.current
      }
    }
  }
`;

export const faqsForAppQuery = `
  *[_type == "faq" && app->slug.current == $appSlug] | order(question asc) {
    _id,
    question,
    answerText
  }
`;
