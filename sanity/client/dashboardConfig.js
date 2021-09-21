export default {
  widgets: [
    {
      name: "project-info",
    },
    {
      name: "project-users",
    },
    {
      name: "document-list",
      options: {
        title: "Drafts",
        query: '*[(_id in path("drafts.**"))]',
      },
    },
    {
      name: "outdated-documents-widget",
      options: {
        type: "warning",
      },
    },
    {
      name: "outdated-documents-widget",
      options: {
        type: "error",
      },
    },
    {
      name: "document-in-nav-widget",
    },
  ],
};
