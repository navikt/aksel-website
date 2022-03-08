import { CoApplicant, Facilitet, Information, People } from "@navikt/ds-icons";
import S from "@sanity/desk-tool/structure-builder";
import userStore from "part:@sanity/base/user";
import React from "react";
import { createSuperPane } from "sanity-super-pane";
import { ComponentPageWebPreview } from "../../web-previews/ComponentWebPreview";
import { KomponentPreview } from "../../web-previews/KomponentPreview";
import { PageWebPreview } from "../../web-previews/PageWebPreview";
import { adminPanel } from "./admin";
import { akselInnhold } from "./aksel";
import { dsPanel } from "./ds";
import { profilePanel } from "./profile";

export const getDefaultDocumentNode = ({ schemaType }) => {
  switch (schemaType) {
    case "komponent_artikkel":
      return S.document().views([
        S.view.form(),
        S.view.component(ComponentPageWebPreview).title("Preview"),
        S.view.component(KomponentPreview).title("Preview-dev"),
      ]);
    case "ds_component_page":
      return S.document().views([
        S.view.form(),
        S.view.component(ComponentPageWebPreview).title("Preview"),
      ]);
    case "ds_artikkel":
      return S.document().views([
        S.view.form(),
        S.view.component(PageWebPreview).title("Preview"),
      ]);
    case "aksel_artikkel":
      return S.document().views([
        S.view.form(),
        S.view.component(PageWebPreview).title("Preview"),
      ]);
  }
};

const items = [
  S.listItem()
    .title("Brukere/Redaktører")
    .icon(() => <People />)
    .child(createSuperPane("editor")),
  S.listItem()
    .title("Team")
    .icon(() => <CoApplicant />)
    .child(S.documentTypeList("team")),

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
    const aksel = await akselInnhold();
    const intro = [welcome];

    profile && intro.push(profile);

    let struct = items;

    if (ds) {
      struct = [ds, ...struct];
    }
    struct = [aksel, ...struct];
    if (admin) {
      struct = [...struct, admin];
    }

    return S.list()
      .title("Aksel")
      .items([...intro, S.divider(), ...struct, ...panels]);
  });
};
