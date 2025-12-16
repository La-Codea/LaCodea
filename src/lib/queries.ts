export const appsQuery = `
  *[_type == "app"] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    shortDescription,
    appStoreUrl
  }
`;

export const noticesQuery = `
  *[_type == "notice"] | order(publishedAt desc) {
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

export const noticesForAppQuery = `
  *[_type == "notice" && category.type == "app" && category.app->slug.current == $appSlug]
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
