import React from "react";

const Preview = ({ value }) => (
  <>
    <div>
      <strong>{value.title}</strong>
    </div>
  </>
);

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
      initalValue: () => false,
    },
  ],
  preview: {
    select: {
      title: "title",
      body: "body",
    },
    component: Preview,
  },
};
