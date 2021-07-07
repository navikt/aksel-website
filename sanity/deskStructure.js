// deskStructure.js
import React from "react";
import S from "@sanity/desk-tool/structure-builder";
/* import { FrontpageWebPreview } from "./web-previews/FrontpageWebPreview"; */
import { PageWebPreview } from "./web-previews/PageWebPreview";
import { ComponentPageWebPreview } from "./web-previews/ComponentWebPreview";
import { Facilitet, FileContent, Historic, Place, Search } from "@navikt/ds-icons";
import teams from "./teams.js";

export default () =>
  S.list()
    .title("Verktøykasse")
    .items([
      S.listItem()
        .title("Designsystemet")
        .child(
          S.list()
            .title("Designsystemet")
            .items([
              S.listItem()
                .title("Komponent sider")
                .icon(() => <Facilitet />)
                .child(
                  S.documentTypeList("ds_component_page").initialValueTemplates([
                    S.initialValueTemplateItem("ds_component_page_template"),
                  ])
                ),
              S.listItem()
                .title("Artikkel sider")
                .icon(() => <FileContent />)
                .child(
                  S.documentList()
                    .title("Artikkler")
                    .filter('_type in ["ds_article_page", "ds_tabbed_article_page"]')
                ),
              S.listItem()
                .title("Navigasjon")
                .icon(() => <Place />)
                .child(
                  S.document()
                    .schemaType("navigation")
                    .documentId("navigation_designsystem")
                ),
              S.listItem()
                .title("Pakke-versjoner (test)")
                .icon(() => <Historic />)
                .child(S.documentTypeList("component_versions")),
            ])
        ),
      S.divider(),
      S.listItem()
        .title("Metadata")
        .icon(() => <Search />)
        .child(S.editor().schemaType("metadata").documentId("metadata")),
      ...S.documentTypeListItems().filter(
        (listItem) =>
          ![
            "ds_component_page",
            "component_versions",
            "navigation",
            "ds_tabbed_article_page",
            "ds_article_page",
            "metadata",
          ].includes(listItem.getId())
      ),
    ]);

export const getDefaultDocumentNode = ({ schemaType }) => {
  switch (schemaType) {
    case "ds_component_page":
      return S.document().views([
        S.view.form(),
        S.view.component(ComponentPageWebPreview).title("Preview (krever naisdevice)"),
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
