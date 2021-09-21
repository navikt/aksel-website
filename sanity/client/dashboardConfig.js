import { allDocumentTypes } from "../config";

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
        query: '*[_type in $types && (_id in path("drafts.**"))]',
        queryParams: {
          types: allDocumentTypes,
        },
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
