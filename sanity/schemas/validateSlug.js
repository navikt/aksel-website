import sanityClient from "part:@sanity/base/client";

const client = sanityClient.withConfig({ apiVersion: "2020-06-19" });

export const validateSlug = (Rule, prefix) => {
  return Rule.required().custom((slug) => {
    return client.fetch(`count(*[slug.current == "${slug.current}"])`).then((count) => {
      if (count > 1) {
        return "Slug må være unik";
      }
      if (prefix && !slug.current.startsWith(prefix)) {
        return `Slug må started med prefiks "${prefix}"`;
      }
      return true;
    });
  });
};
