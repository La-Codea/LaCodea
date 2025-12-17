export const appsQuery = `
  *[_type == "app"] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    shortDescription,
    appStoreUrl
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
