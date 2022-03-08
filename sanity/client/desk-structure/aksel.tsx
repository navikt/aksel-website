import {
  Facilitet,
  FileContent,
  Findout,
  Folder,
  Historic,
  Picture,
  Place,
  Ruler,
  Task,
} from "@navikt/ds-icons";
import S from "@sanity/desk-tool/structure-builder";
import client from "part:@sanity/base/client";
import documentStore from "part:@sanity/base/datastore/document";
import { map } from "rxjs/operators";

import React from "react";
import { createSuperPane } from "sanity-super-pane";

const query = `*[_type == "aksel_tema" && count(*[references(^._id)]) > 0]`;

export const akselInnhold = async () => {
  return S.listItem()
    .title("Innhold Aksel")
    .child(
      S.list()
        .title("Innhold")
        .items([
          S.listItem()
            .title("Artikler")
            .child(createSuperPane("aksel_artikkel")),
          S.divider(),
          S.listItem()
            .title("Visninger")
            .child(
              S.list()
                .title("Visninger (viser nettsidevisning)")
                .items([
                  S.listItem()
                    .title("Temavisning")
                    .child(() =>
                      documentStore.listenQuery(query).pipe(
                        map((tema: any) => {
                          return S.list()
                            .title("Visning Temaer")
                            .items([
                              ...tema.map((tag) => {
                                return S.listItem()
                                  .title(tag.title)
                                  .child(
                                    S.documentList()
                                      .title(tag.title)
                                      .filter(
                                        `_type == 'aksel_artikkel' && $tag in tema[]->title`
                                      )
                                      .params({ tag: tag.title })
                                  );
                              }),
                            ]);
                        })
                      )
                    ),
                ])
            ),

          S.divider(),
          S.listItem()
            .title("Tema")
            .icon(() => <Facilitet />)
            .child(S.documentTypeList("aksel_tema")),
        ])
    );
};
