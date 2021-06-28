export default {
  title: "Komponent interaskjoner (UU)",
  name: "uu_interaction",
  type: "object",
  fields: [
    {
      title: "Fokus håndtering",
      name: "uu_interaction_focus",
      type: "blockContent",
    },
    {
      title: "Mus håndtering",
      name: "uu_interaction_mouse",
      type: "blockContent",
    },
    {
      title: "Keyboard håndtering",
      name: "uu_interaction_keyboard",
      type: "array",
      of: [{ type: "uu_interaction.keyboard" }],
    },
  ],
  preview: {
    prepare: () => ({ title: "UU interaksjoner" }),
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
      type: "blockContent",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      title: "Beskrivelse",
      type: "blockContent",
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    prepare: () => ({ title: "Interaksjon" }),
  },
};
