// deskStructure.js
import React from "react";
import S from "@sanity/desk-tool/structure-builder";
import { Picture, FileFolder } from "@navikt/ds-icons";

export default () =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Frontpage")
        .icon(() => <Picture />)
        .child(S.editor().schemaType("frontpage").documentId("frontpage")),
      // Add a visual divider (optional)
      S.divider(),
      S.listItem()
        .title("Designsystem-2")
        .child(
          S.list()
            // Sets a title for our new list
            .title("Ds documents")
            // Add items to the array
            // Each will pull one of our new singletons
            .items([
              S.listItem()
                .title("Ds frontpage")
                .child(
                  S.document()
                    .schemaType("designsystemfrontpage")
                    .documentId("designsystemfrontpage")
                ),
              S.listItem()
                .title("Ds Nav")
                .child(
                  S.document().schemaType("designsystemnav").documentId("designsystemnav")
                ),
              S.listItem().title("DS pages").child(S.documentTypeList("designsystem")),
            ])
        ),

      S.divider(),
      // List out the rest of the document types, but filter out the config type
      ...S.documentTypeListItems().filter(
        (listItem) =>
          ![
            "frontpage",
            "designsystem",
            "designsystemfrontpage",
            "designsystemnav",
          ].includes(listItem.getId())
      ),
    ]);
