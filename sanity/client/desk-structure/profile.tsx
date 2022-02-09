import { Picture } from "@navikt/ds-icons";
import S from "@sanity/desk-tool/structure-builder";
import userStore from "part:@sanity/base/user";
import client from "part:@sanity/base/client";

import React from "react";

export const profilePanel = async (id) => {
  const docId = `editor.${id}`;

  const ids = await client
    .withConfig({ apiVersion: "2021-05-31" })
    .fetch(`*[_type == "editor"]._id`);

  if (ids.find((x) => x === docId)) {
    return S.documentListItem()
      .title(`Min profil`)
      .schemaType(`editor`)
      .icon(() => <Picture />)
      .id(docId);
  } else {
    return null;
  }
};
