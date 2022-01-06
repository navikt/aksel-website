import { allDocumentTypes } from "../config";

export default {
  widgets: [
    {
      name: "document-list",
      options: {
        title: "Drafts for God Praksis",
        query: '*[_type in $types && (_id in path("drafts.**"))]',
        queryParams: {
          types: allDocumentTypes.filter((x) => x.startsWith("gp")),
        },
      },
    },
    {
      name: "document-list",
      options: {
        title: "Drafts for Designsystemet",
        query: '*[_type in $types && (_id in path("drafts.**"))]',
        queryParams: {
          types: allDocumentTypes.filter((x) => x.startsWith("ds")),
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
    {
      name: "project-info",
    },
    {
      name: "project-users",
    },
    {
      name: "document-list",
      options: {
        title: "Feedback",
        query: '*[_type == "feedback" && done != true] | order(_createdAt asc)',
      },
    },
  ],
};