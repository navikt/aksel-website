import { getClient, noCdnClient, sanityClient } from "./sanity.server";
import { akselDocumentsByType, akselTemaNames, dsDocuments } from "./queries";
import { DsArtikkel, KomponentArtikkel } from "..";
import imageUrlBuilder from "@sanity/image-url";
import {
  createCurrentUserHook,
  createPreviewSubscriptionHook,
} from "next-sanity";
import { config } from "./config";

const imageBuilder = imageUrlBuilder(sanityClient);

export const usePreviewSubscription = createPreviewSubscriptionHook(config);

export const useCurrentUser = createCurrentUserHook(config);

export function urlFor(source: any) {
  return imageBuilder.image(source);
}

export const getTemaSlug = (s: string) =>
  s ? s.toLowerCase().trim().replace(/\s+/g, "-") : null;

export const getAllPages = async (token?: string) => {
  const pages = await getDsPaths(token).then((paths) =>
    paths.map((slugs) => slugs.join("/"))
  );

  const artikler = await getAkselDocuments("all", token);
  const temaer = await getAkselTema(token);

  return [
    "",
    "designsystem",
    "tema",
    "blogg",
    ...pages,
    ...artikler,
    ...temaer.map((x) => `tema/${x}`),
  ];
};

export const getAkselDocuments = async (
  source:
    | "aksel_artikkel"
    | "aksel_blogg"
    | "aksel_prinsipp"
    | "aksel_standalone"
    | "all",
  token?: string
): Promise<string[]> => {
  if (!source) return [];
  const client = token ? noCdnClient(token) : getClient();
  const documents: any[] | null = await client.fetch(akselDocumentsByType, {
    types:
      source === "all"
        ? `["aksel_artikkel", "aksel_blogg", "aksel_prinsipp", "aksel_standalone"]`
        : `["${source}"]`,
  });
  const paths = [];

  const nonDrafts = documents.filter((x) => !x._id.startsWith("drafts."));

  nonDrafts?.forEach((page) => {
    page.slug && paths.push(page.slug);
  });

  return paths;
};

export const getDsPaths = async (token?: string): Promise<string[][]> => {
  const client = token ? noCdnClient(token) : getClient();
  const documents: any[] | null = await client.fetch(dsDocuments);
  const paths = [];

  const nonDrafts = documents.filter((x) => !x._id.startsWith("drafts."));

  nonDrafts?.forEach((page) => {
    if (!page.slug) {
      return null;
    }
    const slug = page.slug.split("/");

    const defaultPush = () => paths.push(slug);

    switch (page._type) {
      case "komponent_artikkel":
        paths.push([...slug, "kode"]);
        defaultPush();
        break;
      case "ds_artikkel": {
        if (!page?.artikkel_type) {
          defaultPush();
          break;
        }
        if (!page.innhold_tabs) break;
        const tabbedArticleTabs = page.innhold_tabs
          .map((tab) => {
            return tab.innhold && tab.title
              ? tab.title?.toLowerCase().replace(/\s+/g, "-")
              : null;
          })
          .filter((x) => !!x);
        tabbedArticleTabs.forEach((tab) => {
          paths.push([...slug, tab]);
        });
        defaultPush();
        break;
      }
      default:
        defaultPush();
        break;
    }
  });
  return paths;
};

export const validateDsPath = (
  doc: DsArtikkel | KomponentArtikkel,
  slug: string[]
) => {
  if (!doc) return false;

  /* Check for nested pages, ex button/kode */
  const isLvl2 = slug.length === 3;

  if (slug.length === 2) return true;
  switch (doc._type) {
    case "ds_artikkel":
      return (
        isLvl2 &&
        doc.innhold_tabs &&
        doc.innhold_tabs.find(
          (x) => x.title?.toLowerCase().replace(/\s+/g, "-") === slug[2]
        )
      );
    case "komponent_artikkel":
      return slug?.[2] === "kode";
    default:
      return false;
  }
};

export const getAkselTema = async (token?: string): Promise<string[]> => {
  const client = token ? noCdnClient(token) : getClient();
  const tags: string[] = await client.fetch(akselTemaNames);
  return tags.map(getTemaSlug);
};
