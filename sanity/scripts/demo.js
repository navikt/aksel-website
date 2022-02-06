/* eslint-disable no-console */
const SanityConfig = require("../sanity.json");
const sanityClient = require("@sanity/client");

const client = sanityClient({
  projectId: SanityConfig.api.projectId,
  dataset: SanityConfig.api.dataset,
  apiVersion: "2020-06-19",
  useCdn: false,
});

const fetchDocuments = () =>
  client.fetch(
    `*[_type in ["ds_component_page","ds_article","gp_article_page"]]
    {_id, _updatedAt, metadata}`
  );

const runDemo = async () => {
  const documents = await fetchDocuments();
  console.log(documents);
};

runDemo().catch((err) => {
  console.error(err);
  process.exit(1);
});
