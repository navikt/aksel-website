import { getExamples } from "examples";

export default {
  title: "Kode eksempel",
  name: "code_example",
  type: "object",
  fields: [
    {
      title: "Tittel (vises bare internt i sanity)",
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Kode eksempel (optional)",
      name: "code_preview",
      type: "string",
      options: {
        list: [...getExamples()],
      },
    },
    {
      type: "array",
      name: "code_examples_tabs",
      title: "Kode preview",
      description: "Blir omgjort til tabs hvis flere enn en",
      of: [{ type: "code_example.example" }],
      validation: (Rule) => Rule.max(4),
    },
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare: ({ title }) => ({ title: title }),
  },
};

export const example = {
  name: "code_example.example",
  title: "Tabs",
  type: "object",
  fields: [
    {
      name: "codeExample_github",
      title: "Link til kode (github)",
      type: "url",
    },
    {
      name: "codeExample_copy",
      title: "Copy knapp",
      type: "boolean",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "codeExample",
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
  initialValue: {
    codeExample_copy: true,
  },
};
