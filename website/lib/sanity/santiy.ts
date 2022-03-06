import { getClient, sanityClient } from "./sanity.server";
import { useNextSanityImage } from "next-sanity-image";
import { akselArtikkelDocuments, akselTemaNames, dsDocuments } from "./queries";
import { DsArtikkel, DsComponentPage, KomponentArtikkel } from "..";
import { getTemaSlug } from "../../components";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useSanityImage = (node) =>
  useNextSanityImage(sanityClient, node, {
    imageBuilder: (imageUrlBuilder, options) => {
      return imageUrlBuilder
        .width(Math.min(options.originalImageDimensions.width, 1600))
        .quality(100)
        .fit("clip")
        .auto("format");
    },
  });

export const useSanitybannerImage = (node) =>
  useNextSanityImage(sanityClient, node, {
    imageBuilder: (imageUrlBuilder, options) => {
      return imageUrlBuilder
        .width(Math.min(options.originalImageDimensions.width, 1152))
        .quality(100)
        .fit("fill")
        .auto("format");
    },
  });

export const getAkselArtikler = async (): Promise<string[]> => {
  const documents: any[] | null = await getClient(false).fetch(
    akselArtikkelDocuments
  );
  const paths = [];

  const nonDrafts = documents.filter((x) => !x._id.startsWith("drafts."));

  nonDrafts?.forEach((page) => {
    page.slug && paths.push(page.slug);
  });

  return paths;
};

export const getDsPaths = async (): Promise<string[][]> => {
  const documents: any[] | null = await getClient(false).fetch(dsDocuments);
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

  const isLvl2 = slug.length === 2;

  if (slug.length === 1) return true;
  switch (doc._type) {
    case "ds_artikkel":
      return (
        isLvl2 &&
        doc.innhold_tabs &&
        doc.innhold_tabs.find(
          (x) => x.title?.toLowerCase().replace(/\s+/g, "-") === slug[1]
        )
      );
    case "ds_component_page":
      return isLvl2 && tabs[slug?.[1]] in doc && !!doc[tabs[slug[1]]];
    case "komponent_artikkel":
      return slug?.[1] === "kode";
    default:
      return false;
  }
};

export const getAkselTema = async (): Promise<string[]> => {
  const tags: string[] = await getClient(false).fetch(akselTemaNames);
  return tags.map(getTemaSlug);
};
