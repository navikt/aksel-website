// deskStructure.js
import React from "react";
import S from "@sanity/desk-tool/structure-builder";
/* import { FrontpageWebPreview } from "./web-previews/FrontpageWebPreview"; */
import { PageWebPreview } from "../web-previews/PageWebPreview";
import { ComponentPageWebPreview } from "../web-previews/ComponentWebPreview";
import {
  Facilitet,
  FileContent,
  Historic,
  Place,
  Search,
  Picture,
} from "@navikt/ds-icons";

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
                .title("Komponenter")
                .icon(() => <Facilitet />)
                .child(
                  S.documentTypeList("ds_component_page").initialValueTemplates(
                    [S.initialValueTemplateItem("ds_component_page_template")]
                  )
                ),
              S.listItem()
                .title("Artikler")
                .icon(() => <FileContent />)
                .child(
                  S.documentList()
                    .title("Artikler")
                    .filter(
                      '_type in ["ds_article_page", "ds_tabbed_article_page"]'
                    )
                ),
              /* S.listItem()
                .title("Forside")
                .icon(() => <Picture />)
                .child(
                  S.document()
                    .schemaType("ds_frontpage")
                    .documentId("frontpage_designsystem")
                ), */
              S.listItem()
                .title("Navigasjon")
                .icon(() => <Place />)
                .child(
                  S.document()
                    .schemaType("ds_navigation")
                    .documentId("ds_navigationid")
                ),
              S.listItem()
                .title("Changelog")
                .icon(() => <Historic />)
                .child(S.documentTypeList("ds_changelog")),
              S.listItem()
                .title("Kode eksempler")
                .icon(() => <span>{`< />`}</span>)
                .child(S.documentTypeList("ds_code_example")),
            ])
        ),
      S.listItem()
        .title("God Praksis")
        .child(
          S.list()
            .title("God Praksis")
            .items([
              S.listItem()
                .title("Artikler")
                .icon(() => <FileContent />)
                .child(
                  S.documentList()
                    .title("Artikler")
                    .filter('_type in ["gp_article_page"]')
                ),
              /* S.listItem()
                .title("Forside")
                .icon(() => <Picture />)
                .child(
                  S.document()
                    .schemaType("gp_frontpage")
                    .documentId("frontpage_god_praksis")
                ), */
            ])
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
            "ds_navigation",
            "gp_article_page",
            "gp_frontpage",
            "vk_frontpage",
            "metadata",
          ].includes(listItem.getId())
      ),
      S.divider(),
      S.listItem()
        .title("Admin")
        .child(
          S.list()
            .title("Admin")
            .items([
              S.listItem()
                .title("Forside")
                .icon(() => <Picture />)
                .child(
                  S.document()
                    .schemaType("vk_frontpage")
                    .documentId("frontpage_verktoykasse")
                ),
              S.listItem()
                .title("Metadata")
                .icon(() => <Search />)
                .child(
                  S.editor().schemaType("metadata").documentId("metadata")
                ),
            ])
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
