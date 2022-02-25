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
      validation: (Rule) =>
        Rule.required().error("Alert må ha en valgt variant"),
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
      title: "Størrelse",
      name: "size",
      type: "string",
      validation: (Rule) =>
        Rule.required().error("Alert må ha valgt en størrelse"),
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
      title: "Heading (optional)",
      name: "heading",
      type: "string",
    },
    {
      title: "Heading nivå",
      name: "heading_level",
      type: "string",
      validation: (Rule) =>
        Rule.required().error("Alert må ha valgt et heading-nivå"),
      options: {
        list: [
          { value: "h2", title: "H2" },
          { value: "h3", title: "H3" },
          { value: "h4", title: "H4" },
        ],
        layout: "radio",
      },
      hidden: ({ parent }) => !parent.heading,
      initialValue: "h2",
    },
    {
      title: "Innhold",
      name: "body",
      type: "riktekst_enkel",
      validation: (Rule) => Rule.required().error("Alert må ha noe innhold"),
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
      return (
        <Alert size={selection.value.size} variant={selection.value.variant}>
          {toPlainText(selection.value.body)}
        </Alert>
      );
    },
  },
};
