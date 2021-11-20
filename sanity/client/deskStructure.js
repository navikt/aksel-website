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
  Ruler,
  Email,
  Edit,
  Findout,
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
                .title("Komponentsider")
                .icon(() => <Facilitet />)
                .child(
                  S.list()
                    .title("Komponentsider")
                    .items([
                      S.listItem()
                        .title("Publisert")
                        .icon(() => <FileContent />)
                        .child(
                          S.documentList()
                            .title("Publiserte komponentsider")
                            .filter(
                              `_type in ["ds_component_page"] && !(_id in path('drafts.**'))`
                            )
                        ),
                      S.listItem()
                        .title("Under arbeid")
                        .icon(() => <Edit />)
                        .child(
                          S.documentList()
                            .title("U-publiserte komponentsider")
                            .filter(
                              `_type == "ds_component_page" && _id in path("drafts.**") &&
                            (
                           (_id in path("drafts.**")) &&
                           (count(*[
                             _type == "ds_component_page" && !(_id in path("drafts.**"))
                             && (slug.current == ^.slug.current)
                           ]) == 0)
                         )`
                            )
                        ),
                      S.listItem()
                        .title("Alle komponentsider")
                        .icon(() => <FileContent />)
                        .child(S.documentTypeList("ds_component_page")),
                    ])
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
                .title("Komponentoversikt")
                .icon(() => <Findout />)
                .child(
                  S.document()
                    .schemaType("ds_component_overview")
                    .documentId("ds_component_overview_id")
                ),
              S.listItem()
                .title("Changelog")
                .icon(() => <Historic />)
                .child(S.documentTypeList("ds_changelog")),
              S.listItem()
                .title("Kodepakker")
                .icon(() => <Ruler />)
                .child(S.documentTypeList("ds_package")),
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
                .title("Publiserte Artikler")
                .icon(() => <FileContent />)
                .child(
                  S.documentList()
                    .title("Publiserte Artikler")
                    .filter(
                      `_type in ["gp_article_page"] && !(_id in path('drafts.**'))`
                    )
                ),
              S.listItem()
                .title("Artikler under arbeid")
                .icon(() => <Edit />)
                .child(
                  S.documentList()
                    .title("Publiserte Artikler")
                    .filter(
                      `_type == "gp_article_page" && _id in path("drafts.**") &&
                         (
                           (_id in path("drafts.**")) &&
                           (count(*[
                             _type == "gp_article_page" && !(_id in path("drafts.**"))
                             && (slug.current == ^.slug.current)
                           ]) == 0)
                         )`
                    )
                ),
              S.listItem()
                .title("Situasjoner")
                .icon(() => <Picture />)
                .child(
                  S.document()
                    .schemaType("gp_situations")
                    .documentId("gp_situation_doc")
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
            "ds_package",
            "ds_component_overview",
            "gp_article_page",
            "gp_frontpage",
            "gp_situations",
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
