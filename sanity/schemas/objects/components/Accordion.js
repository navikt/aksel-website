import React from "react";

const Preview = ({ node }) => <div>{node.title}</div>;

export default {
  name: "accordion",
  title: "Accordion",
  type: "object",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "body",
      title: "Body",
      type: "blockContent",
    },
    {
      name: "defaultOpen",
      title: "Open by default",
      type: "boolean",
    },
  ],
  initalValue: () => ({
    defaultOpen: false,
  }),
  preview: {
    select: {
      title: "title",
      body: "body",
      defaultOpen: "defaultOpen",
    },
    component: Preview,
  },
};
