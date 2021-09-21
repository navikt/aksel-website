import config from "../config";

export default {
  widgets: [
    /* {
      name: "project-info",
    },
    {
      name: "project-users",
    }, */
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
  ],
};
