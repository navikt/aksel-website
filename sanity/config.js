const teams = [
  {
    name: "designsystem",
    prefix: "ds",
    documents: [
      "ds_component_page",
      "ds_article_page",
      "ds_tabbed_article_page",
    ],
    navigation: `navigation_designsystem`,
  },
  {
    name: "god_praksis",
    prefix: "gp",
    documents: ["gp_article_page"],
    navigation: `navigation_god_praksis`,
  },
];

/* Collection of all document-pages to account for */
const allDocumentTypes = teams.reduce(
  (docs, team) => [...docs, ...team.documents],
  []
);

/* Collection of all navigation-documents */
const allNavDocumentIds = teams.map((x) => x.navigation);

/**
 * Defines when a document of a spesific type is set to stagnant or expired
 * @param {"string"} docType
 * @returns [stagnant Date, expired Date]
 */
function getExpireDates(docType) {
  const stagnantDate = new Date();
  const expiredDate = new Date();
  switch (docType) {
    case "article":
      stagnantDate.setDate(stagnantDate.getDate() + 120);
      expiredDate.setDate(expiredDate.getDate() + 180);
      return [stagnantDate, expiredDate];
    default:
      stagnantDate.setDate(stagnantDate.getDate() + 120);
      expiredDate.setDate(expiredDate.getDate() + 180);
      return [stagnantDate, expiredDate];
  }
}

module.exports = {
  teams,
  allDocumentTypes,
  allNavDocumentIds,
  getExpireDates,
};
