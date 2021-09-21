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

const outdatedContent = {
  warning: 10,
  error: 50,
};

function getExpireDates(docType) {
  const stagnantDate = new Date();
  const expiredDate = new Date();
  switch (docType) {
    case "article":
      stagnantDate.setDate(stagnantDate.getDate() + 0);
      expiredDate.setDate(expiredDate.getDate() + 9);
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
  outdatedContent,
  allNavDocumentIds,
  getExpireDates,
};
