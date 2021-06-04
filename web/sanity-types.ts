import client from "./client";

export interface SanityDsPage {
  title: string;
  slug: string;
}

export const dsPageSpec = `
{
    "id": _id,
    "title": title,
    "slug": slug.current,
}`;

export const fetchAllDsSlugs = async (): Promise<[{ slug: string }]> => {
  return client.fetch(`*[_type == "designsystem"]{ 'slug': slug.current }`);
};

export const fetchDsPage = async (slug = []): Promise<SanityDsPage> => {
  const query = `*[_type == "designsystem" && slug.current == $slug][0]
    ${dsPageSpec}`;
  const params = { slug: slug };
  return client.fetch(query, params);
};
