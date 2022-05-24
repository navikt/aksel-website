import { getClient } from "../sanity/sanity.server";

const docTypes = [
  "aksel_artikkel",
  "aksel_blogg",
  "aksel_prinsipp",
  "ds_artikkel",
  "ds_component_page",
  "komponent_artikkel",
];

const akselSpesifics = `
_type == "aksel_prinsipp" => {"prinsipp": prinsipp.prinsippvalg},
_type == "aksel_artikkel" => {"tema": tema[]->title}`;

const dsSpesifics = `
artikkel_type == true => {
  "tabs": innhold_tabs[].title
}
`;

const query = `
*[_type in $types]{
   _id,
   _type,
  "url": slug.current,
  heading,
  ${akselSpesifics},
  ${dsSpesifics}
}`;

export const generateObjects = async () => {
  const data = await getClient().fetch(query, {
    types: docTypes,
  });

  const objects = [];

  data
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .map(({ _id, ...rest }) => ({ ...rest }))
    .forEach((doc) => {
      switch (doc._type) {
        case "aksel_artikkel":
          /* Hide docs without a tema set */
          doc.tema && objects.push(doc);
          break;
        case "aksel_blogg":
          objects.push(doc);
          break;
        case "aksel_prinsipp":
          objects.push(doc);
          break;
        case "ds_artikkel":
          if (doc.tabs) {
            doc.tabs.forEach((x) => objects.push({ ...doc, tab: x }));
            break;
          }
          objects.push(doc);
          break;
        case "ds_component_page":
          ["", "utvikling"].forEach((x) =>
            objects.push({
              ...doc,
              tab: x,
              url: `${doc.url}${x ? `/${x}` : ""}`,
            })
          );
          break;
        case "komponent_artikkel":
          ["", "kode"].forEach((x) =>
            objects.push({
              ...doc,
              tab: x,
              url: `${doc.url}${x ? `/${x}` : ""}`,
            })
          );
          break;
        default:
          break;
      }
    });

  return objects;
};
