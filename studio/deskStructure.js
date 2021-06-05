// deskStructure.js
import React from "react";
import S from "@sanity/desk-tool/structure-builder";
import { Picture, FileFolder, Bookmark } from "@navikt/ds-icons";

export default () =>
  S.list()
    .title("Web content")
    .items([
      S.listItem()
        .title("Frontpage")
        .icon(() => <Picture />)
        .child(S.editor().schemaType("frontpage").documentId("frontpage")),
      S.divider(),
      S.divider(),
      S.listItem()
        .title("Designsystem")
        .child(
          S.list()
            .title("Designsystem content")
            .items([
              S.listItem()
                .title("Frontpage")
                .icon(() => <Picture />)
                .child(
                  S.document()
                    .schemaType("designsystemfrontpage")
                    .documentId("designsystemfrontpage")
                ),
              S.listItem()
                .title("Designsystem Navigation")
                .icon(() => <Bookmark />)
                .child(
                  S.document().schemaType("designsystemnav").documentId("designsystemnav")
                ),
              S.listItem()
                .title("DS pages")
                .child(S.documentTypeList("designsystempage")),
            ])
        ),

      S.divider(),
      // List out the rest of the document types, but filter out the config type
      ...S.documentTypeListItems().filter(
        (listItem) =>
          ![
            "frontpage",
            "designsystempage",
            "designsystemfrontpage",
            "designsystemnav",
          ].includes(listItem.getId())
      ),
    ]);
