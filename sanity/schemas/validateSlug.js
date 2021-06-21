import sanityClient from "part:@sanity/base/client";

const client = sanityClient.withConfig({ apiVersion: "2020-06-19" });

export const validateSlug = (Rule, prefix, nesting) =>
  Rule.required().custom((slug) => {
    if (!slug.current.startsWith(prefix)) {
      return `Slug må starte med prefiks: ${prefix}`;
    }
    if ((slug.current.match(/\//g) || []).length > nesting - 1) {
      return `Siden kan bare være på ${nesting} nivå`;
    }
    return true;
  });

export const isSlugUnique = (slug, options) => {
  const { document } = options;

  const id = document._id.replace(/^drafts\./, "");
  const params = {
    draft: `drafts.${id}`,
    published: id,
    slug,
  };

  const query = `!defined(*[!(_id in [$draft, $published]) && slug.current == $slug][0]._id)`;
  return client.fetch(query, params);
};
