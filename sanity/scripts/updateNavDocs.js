const sanityClient = require("@sanity/client");
const sanityToken = process.env.SANITY_TOKEN;
const SanityConfig = require("../sanity.json");
const config = require("../config");

if (!sanityToken) {
  throw new Error("Could not find token from SANITY_TOKEN");
}

const client = sanityClient({
  projectId: SanityConfig.api.projectId,
  dataset: SanityConfig.api.dataset,
  apiVersion: "2020-06-19",
  token: sanityToken,
  useCdn: false,
});

config.teams.forEach((team) => {
  const doc = {
    _id: `${team.navigation}`,
    _type: "navigation",
    title: team.name + " navigation",
  };
  client.createIfNotExists(doc);
});
