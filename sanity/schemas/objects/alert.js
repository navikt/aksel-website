export default {
  name: "alert",
  title: "Alert",
  type: "object",
  fields: [
    {
      title: "Variant",
      name: "variant",
      type: "string",
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { value: "success", title: "Suksess" },
          { value: "info", title: "Info" },
          { value: "warning", title: "Fare" },
          { value: "error", title: "Error" },
        ],
        layout: "radio",
      },
    },
    {
      title: "Size",
      name: "size",
      type: "string",
      options: {
        list: [
          { value: "medium", title: "Medium" },
          { value: "small", title: "Small" },
        ],
        layout: "radio",
      },
    },
    {
      title: "Innhold",
      name: "body",
      type: "blockContent",
      validation: (Rule) => Rule.required(),
    },
  ],
};
