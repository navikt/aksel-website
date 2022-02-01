/* eslint-disable no-console */
const SanityConfig = require("../sanity.json");
const sanityClient = require("@sanity/client");

const client = sanityClient({
  projectId: SanityConfig.api.projectId,
  dataset: SanityConfig.api.dataset,
  apiVersion: "2020-06-19",
  useCdn: false,
});

/* "ds_article_page","ds_tabbed_article_page","gp_article_page" */
const fetchDocuments = () =>
  client.fetch(
    `*[_id match "6d05db97-bed5-4a47-84f4-476bc347313a"]{_id, _updatedAt, _createdAt}`
  );

const runDemo = async () => {
  const documents = await fetchDocuments();
  console.log(documents);
};

runDemo().catch((err) => {
  console.error(err);
  process.exit(1);
});
