import React from "react";

export default {
  title: "Kodesnutt",
  name: "code_snippet",
  type: "object",
  fields: [
    {
      name: "title",
      title: "Tittel (for preview internt i sanity)",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "code",
      title: "Kode",
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
  preview: {
    select: {
      code: "code",
    },
    prepare: ({ code }) => ({ code: code.code }),
    component: (s) => <pre style={{ padding: "0 0.5rem" }}>{s.value.code}</pre>,
  },
};
