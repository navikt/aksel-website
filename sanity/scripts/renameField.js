/* eslint-disable no-console */
import client from "part:@sanity/base/client";

/* Script for å rename data-felt
 * https://www.sanity.io/schemas/rename-a-field-across-documents-5cd6f5f0
 */
const fetchDocuments = () =>
  client.fetch(
    `*[_type == 'ds_component_page' && defined(spesific_component)][0...100] {_id, _rev, spesific_component}`
  );

const buildPatches = (docs) =>
  docs.map((doc) => ({
    id: doc._id,
    patch: {
      set: { linked_packages: doc.spesific_component },
      unset: ["spesific_component"],
      // this will cause the migration to fail if any of the documents has been
      // modified since it was fetched.
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
