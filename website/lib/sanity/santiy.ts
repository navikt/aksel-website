import { getClient, noCdnClient, sanityClient } from "./sanity.server";
import { akselDocumentsByType, akselTemaNames, dsDocuments } from "./queries";
import { DsArtikkel, DsComponentPage, KomponentArtikkel } from "..";
import imageUrlBuilder from "@sanity/image-url";

const imageBuilder = imageUrlBuilder(sanityClient);

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
  source: "aksel_artikkel" | "aksel_blogg" | "aksel_prinsipp" | "all",
  token?: string
): Promise<string[]> => {
  if (!source) return [];
  const client = token ? noCdnClient(token) : getClient(false);
  const documents: any[] | null = await client.fetch(akselDocumentsByType, {
    types:
      source === "all"
        ? `["aksel_artikkel", "aksel_blogg", "aksel_prinsipp"]`
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
  const client = token ? noCdnClient(token) : getClient(false);
  const documents: any[] | null = await client.fetch(dsDocuments);
  const paths = [];
  const componentPageTabs = ["design", "utvikling", "tilgjengelighet"];

  const tabs = {
    design: "design",
    utvikling: "development",
    tilgjengelighet: "accessibility",
  };

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
      case "ds_component_page":
        componentPageTabs.forEach((tab) => {
          page[tabs[tab]] && paths.push([...slug, tab]);
        });
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
  doc: DsComponentPage | DsArtikkel | KomponentArtikkel,
  slug: string[]
) => {
  if (!doc) return false;

  const tabs = {
    design: "design",
    utvikling: "development",
    tilgjengelighet: "accessibility",
  };

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
    case "ds_component_page":
      return isLvl2 && tabs[slug?.[2]] in doc && !!doc[tabs[slug[2]]];
    case "komponent_artikkel":
      return slug?.[2] === "kode";
    default:
      return false;
  }
};

export const getAkselTema = async (token?: string): Promise<string[]> => {
  const client = token ? noCdnClient(token) : getClient(false);
  const tags: string[] = await client.fetch(akselTemaNames);
  return tags.map(getTemaSlug);
};
