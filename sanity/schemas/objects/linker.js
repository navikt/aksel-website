export default {
  title: "Linker til sider",
  description: "Rendrer små cards som linker videre til sider, tre per rad",
  name: "linker",
  type: "object",
  fields: [
    {
      type: "array",
      name: "linker_links",
      title: "Linker",
      of: [{ type: "linker.link" }],
      validation: (Rule) => Rule.required().min(1),
    },
  ],
  preview: {
    prepare: () => ({ title: "Side linker" }),
  },
};

export const links = {
  title: "Link",
  name: "linker.link",
  type: "object",
  description: "Sett enten Side referanse eller URL",
  fields: [
    {
      name: "title",
      title: "Link tittel",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "text",
      title: "Tekst (optional)",
      description: "Kort sammendrag av hva lenken linker til",
      type: "string",
    },
    {
      name: "link_url",
      title: "Url",
      type: "url",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "link_url_external",
      title: "Ekstern URL",
      type: "boolean",
    },
  ],
  initialValue: {
    link_url_external: false,
  },
};
