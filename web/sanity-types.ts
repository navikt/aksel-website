import { defaultClient, previewClient } from "./client";

/* export type SanityDocumentType =
  | "article"
  | "articleGroup"
  | "linkPanel"
  | "articlePanel"
  | "externalLink"
  | "frontpage";
 */

export interface SanityFrontpage {
  title: string;
  headline: string;
  panels: SanityFrontpagePanels[];
}

export interface SanityFrontpagePanels {
  title: string;
  content: string;
  pageref: any;
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
  return defaultClient.fetch(`*[_type == "designsystempage"]{ 'slug': slug.current }`);
};

export const fetchDsPage = async (slug = []): Promise<SanityDsPage> => {
  const query = `*[_type == "designsystempage" && slug.current == $slug][0]
    ${dsPageSpec}`;
  const params = { slug: slug };
  return defaultClient.fetch(query, params);
};

export const fetchFrontpage = async (): Promise<SanityFrontpage> => {
  const query = `*[_type == "frontpage"]
  {
      "id": _id,
      title,
      headline,
      panels[]{
        title,
        content,
        "slug": pagereference->slug.current
      }
  }`;
  return defaultClient.fetch(query);
};

export const fetchDsFrontpage = async (): Promise<SanityFrontpage> => {
  const query = `*[_type == "designsystem-frontpage"]
  {
      "id": _id,
      title,
      headline,
      panels[]{
        title,
        content,
        "slug": pagereference->slug.current
      }
  }`;
  return defaultClient.fetch(query);
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
  return defaultClient.fetch(query);
};
