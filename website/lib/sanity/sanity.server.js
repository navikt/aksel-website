// lib/sanity.server.js
import { createClient } from "next-sanity";

const config = {
  projectId: "hnbe3yhs",
  dataset: "staging",
  useCdn: true, // False for fresh data
  apiVersion: "2021-05-31",
};

// Set up the client for fetching data in the getProps page functions
export const sanityClient = createClient(config);

// Set up a preview client with serverless authentication for drafts
export const previewClient = createClient({
  ...config,
  useCdn: false,
  ignoreBrowserTokenWarning: true,
  token:
    "skXMkLVwRPUcKEyYa92OfXtwSmDiaFoSPTG23GMisJ3ExGWTOITHBnDjtYfWTUsxhrGswGAdSUGyLDaMr7PrnPfMIeenZOgIjCIPI4x8NRpfNi8KwyzI2fYPLiPxD7vOEFdmvtnGNs64eQUjElnqZkULNMJGQVjjZLHm8QkfKqkX5REdifzk",
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const noCdnClient = (token) =>
  createClient({
    ...config,
    useCdn: false,
    token,
  });

// Helper function for easily switching between normal client and preview client
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getClient = (usePreview) =>
  usePreview ? previewClient : sanityClient;
