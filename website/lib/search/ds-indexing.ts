import {
  DsArticlePage,
  DsComponentPage,
  DsTabbedArticlePage,
  noCdnClient,
} from "..";
import { flattenBlocks } from "sanity-algolia";

/* Tmp siden ingress string -> block in sanity */
const verifyIngress = (ingress) => ingress && typeof ingress !== "string";

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
  const sanity = noCdnClient(token);
  const nav = await sanity.fetch(dsIndexingQuery);

  const records: Record<string, any>[] = [];

  if (!nav.headings) return [];

  nav.headings.forEach((head) => {
    const category: string = head.title;
    const menu: (DsComponentPage | DsArticlePage | DsTabbedArticlePage)[] =
      head.menu;

    if (!menu) {
      return;
    }

    menu
      .filter((x) => Object.keys(x).length > 0)
      .forEach((page) => {
        switch (page._type) {
          case "ds_article_page":
            records.push({
              objectID: `${page._id}`,
              category,
              title: page.heading,
              page: "artikkel",
              tags: page?.metadata_search?.tags ?? [],
              high_priority: !!page?.metadata_search?.high_priority,
              path: page.slug.current,
              content: `${
                (verifyIngress(page?.ingress) && flattenBlocks(page.ingress)) ??
                ""
              } ${flattenBlocks(page.body)}`,
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
      tags: tab?.metadata_search?.tags ?? [],
      high_priority: !!tab?.metadata_search?.high_priority,
      content:
        x === 0
          ? `${
              (verifyIngress(page?.ingress) && flattenBlocks(page.ingress)) ??
              ""
            } ${flattenBlocks(tab.body)}`
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
      tags: page?.metadata_search?.tags ?? [],
      page: "bruk",
      high_priority: false,
      path,
      content: `${
        (verifyIngress(page?.ingress) && flattenBlocks(page.ingress)) ?? ""
      } ${flattenBlocks(page.usage)}`,
    });
  page.design &&
    records.push({
      objectID: `${id}_design`,
      category,
      title,
      tags: [],
      high_priority: false,
      page: "design",
      path: `${path}/design`,
      content: flattenBlocks(page.design),
    });
  page.development &&
    records.push({
      objectID: `${id}_utvikling`,
      category,
      title,
      tags: [],
      high_priority: false,
      page: "utvikling",
      path: `${path}/utvikling`,
      content: flattenBlocks(page.development),
    });
  page.accessibility &&
    records.push({
      objectID: `${id}_tilgjengelighet`,
      category,
      title,
      tags: [],
      high_priority: false,
      page: "tilgjengelighet",
      path: `${path}/tilgjengelighet`,
      content: flattenBlocks(page.accessibility),
    });
  !!page.development?.find((x) => x._type === "prop_table") &&
    records.push({
      objectID: `${id}_props`,
      category,
      title,
      tags: [],
      page: "props",
      path: `${path}/utvikling`,
      content: "proptable, api, props, types",
    });

  return records;
};
