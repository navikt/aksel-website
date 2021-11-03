// lib/sanity.js
/* https://github.com/sanity-io/next-sanity#live-real-time-preview */
import {
  createPortableTextComponent,
  createPreviewSubscriptionHook,
  createCurrentUserHook,
} from "next-sanity";
import { config } from "./config";
import { getClient, sanityClient } from "./sanity.server";
import { useNextSanityImage } from "next-sanity-image";
import { dsDocuments } from ".";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useSanityImage = (node) => useNextSanityImage(sanityClient, node);

// Set up the live preview subscription hook
export const usePreviewSubscription = createPreviewSubscriptionHook(config);

// Set up Portable Text serialization
export const PortableText = createPortableTextComponent({
  ...config,
  // Serializers passed to @sanity/block-content-to-react
  // (https://github.com/sanity-io/block-content-to-react)
  serializers: {},
});

// Helper function for using the current logged in user account
export const useCurrentUser = createCurrentUserHook(config);

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
