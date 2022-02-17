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

import React from "react";
import { createSuperPane } from "sanity-super-pane";

export const dsPanel = async (roles) => {
  console.log(roles);

  const role = roles.some(({ name }) => "aksel-editor" === name);

  if (role) {
    return null;
  } else {
    return S.listItem()
      .title("Designsystem-portal")
      .child(
        S.list()
          .title("Designsystem")
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
                      .title("Komponent-artikler")
                      .icon(() => <Facilitet />)
                      .child(createSuperPane("ds_component_page")),
                    S.listItem()
                      .title("Komponent-artikler (ny struktur beta)")
                      .icon(() => <Facilitet />)
                      .child(createSuperPane("komponent_artikkel")),
                    S.listItem()
                      .title("Artikler")
                      .icon(() => <FileContent />)
                      .child(createSuperPane("ds_article_page")),
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
                            `!(_id in [${allIds}]) && !(_id in path('drafts.**')) && _type in ["ds_component_page","ds_article_page", "komponent_artikkel"]`
                          )
                      ),
                  ]);
              }),
            S.documentListItem()
              .title(`Navigasjon`)
              .schemaType(`ds_navigation`)
              .icon(() => <Place />)
              .id(`ds_navigationid`),
            S.documentListItem()
              .title(`Forside`)
              .schemaType(`ds_frontpage`)
              .icon(() => <Picture />)
              .id(`frontpage_designsystem`),
            S.divider(),
            S.documentListItem()
              .title(`Komponentoversikt`)
              .schemaType(`ds_component_overview`)
              .icon(() => <Findout />)
              .id(`ds_component_overview_id`),
            S.listItem()
              .title("Changelogs")
              .icon(() => <Historic />)
              .child(createSuperPane("ds_changelog")),
            S.listItem()
              .title("Kodepakker")
              .icon(() => <Ruler />)
              .child(S.documentTypeList("ds_package")),
            S.listItem()
              .title("Kategorier")
              .icon(() => <Folder />)
              .child(S.documentTypeList("main_categories")),
            S.divider(),
            S.listItem()
              .title("Kodevisning på side")
              .child(
                S.list()
                  .title("Kodevisning på side")
                  .items([
                    S.listItem()
                      .title("Eksempler")
                      .icon(() => <span>{`<Sa`}</span>)
                      .child(S.documentTypeList("ds_code_example")),
                    S.listItem()
                      .title("Sandboxes")
                      .icon(() => <span>{`<Co />`}</span>)
                      .child(S.documentTypeList("ds_code_sandbox")),
                  ])
              ),
            S.listItem()
              .title("Fargekategorier")
              .icon(() => <Folder />)
              .child(S.documentTypeList("ds_color_categories")),
            S.divider(),
            S.documentListItem()
              .title(`Komponent-template`)
              .schemaType(`ds_component_template`)
              .icon(() => <Task />)
              .id(`ds_component_templateid`),
          ])
      );
  }
};
