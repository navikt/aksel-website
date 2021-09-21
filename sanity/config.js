const teams = [
  {
    name: "designsystem",
    prefix: "ds",
    documents: [
      "ds_component_page",
      "ds_article_page",
      "ds_tabbed_article_page",
    ],
  },
  { name: "god_praksis", prefix: "gp", documents: [] },
];

const allDocuments = teams.reduce(
  (docs, team) => [...docs, team.documents],
  []
);

const outdatedContent = {
  warning: 40,
  error: 50,
};

module.exports = { teams, allDocuments, outdatedContent };
