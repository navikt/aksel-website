export default {
  title: "Do / Dont",
  name: "do_dont",
  type: "object",
  fields: [
    {
      title: "Tittel (vises bare internt i sanity)",
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      type: "array",
      name: "do_dont_block",
      title: "Do / donts",
      description:
        "Liste med do-donts. Full-width hvis bare ett element, To per rad hvis flere",
      of: [{ type: "do_dont.block" }],
      validation: (Rule) => Rule.required(),
    },
  ],
};

export const doDont = {
  title: "DoDont",
  name: "do_dont.block",
  type: "object",
  fields: [
    {
      title: "Bilde",
      name: "do_dont_img",
      type: "image",
      description:
        "Bilde size: x:700px hvis en do-dont i liste, x:330 y:330 hvis det er flere bilder (side om side view)",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "alt tekst for bilde",
      name: "do_dont_alt",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "do_dont_body",
      title: "Fritekst",
      description: "Beskrivelse av hva som er do/dont/warning",
      type: "blockContent",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "do_dont_variant",
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
      validation: (Rule) => Rule.required(),
    },
  ],
  initialValue: {
    // this overrides the initial value defined on the field
    do_dont_variant: "do",
  },
};

/*



*/
