import sanityClient from "@sanity/client";

export default sanityClient({
  projectId: "hnbe3yhs",
  dataset: "production", // or the name you chose in step 1
  useCdn: true, // `false` if you want to ensure fresh data
  apiVersion: "2021-05-31",
});
