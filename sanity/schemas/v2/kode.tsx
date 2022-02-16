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
      validation: (Rule) =>
        Rule.custom((v, { parent }) => {
          if (parent.variant) {
            return v ? true : "Må velge en kodesnippet";
          }
          return true;
        }).error(),
    },
    {
      name: "code",
      title: "Kode",
      type: "code",
      hidden: ({ parent }) => parent?.variant,
      validation: (Rule) =>
        Rule.custom((v, { parent }) => {
          if (!parent.variant) {
            return v ? true : "Må skrive noe kode";
          }
          return true;
        }).error(),
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
      ref: "ref.title",
    },
    prepare: ({ code, ref }) => ({
      title: code ? `${code?.code?.slice(0, 50)}...` : ref ? ref : "Kode",
      subtitle: code ? "Kode" : ref ? "Predefinert kodesnippet" : "",
    }),
  },
};
