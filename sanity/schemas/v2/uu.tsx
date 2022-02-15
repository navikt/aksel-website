export default {
  title: "Do / Dont",
  name: "uu_",
  type: "object",
  fields: [
    {
      title: "Tittel (h3)",
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required().error("Do/dont må ha en tittel"),
    },
    {
      title: "Forklaring (optional)",
      name: "forklaring",
      type: "riktekst",
    },
    {
      type: "array",
      name: "blokker",
      title: "Do / donts",
      of: [{ type: "do_dont_block" }],
      validation: (Rule) => Rule.required().max(4),
    },
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare(selection) {
      return {
        title: selection?.title,
        subtitle: "Do/Dont",
      };
    },
  },
};

export const doDont = {
  title: "DoDont",
  name: "do_dont_block",
  type: "object",
  fields: [
    {
      title: "Fullwidth",
      description: "Tar opp ~ 40% eller 100% av tilgjengelig bredde",
      name: "fullwidth",
      type: "boolean",
      validation: (Rule) => Rule.required(),
      initialValue: false,
    },
    {
      title: "Bilde",
      name: "picture",
      type: "image",
      validation: (Rule) =>
        Rule.required().error("Do/dont må ha et bilde lagt til"),
      options: {
        hotspot: true,
      },
    },
    {
      title: "alt tekst for bilde",
      name: "alt",
      type: "string",
      validation: (Rule) => Rule.required().error("Do/dont må ha en alt-tekst"),
      options: {
        isHighlighted: true,
      },
    },
    {
      name: "description",
      title: "Fritekst",
      description:
        "Korte konsise beskrivelser. Bruk fullbredde bilde i dodont med egen tekst for legnre forklaringer",
      type: "text",
    },
    {
      name: "variant",
      title: "Variant",
      type: "string",
      options: {
        list: [
          { title: "Do", value: "do" },
          { title: "Dont", value: "dont" },
          { title: "Warning", value: "warning" },
        ],
        layout: "radio",
      },
      initialValue: "do",
      validation: (Rule) => Rule.required(),
    },
  ],
};

/*



*/
