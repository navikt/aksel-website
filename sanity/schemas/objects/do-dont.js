export default {
  title: "Do / Dont",
  name: "do_dont",
  type: "object",
  fieldsets: [
    {
      name: "optional_dodonts",
      title: "Optional (Setter dem side om side)",
      descrtiption: "testdesc",
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
  ],
  fields: [
    {
      title: "Bilde 1",
      name: "do_dont_1",
      type: "image",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "do_dont_1_body",
      title: "Fritekst",
      type: "blockContent",
    },
    {
      title: "Do / Dont",
      name: "do_dont_1_bool",
      type: "boolean",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Bilde 2",
      name: "do_dont_2",
      type: "image",
      fieldset: "optional_dodonts",
    },
    {
      name: "do_dont_2_body",
      title: "Fritekst",
      type: "blockContent",
      fieldset: "optional_dodonts",
    },
    {
      title: "Do / Dont",
      name: "do_dont_2_bool",
      type: "boolean",
      fieldset: "optional_dodonts",
    },
  ],
  initialValue: {
    // this overrides the initial value defined on the field
    do_dont_1_bool: false,
    do_dont_2_bool: false,
  },
};
