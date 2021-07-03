const sanityClient = require("@sanity/client");
const sanityToken = process.env.SANITY_TOKEN;
const config = require("../sanity.json");
const teams = require("../teams");

/* if (!sanityToken) {
  throw new Error("Could not find token from SANITY_TOKEN");
} */

const client = sanityClient({
  projectId: config.api.projectId,
  dataset: config.api.dataset,
  apiVersion: "2020-06-19",
  token: sanityToken,
  useCdn: false,
});

teams.forEach((team) => {
  const doc = {
    _id: team.name,
    _type: "navigation",
    title: team.name + " navigation",
  };
  client.createIfNotExists(doc);
});
