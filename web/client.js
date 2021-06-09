import sanityClient from "@sanity/client";

export const defaultClient = sanityClient({
  projectId: "hnbe3yhs",
  dataset: "production", // or the name you chose in step 1
  useCdn: true, // `false` if you want to ensure fresh data
  apiVersion: "2021-05-31",
});

export const previewClient = sanityClient({
  projectId: "hnbe3yhs",
  dataset: "production",
  useCdn: false,
  token:
    "skXMkLVwRPUcKEyYa92OfXtwSmDiaFoSPTG23GMisJ3ExGWTOITHBnDjtYfWTUsxhrGswGAdSUGyLDaMr7PrnPfMIeenZOgIjCIPI4x8NRpfNi8KwyzI2fYPLiPxD7vOEFdmvtnGNs64eQUjElnqZkULNMJGQVjjZLHm8QkfKqkX5REdifzk",
  apiVersion: "2021-05-31",
});
