export default {
  name: "prop_table",
  title: "Proptable",
  type: "object",
  fields: [
    {
      title: "children-prop required av type React.ReactNode",
      name: "preset_children",
      type: "boolean",
      options: {
        layput: "checkbox",
      },
      initialValue: true,
    },
    {
      title: "className-prop",
      name: "preset_classname",
      type: "boolean",
      options: {
        layput: "checkbox",
      },
      initialValue: true,
    },
    {
      type: "array",
      name: "props",
      title: "Props",
      description: "Liste med props, tilsvarer en rad i tabellen",
      of: [{ type: "prop_table_prop" }],
    },
    {
      title: "Bruker OverridableComponent",
      name: "overridable",
      type: "boolean",
      options: {
        layput: "checkbox",
      },
      initialValue: false,
    },
    {
      title: "Hvor settes ref",
      description: "Eks: root element",
      name: "refplacement",
      type: "string",
      initialValue: "root element",
    },
    {
      title: "Hvilken props ekstender komponent-props",
      description: "Eks: HtmlDivElement, ButtonProps",
      name: "extends",
      type: "string",
      initialValue: "HtmlDivElement",
    },
  ],
  preview: {
    prepare: () => ({ title: "Proptable" }),
  },
};

export const prop = {
  name: "prop_table_prop",
  title: "Prop",
  type: "object",
  fields: [
    {
      title: "Name",
      name: "name",
      type: "string",
      validation: (Rule) => Rule.required().error("Proptable må ha et navn"),
    },
    {
      title: "Type",
      name: "type",
      type: "string",
      validation: (Rule) => Rule.required().error("Proptable må ha en type"),
    },
    {
      title: "Beskrivelse (optional)",
      name: "description",
      type: "string",
    },
    {
      title: "Default (optional)",
      name: "default",
      type: "string",
    },
    {
      title: "Required",
      name: "required",
      type: "boolean",
      validation: (Rule) =>
        Rule.required().error("proptable må ha togglet Required on/off"),
    },
  ],
  initialValue: () => ({
    required: false,
  }),
  preview: {
    select: {
      name: "name",
    },
    prepare: ({ name }) => ({ title: name }),
  },
};
