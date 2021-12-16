import { Accordion, Alert } from "@navikt/ds-react";
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
  name: "accordion",
  title: "Accordion",
  type: "object",
  fields: [
    {
      title: "Accordions",
      name: "list",
      type: "array",
      of: [
        {
          title: "Accordion",
          name: "element",
          type: "object",
          fields: [
            {
              title: "Heading (optional)",
              name: "heading",
              type: "string",
              validation: (Rule) =>
                Rule.required().error("Accordion må ha en heading"),
            },
            {
              title: "Heading nivå",
              name: "heading_level",
              type: "string",
              validation: (Rule) =>
                Rule.required().error("Accordion må ha valgt et heading-nivå"),
              options: {
                list: [
                  { value: "h3", title: "H3" },
                  { value: "h4", title: "H4" },
                ],
                layout: "radio",
              },
              hidden: ({ parent }) => !parent.heading,
              initialValue: "h3",
            },
            {
              title: "Innhold",
              name: "body",
              type: "blockContent_simple",
              validation: (Rule) =>
                Rule.required().error("Accordion må ha noe innhold"),
            },
          ],
          preview: {
            select: {
              title: "heading",
            },
            prepare(selection) {
              return {
                title: selection.title ?? "",
              };
            },
          },
        },
      ],
      validation: (Rule) =>
        Rule.required().min(1).error("Accordion modul må ha minst 1 element"),
    },
  ],
  preview: {
    select: {
      title: "title",
      list: "list",
    },
    prepare(selection) {
      return { ...selection };
    },
    component: (selection) => {
      const { value } = selection;
      return (
        <>
          <Accordion>
            {value?.list?.map((el) => {
              return (
                <Accordion.Item>
                  <Accordion.Header>{el?.heading}</Accordion.Header>
                  <Accordion.Content>
                    {el?.body && toPlainText(el.body)}
                  </Accordion.Content>
                </Accordion.Item>
              );
            })}
          </Accordion>
        </>
      );
    },
  },
};
