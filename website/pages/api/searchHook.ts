// pages/api/hook.js
import { isValidRequest } from "@sanity/webhook";
import algoliasearch from "algoliasearch";
import { SanityDocumentStub } from "@sanity/client";
import type { NextApiRequest, NextApiResponse } from "next";
import indexer from "sanity-algolia";
import { feedbackClient } from "../../lib";
import { isDevelopment } from "../../components";

const secret = process.env.HOOK_SECRET;
const token = process.env.SANITY_WRITE_KEY;
const APP_ID = process.env.ALGOLIA_ID;
const ALGOLIA_ADMIN = process.env.ALGOLIA_ADMIN;

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!secret || !token || !APP_ID || !ALGOLIA_ADMIN) {
    res.status(401).json({ success: false, message: "Invalid tokens" });
    return;
  }

  if (!isValidRequest(req, secret) && !isDevelopment()) {
    res.status(401).json({ success: false, message: "Invalid signature" });
    console.log("Unauthorized indexing attempt");
    return;
  }

  const algolia = algoliasearch(APP_ID, ALGOLIA_ADMIN);

  const sanity = feedbackClient(token);

  // Configure this to match an existing Algolia index name
  const algoliaIndex = algolia.initIndex("vk_designsystemet");

  const components = await sanity.fetch(componentQuery);

  const records: Record<string, any>[] = [];

  components.forEach((comp) => {
    const title = comp.title;
    const path = comp.path;
    const id = comp.objectID;

    comp.bruk &&
      records.push({
        objectID: `${id}_bruk`,
        title,
        page: "bruk",
        path,
        content: comp.bruk + comp.ingress,
      });
    comp.design &&
      records.push({
        objectID: `${id}_design`,
        title,
        page: "design",
        path: `${path}/design`,
        content: comp.design,
      });
    comp.utvikling &&
      records.push({
        objectID: `${id}_utvikling`,
        title,
        page: "utvikling",
        path: `${path}/utvikling`,
        content: comp.utvikling,
      });
    comp.tilgjengelighet &&
      records.push({
        objectID: `${id}_tilgjengelighet`,
        title,
        page: "tilgjengelighet",
        path: `${path}/tilgjengelighet`,
        content: comp.tilgjengelighet,
      });
    !!comp.proptable?.find((x) => x._type === "prop_table") &&
      records.push({
        objectID: `${id}_props`,
        title,
        page: "props",
        path: `${path}/utvikling`,
        content: "proptable, api, props, types",
      });
  });
  /* console.log(records); */

  await algoliaIndex.replaceAllObjects(records);

  res.status(200).json({ success: true });

  /* const sanityAlgolia = indexer(

    // The second parameter is a function that maps from a fetched Sanity document
    // to an Algolia Record. Here you can do further mutations to the data before
    // it is sent to Algolia.
    (document: SanityDocumentStub) => {
      switch (document._type) {

        case "ds_component_page":
          return {
            ...document,
            proptable: !!document.proptable?.find(
              (x) => x._type === "prop_table"
            ),
          };
        default:
          return document;
      }
    },

  ); */

  /* return sanityAlgolia
    .webhookSync(sanity, req.body)
    .then(() => res.status(200).send("ok")); */

  /* sanity.fetch(manuaUpdateQuery).then((ids) =>
    sanityAlgolia
      .webhookSync(sanity, {
        ids: { created: ids, updated: ids, deleted: [] },
      })
      .then(() => res.status(200).send("ok"))
  ); */
}

export default handler;

/* query for manually indexing dataset */
const manuaUpdateQuery = `*[_type == "ds_component_page" && !(_id in path('drafts.**'))][]._id`;

const componentQuery = `*[_type == "ds_component_page" && !(_id in path('drafts.**'))]{
  "objectID": _id,
  "title": heading,
  ingress,
  tags,
  status,
  "updated": metadata.last_update,
  "path": slug.current,
  "bruk": pt::text(usage),
  "design": pt::text(design),
  "utvikling": pt::text(development),
  "tilgjengelighet": pt::text(accessibility),
  "proptable": development,
}`;
