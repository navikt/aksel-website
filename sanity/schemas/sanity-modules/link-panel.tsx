import React from "react";
import { allDocumentTypes } from "../../config";
import { LinkPanel } from "@navikt/ds-react";

function toPlainText(blocks = []) {
  return blocks
    .filter((block) => !(block._type !== "block" || !block.children))
    .map((block) => {
      return block.children.map((child) => child.text).join("");
    })
    .join("\n");
}

export default {
  name: "link_panel",
  title: "Lenkepanel",
  type: "object",
  fields: [
    {
      title: "Ekstern side",
      name: "external",
      type: "boolean",
      option: {
        layout: "checkbox",
      },
      validation: (Rule) => Rule.required(),
      initialValue: false,
    },
    {
      title: "Lenke til ekstern side",
      name: "external_link",
      type: "url",
      hidden: ({ parent }) => !parent?.external,
    },
    {
      title: "Lenke til Intern sanity-side",
      name: "internal_link",
      type: "reference",
      to: [...allDocumentTypes.map((x) => ({ type: x }))],
      hidden: ({ parent }) => parent?.external,
    },
    {
      title: "Tittel",
      name: "heading",
      type: "string",
      validation: (Rule) =>
        Rule.required().error("Lenkepanel må ha en enkel tittel"),
    },
    {
      title: "Heading nivå",
      name: "heading_level",
      type: "string",
      validation: (Rule) => Rule.required(),
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
      title: "Innhold (optional)",
      name: "body",
      type: "text",
    },
  ],
  preview: {
    select: {
      heading: "heading",
      body: "body",
    },
    prepare(selection) {
      return { ...selection };
    },
    component: (selection) => {
      if (!selection.value.heading) return null;
      return (
        <LinkPanel href="#">
          <LinkPanel.Title>{selection.value.heading}</LinkPanel.Title>

          {selection.value.body && (
            <LinkPanel.Description>
              {selection.value.body}
            </LinkPanel.Description>
          )}
        </LinkPanel>
      );
    },
  },
};
