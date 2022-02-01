/* eslint-disable no-console */
const SanityConfig = require("../sanity.json");
const sanityClient = require("@sanity/client");
/**  Script for å rename data-felt
 * https://www.sanity.io/schemas/rename-a-field-across-documents-5cd6f5f0
 * Husk å kjøre backup med sanity dataset export først!
 * run: sanity exec scripts/renameField.js --with-user-token
 */

const client = sanityClient({
  projectId: SanityConfig.api.projectId,
  dataset: SanityConfig.api.dataset,
  apiVersion: "2020-06-19",
  useCdn: false,
});
/* ,"ds_article_page","ds_tabbed_article_page","gp_article_page" */
const fetchDocuments = () =>
  client.fetch(
    `*[_type in ["ds_component_page","ds_article_page","ds_tabbed_article_page","gp_article_page"] && defined(metadata)]
    {_id, _rev, metadata}`
  );

const buildPatches = (docs) =>
  docs.map((doc) => ({
    id: doc._id,
    patch: {
      set: {
        contact: doc.metadata.contact,
        ...(doc?.metadata?.contributors && {
          contributors: doc.metadata.contributors,
        }),
      },
      unset: ["metadata"],
      ifRevisionID: doc._rev,
    },
  }));

const createTransaction = (patches) =>
  patches.reduce(
    (tx, patch) => tx.patch(patch.id, patch.patch),
    client.transaction()
  );

const commitTransaction = (tx) => tx.commit();

const migrateNextBatch = async () => {
  const documents = await fetchDocuments();
  const patches = buildPatches(documents);
  if (patches.length === 0) {
    console.log("No more documents to migrate!");
    return null;
  }
  console.log(
    `Migrating batch:\n %s`,
    patches
      .map((patch) => `${patch.id} => ${JSON.stringify(patch.patch)}`)
      .join("\n")
  );
  const transaction = createTransaction(patches);
  await commitTransaction(transaction);
  return migrateNextBatch();
};

migrateNextBatch().catch((err) => {
  console.error(err);
  process.exit(1);
});
