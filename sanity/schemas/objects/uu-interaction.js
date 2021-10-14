export default {
  title: "Komponent interaskjoner",
  name: "uu_interaction",
  type: "object",
  fields: [
    {
      title: "Fokus håndtering (optional)",
      name: "focus",
      type: "blockContent_simple",
    },
    {
      title: "Mus håndtering (optional)",
      name: "mouse",
      type: "blockContent_simple",
    },
    {
      title: "Keyboard håndtering (optional)",
      name: "keyboard",
      type: "array",
      description: "Liste med interaksjoner som rendres i en tabell",
      of: [{ type: "uu_interaction_keyboard" }],
    },
    {
      title: "Skjermleser (optional)",
      name: "screen_reader",
      type: "blockContent_simple",
    },
  ],
  preview: {
    prepare: () => ({ title: "UU interaksjoner" }),
  },
};

export const keyboardTable = {
  title: "Keyboard tabell",
  name: "uu_interaction_keyboard",
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
