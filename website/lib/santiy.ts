import { getClient, sanityClient } from "./sanity.server";
import { useNextSanityImage } from "next-sanity-image";
import { dsDocuments } from ".";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useSanityImage = (node) => useNextSanityImage(sanityClient, node);

export const getDsPaths = async (): Promise<string[][]> => {
  const documents: any[] | null = await getClient(false).fetch(dsDocuments);
  const paths = [];
  const componentPageTabs = ["design", "utvikling", "tilgjengelighet"];

  documents?.forEach((page) => {
    if (!page.slug) {
      return null;
    }
    const slug = page.slug.split("/");

    const defaultPush = () => paths.push(slug);

    switch (page._type) {
      case "ds_component_page":
        componentPageTabs.forEach((tab) => {
          paths.push([...slug, tab]);
        });
        defaultPush();
        break;
      case "ds_tabbed_article_page": {
        if (!page.tabs) break;
        const tabbedArticleTabs = page.tabs.map(
          (tab) => tab.title?.toLowerCase().replace(/\s+/g, "-") || "undefined"
        );
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
