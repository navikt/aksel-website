import {
  documentFeedbackMetadata,
  documentMetadata,
  defaultPreview,
  documentInformation,
  groups,
} from "../../templates";

const prefix = "designsystem/side/";

export default {
  title: "Artikkel",
  name: "ds_article_page",
  type: "document",
  ...defaultPreview(),
  groups: [...groups],
  fields: [
    ...documentMetadata(),
    ...documentInformation(prefix),
    {
      type: "boolean",
      name: "article_type",
      title: "Tabs",
      group: "innhold",
      initialValue: false,
    },
    {
      name: "body",
      type: "blockContent",
      title: "Sideinnhold",
      group: "innhold",
      hidden: ({ document }) => !!document?.article_type,
    },
    {
      name: "tabs",
      title: "Tabs",
      type: "array",
      group: "innhold",
      hidden: ({ document }) => !document?.article_type,
      of: [
        {
          name: "tab",
          title: "Tab",
          type: "object",
          fields: [
            {
              title: "Tittel",
              description: "Innhold vil da legges under url/tab-tittel",
              name: "title",
              type: "string",
              validation: (Rule) =>
                Rule.required().error("Tabben må ha en enkel tittel"),
            },
            {
              title: "Sideinnhold",
              name: "body",
              type: "blockContent",
              validation: (Rule) =>
                Rule.required().error("Tabben må ha noe innhold"),
            },
          ],
        },
      ],
    },
    documentFeedbackMetadata,
  ],
  validation: (Rule) =>
    Rule.custom((fields) => {
      if (fields?.article_type) {
        return fields.tabs?.length > 0
          ? true
          : "Sider med tabs må ha minst en tab!";
      } else {
        return fields.body?.length > 0 ? true : "Siden må ha ha noe innhold!";
      }
    }),
};
