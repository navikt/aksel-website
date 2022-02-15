import React from "react";

export default {
  title: "Kode",
  name: "kode",
  type: "object",
  fields: [
    {
      title: "Bruk predefinert kodesnutt?",
      type: "boolean",
      name: "variant",
      initialValue: false,
      validation: (Rule) =>
        Rule.required().error("Kodes må ha en definert variant"),
    },
    {
      title: "Predefinert kodesnutt",
      name: "ref",
      type: "reference",
      to: [{ type: "ds_code_example" }],
      hidden: ({ parent }) => !parent?.variant,
    },
    {
      name: "code",
      title: "Kode",
      type: "code",
      hidden: ({ parent }) => parent?.variant,
      options: {
        languageAlternatives: [
          { value: "js", title: "Javascript" },
          { value: "jsx", title: "JSX" },
          { value: "html", title: "HTML" },
          { value: "css", title: "CSS" },
          { value: "terminal", title: "Terminal/Bash" },
          { value: "terminal", title: "Standard" },
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
