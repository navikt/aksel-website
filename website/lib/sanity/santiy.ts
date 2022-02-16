import { getClient, sanityClient } from "./sanity.server";
import { useNextSanityImage } from "next-sanity-image";
import { dsDocuments, gpDocuments } from "./queries";

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

export const getGpPaths = async (): Promise<string[][]> => {
  const documents: any[] | null = await getClient(false).fetch(gpDocuments);

  const paths = [];

  documents?.forEach((page) => {
    page.slug && paths.push(page.slug.split("/"));
  });

  return paths;
};

export const getDsPaths = async (): Promise<string[][]> => {
  const documents: any[] | null = await getClient(true).fetch(dsDocuments);
  const paths = [];
  const componentPageTabs = ["design", "utvikling", "tilgjengelighet"];

  const tabs = {
    design: "design",
    utvikling: "development",
    tilgjengelighet: "accessibility",
  };

  documents?.forEach((page) => {
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
      case "ds_article_page": {
        if (!page?.article_type) {
          defaultPush();
          break;
        }
        if (!page.tabs) break;
        const tabbedArticleTabs = page.tabs
          .map((tab) => {
            return tab.body && tab.title
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
