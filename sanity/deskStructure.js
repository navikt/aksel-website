// deskStructure.js
import React from "react";
import S from "@sanity/desk-tool/structure-builder";
/* import { FrontpageWebPreview } from "./web-previews/FrontpageWebPreview"; */
import { PageWebPreview } from "./web-previews/PageWebPreview";
import { ComponentPageWebPreview } from "./web-previews/ComponentWebPreview";
import { Facilitet, FileContent, Historic } from "@navikt/ds-icons";
import teams from "./teams.js";

/* console.log(teams); */
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
                .title("Artikkelsider")
                .icon(() => <FileContent />)
                .child(
                  S.documentTypeList("ds_article_page") /* .initialValueTemplates([
                    S.initialValueTemplateItem("ds_component_page_template"),
                  ]) */
                ),

              S.listItem()
                .title("Pakke-versjoner")
                .icon(() => <Historic />)
                .child(S.documentTypeList("component_versions")),
            ])
        ),
      S.divider(),
      S.listItem()
        .title("Sidenavigasjon")
        .child(
          S.list()
            .title("Navigasjon")
            .items([
              ...teams.map((team) =>
                S.listItem()
                  .title(team.name)
                  .child(
                    S.document()
                      .schemaType("navigation")
                      .documentId("navigation_" + team.name)
                  )
              ),
            ])
        ),

      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) =>
          !["ds_component_page", "component_versions", "navigation"].includes(
            listItem.getId()
          )
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
