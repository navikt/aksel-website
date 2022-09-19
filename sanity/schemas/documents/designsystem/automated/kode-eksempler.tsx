/* import { ExampleKeys } from "website/component-examples"; */

export default {
  title: "Dir/filnavn for kode eksempler",
  name: "kode_eksempler_fil",
  type: "document",
  fields: [
    {
      title: "Tittel",
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
      readOnly: true,
    },
    {
      title: "Toggle om eksemplet er et dir eller filnavn",
      name: "dir",
      type: "boolean",
      validation: (Rule) => Rule.required(),
      initialValue: false,
      readOnly: true,
    },
  ],
  preview: {
    select: {
      title: "title",
      dir: "dir",
    },
    prepare(selection) {
      const { title, dir } = selection;
      return {
        title: title,
        subtitle: dir ? "Alle kode-eksempler" : "Spesifikt kode-eksempel",
        media: () => "</>",
      };
    },
  },
};
