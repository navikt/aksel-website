// deskStructure.js
import React from "react";
import S from "@sanity/desk-tool/structure-builder";
import { Picture, Bookmark } from "@navikt/ds-icons";
import { FrontpageWebPreview } from "./preview/FrontpageWebPreview";

export default () =>
  S.list()
    .title("Verktøykasse")
    .items([
      S.listItem()
        .title("Forside")
        .icon(() => <Picture />)
        .child(
          S.editor()
            .schemaType("frontpage")
            .documentId("frontpage")
            .views([
              S.view.form(),
              S.view.component(FrontpageWebPreview).title("Preview"),
            ])
        ),
      S.divider(),
      S.listItem()
        .title("Designsystemet")
        .child(
          S.list()
            .title("Designsystemet")
            .items([
              S.listItem()
                .title("Forside")
                .icon(() => <Picture />)
                .child(
                  S.document().schemaType("ds_frontpage").documentId("ds_frontpage")
                ),
              S.listItem().title("Sider").child(S.documentTypeList("ds_page")),
            ])
        ),

      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) => !["frontpage", "ds_frontpage", "ds_page"].includes(listItem.getId())
      ),
    ]);

/* export const getDefaultDocumentNode = ({ schemaType }) => {
  switch (schemaType) {
    case "frontpage":
      return S.document().views([
        S.view.form(),
        S.view.component(FrontpagePreview).title("Preview"),
      ]);
  }
}; */
