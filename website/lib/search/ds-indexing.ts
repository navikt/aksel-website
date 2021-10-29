import { feedbackClient } from "..";
import {
  DsArticlePage,
  DsComponentPage,
  DsTabbedArticlePage,
} from "../autogen-types";
import { flattenBlocks } from "sanity-algolia";

const dsIndexingQuery = `*[_type == 'ds_navigation'][0] {
  headings[]{
    title,
    menu[]{
      ...link->{...},
    }
  }
}`;

const token = process.env.SANITY_WRITE_KEY;

const getDesignsystemRecords = async () => {
  const sanity = feedbackClient(token);
  const nav = await sanity.fetch(dsIndexingQuery);

  const records: Record<string, any>[] = [];

  if (!nav.headings) return [];

  nav.headings.forEach((head) => {
    const category: string = head.title;
    const menu: (DsComponentPage | DsArticlePage | DsTabbedArticlePage)[] =
      head.menu;

    menu.forEach((page) => {
      switch (page._type) {
        case "ds_article_page":
          records.push({
            objectID: `${page._id}`,
            category,
            title: page.heading,
            page: "artikkel",
            path: page.slug.current,
            content: `${page.ingress ?? ""} ${flattenBlocks(page.body)}`,
          });
          break;
        case "ds_tabbed_article_page":
          records.push(...tabbedRecords(page, category));
          break;
        case "ds_component_page":
          records.push(...componentRecords(page, category));
          break;
        default:
          break;
      }
    });
  });

  return records;
};

export default getDesignsystemRecords;

const tabbedRecords = (page: DsTabbedArticlePage, category: string) => {
  const records: Record<string, any>[] = [];
  const title = page.heading;
  const path = page.slug.current;
  const id = page._id;

  page.tabs.forEach((tab, x) => {
    records.push({
      objectID: `${id}_${tab.title}`,
      category,
      title,
      page: tab.title,
      path: `${path}/${tab.title?.toLowerCase().replace(/\s+/g, "-")}`,
      content:
        x === 0
          ? `${page.ingress ?? ""} ${flattenBlocks(tab.body)}`
          : flattenBlocks(tab.body),
    });
  });

  return records;
};

const componentRecords = (page: DsComponentPage, category: string) => {
  const records: Record<string, any>[] = [];

  const title = page.heading;
  const path = page.slug.current;
  const id = page._id;

  page.usage &&
    records.push({
      objectID: `${id}_bruk`,
      category,
      title,
      page: "bruk",
      path,
      content: `${page.ingress ?? ""} ${flattenBlocks(page.usage)}`,
    });
  page.design &&
    records.push({
      objectID: `${id}_design`,
      category,
      title,
      page: "design",
      path: `${path}/design`,
      content: flattenBlocks(page.design),
    });
  page.development &&
    records.push({
      objectID: `${id}_utvikling`,
      category,
      title,
      page: "utvikling",
      path: `${path}/utvikling`,
      content: flattenBlocks(page.development),
    });
  page.accessibility &&
    records.push({
      objectID: `${id}_tilgjengelighet`,
      category,
      title,
      page: "tilgjengelighet",
      path: `${path}/tilgjengelighet`,
      content: flattenBlocks(page.accessibility),
    });
  !!page.development?.find((x) => x._type === "prop_table") &&
    records.push({
      objectID: `${id}_props`,
      category,
      title,
      page: "props",
      path: `${path}/utvikling`,
      content: "proptable, api, props, types",
    });

  return records;
};
