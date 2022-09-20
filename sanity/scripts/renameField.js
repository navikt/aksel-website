/* eslint-disable no-console */
import sanityClient from "part:@sanity/base/client";

const client = sanityClient.withConfig({
  apiVersion: "2021-08-21",
  dataset: "production",
});

/**  Script for å rename data-felt
 * https://www.sanity.io/schemas/rename-a-field-across-documents-5cd6f5f0
 * Husk å kjøre backup med sanity dataset export først!
 * run: sanity exec scripts/renameField.js --with-user-token
 */

const fetchDocuments = () => client.fetch(`*[_type in [ "ds_component_page"]]`);

const buildPatches = (docs) =>
  docs
    .filter(
      (doc) => doc.contact?._ref === "2286ae51-465b-4866-928a-d0790b26b090"
    )
    .map((doc) => ({
      id: doc._id,
      patch: {
        set: {
          contact: {
            _ref: "editor.pv5AzOXXs",
            _type: "reference",
          },
        },
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
