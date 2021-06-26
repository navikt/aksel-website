export default {
  title: "Komponent interaskjoner (UU)",
  name: "uu_interaction",
  type: "object",
  fields: [
    {
      name: "title",
      title: "Tittel",
      type: "string",
      /* validation: (Rule) => Rule.required(), */
    },
    {
      title: "Fokus håndtering",
      name: "uu_interaction_focus",
      type: "image",
    },
    {
      title: "Mus håndtering",
      name: "uu_interaction_mouse",
      type: "image",
    },
    {
      title: "Keyboard håndtering",
      name: "uu_interaction_keyboard",
      type: "array",
      of: [{ type: "uu_interaction.keyboard" }],
    },
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare: ({ title }) => ({ title: "UU interaksjoner " + title }),
  },
};

export const keyboardTable = {
  title: "Keyboard tabell",
  name: "uu_interaction.keyboard",
  type: "object",
  fields: [
    {
      name: "command",
      title: "Kommando",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      title: "Beskrivelse",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
  ],
};
