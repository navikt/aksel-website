const semver = require("semver");

export default {
  name: "ds_changelog",
  title: "Changelog",
  type: "document",
  fields: [
    {
      title: "Tittel",
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required().error("Må legge til tittel"),
    },
    {
      title: "Dato",
      description: "Endringer sortes basert på datoen gitt her",
      name: "change_date",
      type: "date",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Pull request (optional)",
      description:
        "Eks: https://github.com/navikt/nav-frontend-moduler/pull/1382",
      name: "pull_request",
      type: "url",
    },
    {
      title: "Pakker og versioner",
      name: "packages",
      type: "array",
      of: [
        {
          name: "package_versions",
          type: "object",
          title: "Pakke og versjon",
          fields: [
            {
              title: "Pakke",
              name: "pack",
              type: "reference",
              to: [{ type: "ds_package" }],
              validation: (Rule) =>
                Rule.required().error("Siden må koble til en pakke"),
            },
            {
              title: "Semver versjon",
              name: "version",
              type: "string",
              validation: (Rule) =>
                Rule.custom((v) => {
                  if (!v) {
                    return "Pakke må ha en versjon";
                  }
                  return !!semver.valid(v)
                    ? true
                    : "Ikke en godkjent semver-versjon";
                }),
            },
          ],
          preview: {
            select: {
              p: "pack.title",
              version: "version",
            },
            prepare: ({ p, version }) => ({
              title: `${p}: ${version}`,
            }),
          },
        },
      ],
    },
    {
      title: "Type endring",
      name: "change",
      type: "string",
      options: {
        list: [
          { value: "new", title: "Nytt" },
          { value: "bug", title: "Bug" },
          { value: "breaking", title: "Breaking" },
          { value: "uu", title: "UU" },
          { value: "fix", title: "Fix" },
        ],
        layout: "radio",
      },
    },
    {
      title: "Tags",
      description: "Eks: Button, Alert, All etc",
      name: "tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    },
    {
      name: "body",
      title: "Tekst",
      description: "Beskrivelse av endringen",
      type: "riktekst",
      validation: (Rule) =>
        Rule.required().error("Må legge til en liten forklaring"),
    },
  ],
};
