import { Information, People } from "@navikt/ds-icons";
import S from "@sanity/desk-tool/structure-builder";
import userStore from "part:@sanity/base/user";
import React from "react";
import { createSuperPane } from "sanity-super-pane";
import { ComponentPageWebPreview } from "../../web-previews/ComponentWebPreview";
import { PageWebPreview } from "../../web-previews/PageWebPreview";
import { adminPanel } from "./admin";
import { dsPanel } from "./ds";
import { profilePanel } from "./profile";

const sanityClient = require("@sanity/client");
const SanityConfig = require("../../sanity.json");

const client = sanityClient({
  projectId: SanityConfig.api.projectId,
  dataset: SanityConfig.api.dataset,
  apiVersion: "2020-06-19",
  useCdn: false,
});

export const getDefaultDocumentNode = ({ schemaType }) => {
  switch (schemaType) {
    case "komponent_artikkel":
      return S.document().views([
        S.view.form(),
        S.view.component(ComponentPageWebPreview).title("Preview"),
      ]);
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
    case "gp_article_page":
      return S.document().views([
        S.view.form(),
        S.view.component(PageWebPreview).title("Preview"),
      ]);
  }
};

const items = [
  S.listItem()
    .title("Innhold Aksel")
    .child(
      S.list()
        .title("Innhold")
        .items([
          S.listItem()
            .title("Artikler")
            .child(createSuperPane("gp_article_page")),
        ])
    ),

  S.divider(),
  S.listItem()
    .title("Brukere/Redaktører")
    .icon(() => <People />)
    .child(createSuperPane("editor")),

  S.divider(),
];

const welcome = S.documentListItem()
  .title(`Velkommen`)
  .schemaType(`introduction`)
  .icon(() => <Information />)
  .id(`introductionid`);

export default () => {
  return userStore.getCurrentUser().then(async ({ roles, id }) => {
    const panels = [];
    const admin = await adminPanel(roles);

    const profile = await profilePanel(id);
    const ds = await dsPanel(roles);
    const intro = [welcome];

    profile && intro.push(profile);

    let struct = items;

    if (ds) {
      struct = [ds, ...struct];
    }
    if (admin) {
      struct = [...struct, admin];
    }

    return S.list()
      .title("Aksel")
      .items([...intro, S.divider(), ...struct, ...panels]);
  });
};
