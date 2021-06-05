import client from "./client";

/* export type SanityDocumentType =
  | "article"
  | "articleGroup"
  | "linkPanel"
  | "articlePanel"
  | "externalLink"
  | "frontpage";
 */

export interface SanityFrontpagePanels {
  title: string;
  content: string;
  iconname: string;
  url: string;
}

export interface PageProps {
  title: string;
  ingress?: string;
  slug: string;
  body?: any;
}

export interface SanityDsPage extends PageProps {
  ingress: string;
  body: any;
}

export const dsPageSpec = `
{
    "id": _id,
    "title": title,
    "slug": slug.current,
    "body": body
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

export const fetchFrontpagePanels = async (): Promise<SanityFrontpagePanels[]> => {
  const query = `*[_type == "frontpagepanels"]
  {
      "id": _id,
      title,
      content,
      iconname,
      url,
  }`;
  return client.fetch(query);
};
