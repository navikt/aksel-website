// pages/api/hook.js
import { isValidRequest } from "@sanity/webhook";
import algoliasearch from "algoliasearch";
import { SanityDocumentStub } from "@sanity/client";
import type { NextApiRequest, NextApiResponse } from "next";
import indexer from "sanity-algolia";
import { feedbackClient } from "../../lib";

const secret = process.env.HOOK_SECRET;
const token = process.env.SANITY_WRITE_KEY;
const APP_ID = process.env.ALGOLIA_ID;
const ALGOLIA_ADMIN = process.env.ALGOLIA_ADMIN;

function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!secret || !token || !APP_ID || !ALGOLIA_ADMIN) {
    res.status(401).json({ success: false, message: "Invalid tokens" });
    return;
  }

  /* if (!isValidRequest(req, secret)) {
    res.status(401).json({ success: false, message: "Invalid signature" });
    console.log("Unauthorized indexing attempt");
    return;
  } */

  const algolia = algoliasearch(APP_ID, ALGOLIA_ADMIN);

  const sanity = feedbackClient(token);

  // Configure this to match an existing Algolia index name
  const algoliaIndex = algolia.initIndex("vk_designsystemet");

  const sanityAlgolia = indexer(
    // Optionally you can also customize how the
    // document is fetched from Sanity by specifying a GROQ projection.
    //
    // _id and other system fields are handled automatically.
    {
      ds_component_page: {
        index: algoliaIndex,
        projection: componentProjection,
      },
    },

    // The second parameter is a function that maps from a fetched Sanity document
    // to an Algolia Record. Here you can do further mutations to the data before
    // it is sent to Algolia.
    (document: SanityDocumentStub) => {
      switch (document._type) {
        /* case "post":
          return Object.assign({}, document, {
            custom: "An additional custom field for posts, perhaps?",
          }); */

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
    // Visibility function (optional).
    //
    // The third parameter is an optional visibility function. Returning `true`
    // for a given document here specifies that it should be indexed for search
    // in Algolia. This is handy if for instance a field value on the document
    // decides if it should be indexed or not. This would also be the place to
    // implement any `publishedAt` datetime visibility rules or other custom
    // visibility scheme you may be using.
    (document: SanityDocumentStub) => {
      if (Object.prototype.hasOwnProperty.call(document, "isHidden")) {
        return !document.isHidden;
      }
      return true;
    }
  );

  // Finally connect the Sanity webhook payload to Algolia indices via the
  // configured serializers and optional visibility function. `webhookSync` will
  // inspect the webhook payload, make queries back to Sanity with the `sanity`
  // client and make sure the algolia indices are synced to match.

  /* return sanityAlgolia
    .webhookSync(sanity, req.body)
    .then(() => res.status(200).send("ok")); */

  sanity.fetch(manuaUpdateQuery).then((ids) =>
    sanityAlgolia
      .webhookSync(sanity, {
        ids: { created: ids, updated: ids, deleted: [] },
      })
      .then(() => res.status(200).send("ok"))
  );
}

export default handler;

/* query for manually indexing dataset */
const manuaUpdateQuery = `*[_type == "ds_component_page" && !(_id in path('drafts.**'))][]._id`;

const componentProjection = `{
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
