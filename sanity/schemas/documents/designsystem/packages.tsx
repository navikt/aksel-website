export default {
  name: "ds_package",
  title: "Kodepakke",
  type: "document",
  fields: [
    {
      title: "Navn",
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Scope",
      name: "scope",
      type: "string",
      validation: (Rule) => Rule.required(),
      initialValue: "core",
      options: {
        layout: "radio",
        list: [
          { value: "core", title: "Core" },
          { value: "internal", title: "Intern" },
          { value: "navno", title: "Navno" },
        ],
      },
    },
    {
      title: "Github-kode",
      name: "github_link",
      type: "url",
    },
  ],
};
