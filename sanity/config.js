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
    documents: [],
    navigation: `navigation_god_praksis`,
  },
];

const allDocuments = teams.reduce(
  (docs, team) => [...docs, ...team.documents],
  []
);

const allNavDocumentIds = teams.map((x) => x.navigation);

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
  allDocuments,
  allNavDocumentIds,
  getExpireDates,
};
