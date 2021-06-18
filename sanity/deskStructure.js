// deskStructure.js
import React from "react";
import S from "@sanity/desk-tool/structure-builder";
/* import { FrontpageWebPreview } from "./web-previews/FrontpageWebPreview"; */
import { PageWebPreview } from "./web-previews/PageWebPreview";
import { ComponentPageWebPreview } from "./web-previews/ComponentWebPreview";
import { Facilitet, Historic } from "@navikt/ds-icons";

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
                .title("Komponenter")
                .icon(() => <Facilitet />)
                .child(
                  S.documentTypeList("ds_component_page").initialValueTemplates([
                    S.initialValueTemplateItem("ds_component_page_template"),
                  ])
                ),
              S.listItem()
                .title("Versjoner")
                .icon(() => <Historic />)
                .child(S.documentTypeList("component_versions")),
            ])
        ),

      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) =>
          !["ds_component_page", "component_versions"].includes(listItem.getId())
      ),
    ]);

export const getDefaultDocumentNode = ({ schemaType }) => {
  switch (schemaType) {
    case "ds_component_page":
      return S.document().views([
        S.view.form(),
        S.view.component(ComponentPageWebPreview).title("Preview"),
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
