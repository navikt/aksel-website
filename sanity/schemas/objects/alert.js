import { Alert } from "@navikt/ds-react";
import React from "react";

function toPlainText(blocks = []) {
  return blocks
    .filter((block) => !(block._type !== "block" || !block.children))
    .map((block) => {
      return block.children.map((child) => child.text).join("");
    })
    .join("\n");
}

export default {
  name: "alert",
  title: "Alert",
  type: "object",
  fields: [
    {
      title: "Variant",
      name: "variant",
      type: "string",
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { value: "success", title: "Suksess" },
          { value: "info", title: "Info" },
          { value: "warning", title: "Fare" },
          { value: "error", title: "Error" },
        ],
        layout: "radio",
      },
      initialValue: "info",
    },
    {
      title: "Size",
      name: "size",
      type: "string",
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { value: "medium", title: "Medium" },
          { value: "small", title: "Small" },
        ],
        layout: "radio",
      },
      initialValue: "medium",
    },
    {
      title: "Innhold",
      name: "body",
      type: "blockContent",
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      size: "size",
      variant: "variant",
      body: "body",
    },
    prepare(selection) {
      return { ...selection };
    },
    component: (selection) => {
      console.log(selection);
      return (
        <Alert size={selection.value.size} variant={selection.value.variant}>
          {toPlainText(selection.value.body)}
        </Alert>
      );
    },
  },
};
