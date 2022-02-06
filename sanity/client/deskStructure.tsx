import {
  Edit,
  Facilitet,
  FileContent,
  Findout,
  Folder,
  Historic,
  Information,
  People,
  Picture,
  Place,
  Ruler,
  Task,
} from "@navikt/ds-icons";
import S from "@sanity/desk-tool/structure-builder";
import React from "react";
import { ComponentPageWebPreview } from "../web-previews/ComponentWebPreview";
import { PageWebPreview } from "../web-previews/PageWebPreview";
import { createSuperPane } from "sanity-super-pane";

const sanityClient = require("@sanity/client");
const SanityConfig = require("../sanity.json");

const client = sanityClient({
  projectId: SanityConfig.api.projectId,
  dataset: SanityConfig.api.dataset,
  apiVersion: "2020-06-19",
  useCdn: false,
});

export const getDefaultDocumentNode = ({ schemaType }) => {
  switch (schemaType) {
    case "ds_component_page":
      return S.document().views([
        S.view.form(),
        S.view.component(ComponentPageWebPreview).title("Preview"),
      ]);
    case "ds_article":
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

const items = [
  S.documentListItem()
    .title(`Velkommen`)
    .schemaType(`introduction`)
    .icon(() => <Information />)
    .id(`introductionid`),
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
                    .title("Komponent-artikler")
                    .icon(() => <Facilitet />)
                    .child(createSuperPane("ds_component_page")),
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
                                  `_type in ["ds_article"] && !(_id in path('drafts.**'))`
                                )
                            ),
                          S.listItem()
                            .title("Under arbeid")
                            .icon(() => <Edit />)
                            .child(
                              S.documentList()
                                .title("U-publiserte artikler")
                                .filter(
                                  `_type in ["ds_article"] && _id in path("drafts.**") &&
                              (
                             (_id in path("drafts.**")) &&
                             (count(*[
                                _type in ["ds_article"] && !(_id in path("drafts.**"))
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
                                .filter('_type in ["ds_article"]')
                            ),
                        ])
                    ),
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
                          `!(_id in [${allIds}]) && !(_id in path('drafts.**')) && _type in ["ds_component_page","ds_article"]`
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
    ),
  S.listItem()
    .title("God Praksis")
    .child(
      S.list()
        .title("God Praksis")
        .items([
          S.listItem()
            .title("Artikler")
            .child(createSuperPane("gp_article_page")),
        ])
    ),
  S.documentListItem()
    .title(`Forside`)
    .schemaType(`vk_frontpage`)
    .icon(() => <Picture />)
    .id(`frontpage_vk_praksis`),
  S.divider(),
  S.documentTypeListItem("editor")
    .title("Redaktør/Bidrag")
    .icon(() => <People />),
  S.divider(),
  S.listItem()
    .title("Demo - ignorer")
    .child(createSuperPane("ds_component_page")),
];

export default () => {
  return S.list().title("Aksel").items(items);
};
