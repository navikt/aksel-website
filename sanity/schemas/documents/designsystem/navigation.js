import React from "react";
const config = require("../../../config");

export default {
  name: "ds_navigation",
  title: "Navigation",
  type: "document",
  fields: [
    {
      title: "Designsystem navigajsons-struktur",
      name: "title",
      type: "string",
      readOnly: true,
      hidden: true,
      initialValue: "Designsystem navigajsons-struktur",
    },
    {
      name: "headings",
      title: "Header linker",
      type: "array",
      of: [
        {
          type: "ds_navigation_heading",
          name: "heading",
          title: "Header link",
        },
      ],
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .error("Headingmenyen må ha minst en koblet lenke i sidemenyen"),
    },
  ],
};

export const ds_header_heading = {
  name: "ds_navigation_heading",
  title: "Header link",
  type: "object",
  fields: [
    {
      name: "title",
      title: "Heading tittel",
      type: "string",
      validation: (Rule) =>
        Rule.required().error("Header lenken må ha en tittel"),
    },
    {
      title: "Side selve headingen linker til",
      description:
        "Husk å legge denne til i menyen også, hvis ikke blir den bare tilgjengelig via headern",
      name: "link_ref",
      type: "reference",
      to: [
        { type: "ds_component_page" },
        { type: "ds_article_page" },
        { type: "ds_tabbed_article_page" },
      ],
      validation: (Rule) =>
        Rule.required().error("Header lenken må linke til en startside"),
    },
    {
      title: "Meny for denne headingen",
      name: "menu",
      type: "array",
      of: [
        {
          title: "Menypunkt",
          name: "item",
          type: "object",
          fields: [
            {
              title: "Menypunkt tittel",
              name: "title",
              type: "string",
              validation: (Rule) =>
                Rule.required().error("Sidemeny-lenken må ha en tittel"),
            },
            {
              title: "Link til side",
              name: "link",
              type: "reference",
              to: [
                { type: "ds_component_page" },
                { type: "ds_article_page" },
                { type: "ds_tabbed_article_page" },
              ],
              validation: (Rule) =>
                Rule.required().error("Sidemeny-lenken må lenke til en side"),
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: `${title}`,
      };
    },
  },
};
