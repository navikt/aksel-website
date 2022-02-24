/* eslint-disable no-console */
const SanityConfig = require("../sanity.json");
const sanityClient = require("@sanity/client");

const client = sanityClient({
  projectId: SanityConfig.api.projectId,
  dataset: SanityConfig.api.dataset,
  apiVersion: "2021-03-25",
  useCdn: false,
});

/* const fetchDocuments = () =>
  client.fetch(
    `*[_type in ["ds_component_page","ds_article"]]
    {_id, _updatedAt, metadata}`
  ); */
/* const fetchDocuments = () => client.fetch(`*[_id in path('_.groups.*')]`); */
/* .then((res) => userStore.getUsers(res))
    .then((users) => users.filter((user) => user.isCurrentUser)); */

const runDemo = async () => {
  await client.create({}).then(() => console.log("ok"));
};

runDemo().catch((err) => {
  console.error(err);
  process.exit(1);
});
