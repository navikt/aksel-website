export default {
  title: "Kode med eksempel",
  name: "ds_code_example",
  type: "document",
  fields: [
    {
      title: "Tittel",
      name: "title",
      type: "string",
    },
    {
      title: "Storybook Iframe (optional)",
      name: "preview",
      type: "url",
    },
    {
      type: "array",
      name: "tabs",
      title: "Kode",
      description: "Tabber blir bare vist hvis det er > 1 tabs",
      of: [{ type: "code_example.example" }],
      validation: (Rule) => Rule.max(4),
    },
    {
      name: "github",
      title: "Lenke til github-kode (optional)",
      type: "url",
    },
  ],
};

export const example = {
  name: "code_example.example",
  title: "Tabs",
  type: "object",
  fields: [
    {
      name: "title",
      title: "Tab tittel",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "example",
      title: "Kode eksempel",
      type: "code",
      validation: (Rule) => Rule.required(),
      options: {
        languageAlternatives: [
          { value: "js", title: "Javascript" },
          { value: "jsx", title: "JSX" },
          { value: "html", title: "HTML" },
          { value: "css", title: "CSS" },
          { value: "terminal", title: "Terminal/Bash" },
        ],
      },
    },
  ],
};
