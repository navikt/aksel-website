import { getExpireDates } from "../../config";

export function documentDefaults(docType) {
  const dates = getExpireDates(docType);
  return {
    title: "Side informasjon",
    name: "metadata",
    type: "document",
    fields: [
      {
        title: "Oppdatering av innhold",
        name: "updates",
        type: "document",
        fields: [
          {
            name: "last_update",
            title: "Sist oppdatert",
            type: "date",
            initialValue: new Date().toISOString().split("T")[0],
            readOnly: true,
          },
          {
            name: "stagnant",
            title: "Stagnert",
            type: "date",
            initialValue: dates[0].toISOString().split("T")[0],
            readOnly: true,
            hidden: true,
          },
          {
            name: "expired",
            title: "Expired",
            type: "date",
            initialValue: dates[1].toISOString().split("T")[0],
            readOnly: true,
          },
        ],
        options: {
          columns: 2, // Defines a grid for the fields and how many columns it should have
        },
      },
      {
        title: "Kontaktperson",
        description: "Linker dokumentet til en person (bare internt i sanity)",
        name: "contact",
        type: "reference",
        validation: (Rule) => Rule.required(),
        to: [{ type: "contact_person" }],
      },
      {
        title: "Dokument type",
        name: "doctype",
        type: "string",
        initialValue: docType,
        readOnly: true,
        hidden: true,
      },
    ],
    options: {
      collapsible: true, // Makes the whole fieldset collapsible
      collapsed: false, // Defines if the fieldset should be collapsed by default or not
      columns: 1, // Defines a grid for the fields and how many columns it should have
    },
  };
}
