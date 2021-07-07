import { Expand, Link, Bookmark } from "@navikt/ds-icons";
import React from "react";

const maxDepth = 2;

const checkDepth = (list, depth) => {
  if (!list || list.length === 0) {
    throw new Error("Dropdown lister må ha mist et element");
  }

  if (depth > maxDepth) {
    throw new Error(`Sidemeny kan ha maks dybde på ${maxDepth} elementer`);
  }

  for (const el of list) {
    el._type === "dropdown" && checkDepth(el.dropdown, depth + 1);
  }
  return true;
};

function validateNestedDepth(sidemenu) {
  if (!sidemenu) {
    return "Sidemeny må ha minst et element";
  }
  try {
    checkDepth(sidemenu, 0);
  } catch (e) {
    return e.message;
  }
  return true;
}

export default {
  name: "navigation",
  title: "Navigation",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Tittel",
      type: "string",
      readOnly: true,
      hidden: true,
    },
    {
      name: "sidemenu",
      title: "Sidemeny",
      description:
        "Linker eller dropdowns med linker. Maks dybde på 2 dropdowns er støttet. Sider må være publisert før de kan linkes her.",
      type: "array",
      of: [
        { type: "navigation.dropdown", name: "dropdown", title: "Dropdown" },
        { type: "navigation.link", name: "link", title: "Link" },
        { type: "navigation.title", name: "title", title: "Seksjonstittel" },
      ],
      validation: (Rule) => Rule.required().min(1),
    },
  ],
  validation: (Rule) =>
    Rule.required().custom(({ sidemenu, ...rest }) => {
      /* console.log(rest); */
      return validateNestedDepth(sidemenu);
    }),
};

export const dropdown = {
  name: "navigation.dropdown",
  title: "Dropdown",
  type: "object",
  fields: [
    {
      name: "title",
      title: "Tittel",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Meny",
      name: "dropdown",
      type: "array",
      of: [
        { type: "navigation.link", name: "link", title: "Link" },
        { type: "navigation.dropdown", name: "dropdown", title: "Dropdown" },
      ],
      validation: (Rule) => Rule.required().min(1),
    },
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: `${title}`,
        media: <Expand />,
      };
    },
  },
};

export const LinkTitle = {
  name: "navigation.title",
  title: "Seksjons tittel",
  type: "object",
  fields: [
    {
      name: "title",
      title: "Tittel",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: `${title}`,
        media: <Bookmark />,
      };
    },
  },
};

export const link = {
  name: "navigation.link",
  title: "Link",
  type: "object",
  fields: [
    {
      name: "title",
      title: "Tittel",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Link",
      name: "link_ref",
      type: "reference",
      weak: true,
      to: [{ type: "ds_component_page" }, { type: "ds_article_page" }],
      validation: (Rule) => Rule.required(),
      options: {
        // TODO: Add prefix to "teams.js" then filter documents based on document id & prefix
        /* filter: ({ ...rest }) => {
          console.log(rest);
          return null;
          return {
            filter: 'role == $role && birthYear >= $minYear',
            params: {
              role: 'director',
              minYear: document.releaseYear
            }
          }
        }, */
      },
    },
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: `${title}`,
        media: <Link />,
      };
    },
  },
};
