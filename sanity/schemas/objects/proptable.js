export default {
  name: "prop_table",
  title: "Proptable",
  type: "object",
  fields: [
    {
      title: "children-prop required av type React.ReactNode",
      name: "preset_children",
      type: "boolean",
      initialValue: true,
    },
    {
      title: "className-prop",
      name: "preset_classname",
      type: "boolean",
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
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Type",
      name: "type",
      type: "string",
      validation: (Rule) => Rule.required(),
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
      validation: (Rule) => Rule.required(),
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
