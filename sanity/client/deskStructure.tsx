// deskStructure.js
import React from "react";
import S from "@sanity/desk-tool/structure-builder";
import { PageWebPreview } from "../web-previews/PageWebPreview";
import { ComponentPageWebPreview } from "../web-previews/ComponentWebPreview";
import {
  Facilitet,
  FileContent,
  Historic,
  Place,
  Search,
  Picture,
  Ruler,
  Edit,
  Findout,
  Folder,
} from "@navikt/ds-icons";

const sanityClient = require("@sanity/client");
const SanityConfig = require("../sanity.json");

const client = sanityClient({
  projectId: SanityConfig.api.projectId,
  dataset: SanityConfig.api.dataset,
  apiVersion: "2020-06-19",
  useCdn: false,
});

export default () =>
  S.list()
    .title("Verktøykassen")
    .items([
      S.listItem()
        .title("Designsystemet")
        .child(
          S.list()
            .title("Designsystemet")
            .items([
              S.listItem()
                .title("Innhold")
                .child(async (): Promise<any> => {
                  const doc = await client.fetch(
                    `*[_id == 'ds_navigationid'][0]{
                      headings[]{
                        title,
                        menu
                      }
                    }`
                  );
                  if (!doc.headings) {
                    return [];
                  }

                  let menuItems = [];
                  let allIds = "";
                  try {
                    menuItems = doc.headings.map((heading) => {
                      const ids = heading.menu
                        .filter((item) => item._type === "item")
                        .map((item) => item.link._ref);
                      return S.listItem()
                        .title(heading.title)
                        .child(
                          S.documentList()
                            .title(heading.title)
                            .filter(
                              `_id in [${ids.map((x) => `"${x}"`).join(",")}]`
                            )
                        );
                    });

                    allIds = doc.headings
                      .map((heading) =>
                        heading.menu
                          .filter((item) => item._type === "item")
                          .map((item) => item.link._ref)
                          .map((x) => `"${x}"`)
                          .join(",")
                      )
                      .join(",");
                  } catch (e) {
                    console.log(e);
                  }

                  return S.list()
                    .title("Innhold")
                    .items([
                      S.listItem()
                        .title("Komponent artikler")
                        .icon(() => <Facilitet />)
                        .child(
                          S.list()
                            .title("Komponentsider")
                            .items([
                              S.listItem()
                                .title("Publisert")
                                .icon(() => <FileContent />)
                                .child(
                                  S.documentList()
                                    .title("Publiserte komponentsider")
                                    .filter(
                                      `_type in ["ds_component_page"] && !(_id in path('drafts.**'))`
                                    )
                                ),
                              S.listItem()
                                .title("Under arbeid")
                                .icon(() => <Edit />)
                                .child(
                                  S.documentList()
                                    .title("U-publiserte komponentsider")
                                    .filter(
                                      `_type == "ds_component_page" && _id in path("drafts.**") &&
                                  (
                                 (_id in path("drafts.**")) &&
                                 (count(*[
                                   _type == "ds_component_page" && !(_id in path("drafts.**"))
                                   && (slug.current == ^.slug.current)
                                 ]) == 0)
                               )`
                                    )
                                ),
                              S.listItem()
                                .title("Alle komponentsider")
                                .icon(() => <FileContent />)
                                .child(S.documentTypeList("ds_component_page")),
                            ])
                        ),

                      /*  */
                      S.listItem()
                        .title("Artikler")
                        .icon(() => <FileContent />)
                        .child(
                          S.list()
                            .title("Artikler")
                            .items([
                              S.listItem()
                                .title("Publisert")
                                .icon(() => <FileContent />)
                                .child(
                                  S.documentList()
                                    .title("Publiserte artikler")
                                    .filter(
                                      `_type in ["ds_article_page", "ds_tabbed_article_page"] && !(_id in path('drafts.**'))`
                                    )
                                ),
                              S.listItem()
                                .title("Under arbeid")
                                .icon(() => <Edit />)
                                .child(
                                  S.documentList()
                                    .title("U-publiserte artikler")
                                    .filter(
                                      `_type in ["ds_article_page", "ds_tabbed_article_page"] && _id in path("drafts.**") &&
                                  (
                                 (_id in path("drafts.**")) &&
                                 (count(*[
                                    _type in ["ds_article_page", "ds_tabbed_article_page"] && !(_id in path("drafts.**"))
                                   && (slug.current == ^.slug.current)
                                 ]) == 0)
                               )`
                                    )
                                ),
                              S.listItem()
                                .title("Alle Artikler")
                                .icon(() => <FileContent />)
                                .child(
                                  S.documentList()
                                    .title("Artikler")
                                    .filter(
                                      '_type in ["ds_article_page", "ds_tabbed_article_page"]'
                                    )
                                ),
                            ])
                        ),

                      /*  */
                      S.divider(),
                      S.listItem()
                        .title("Visning av sider i navigasjon")
                        .child(
                          S.list()
                            .title("Visning av sider i navigasjon")
                            .items(menuItems)
                        ),
                      S.listItem()
                        .title("Publiserte sider ikke i navigasjon")
                        .child(
                          S.documentList()
                            .title("Sider ikke i navigasjon")
                            .filter(
                              `!(_id in [${allIds}]) && !(_id in path('drafts.**')) && _type in ["ds_component_page","ds_article_page","ds_tabbed_article_page"]`
                            )
                        ),
                    ]);
                }),
              S.listItem()
                .title("Navigasjon")
                .icon(() => <Place />)
                .child(
                  S.document()
                    .schemaType("ds_navigation")
                    .documentId("ds_navigationid")
                ),
              S.listItem()
                .title("Forside")
                .icon(() => <Picture />)
                .child(
                  S.document()
                    .schemaType("ds_frontpage")
                    .documentId("frontpage_designsystem")
                ),
              S.divider(),
              S.listItem()
                .title("Komponentoversikt")
                .icon(() => <Findout />)
                .child(
                  S.document()
                    .schemaType("ds_component_overview")
                    .documentId("ds_component_overview_id")
                ),
              S.listItem()
                .title("Hovedkategorier")
                .icon(() => <Folder />)
                .child(S.documentTypeList("main_categories")),
              S.listItem()
                .title("Changelogs")
                .icon(() => <Historic />)
                .child(S.documentTypeList("ds_changelog")),
              S.listItem()
                .title("Kodepakker")
                .icon(() => <Ruler />)
                .child(S.documentTypeList("ds_package")),
              S.divider(),
              S.listItem()
                .title("Kodevisning på side")
                .child(
                  S.list()
                    .title("Kodevisning på side")
                    .items([
                      S.listItem()
                        .title("Eksempler")
                        .icon(() => <span>{`< />`}</span>)
                        .child(S.documentTypeList("ds_code_example")),
                      S.listItem()
                        .title("Sandboxes")
                        .icon(() => <span>{`< />`}</span>)
                        .child(S.documentTypeList("ds_code_sandbox")),
                    ])
                ),
              S.listItem()
                .title("Fargekategorier")
                .icon(() => <Folder />)
                .child(S.documentTypeList("ds_color_categories")),
            ])
        ),
      S.listItem()
        .title("God Praksis")
        .child(
          S.list()
            .title("God Praksis")
            .items([
              S.listItem()
                .title("Publiserte Artikler")
                .icon(() => <FileContent />)
                .child(
                  S.documentList()
                    .title("Publiserte Artikler")
                    .filter(
                      `_type in ["gp_article_page"] && !(_id in path('drafts.**'))`
                    )
                ),
              S.listItem()
                .title("Artikler under arbeid")
                .icon(() => <Edit />)
                .child(
                  S.documentList()
                    .title("Publiserte Artikler")
                    .filter(
                      `_type == "gp_article_page" && _id in path("drafts.**") &&
                         (
                           (_id in path("drafts.**")) &&
                           (count(*[
                             _type == "gp_article_page" && !(_id in path("drafts.**"))
                             && (slug.current == ^.slug.current)
                           ]) == 0)
                         )`
                    )
                ),
            ])
        ),
      S.listItem()
        .title("Forside")
        .icon(() => <Picture />)
        .child(
          S.document()
            .schemaType("vk_frontpage")
            .documentId("frontpage_vk_praksis")
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) =>
          ![
            "ds_component_page",
            "navigation",
            "ds_tabbed_article_page",
            "ds_article_page",
            "ds_frontpage",
            "ds_changelog",
            "ds_code_example",
            "ds_code_sandbox",
            "ds_navigation",
            "ds_package",
            "ds_color_categories",
            "ds_component_overview",
            "gp_article_page",
            "gp_frontpage",
            "vk_frontpage",
            "main_categories",
            "metadata",
          ].includes(listItem.getId())
      ),
    ]);

export const getDefaultDocumentNode = ({ schemaType }) => {
  switch (schemaType) {
    case "ds_component_page":
      return S.document().views([
        S.view.form(),
        S.view.component(ComponentPageWebPreview).title("Preview"),
      ]);
    case "ds_article_page":
      return S.document().views([
        S.view.form(),
        S.view.component(PageWebPreview).title("Preview"),
      ]);
    case "ds_tabbed_article_page":
      return S.document().views([
        S.view.form(),
        S.view.component(PageWebPreview).title("Preview"),
      ]);
    case "gp_article_page":
      return S.document().views([
        S.view.form(),
        S.view.component(PageWebPreview).title("Preview"),
      ]);
  }
};

// single page (eks forside)
/* S.listItem()
  .title("Komponenter2")
  .icon(() => <Facilitet />)
  .child(
    S.document()
      .schemaType("ds_component_page")
      .documentId("ds_component_page")
  ) */
