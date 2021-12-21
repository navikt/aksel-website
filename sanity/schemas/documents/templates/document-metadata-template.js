import LastUpdate from "../../../components/last-update";

export function documentMetadata(docType) {
  return {
    title: "Dokument-info",
    name: "metadata",
    type: "object",
    fields: [
      {
        title: "Oppdatering av innhold",
        name: "last_update",
        type: "string",
        initialValue: new Date().toISOString().split("T")[0],
        inputComponent: LastUpdate,
      },
      {
        title: "Redaktør",
        name: "contact",
        type: "reference",
        to: [{ type: "editor" }],
      },
      {
        title: "Redaktør/Kontakt",
        name: "contacts",
        type: "reference",
        to: [{ type: "editor" }],
      },
      {
        title: "Bidragsytere",
        description: "Legg til de som har bidratt med denne siden!",
        name: "contributors",
        type: "array",
        of: [{ type: "reference", to: [{ type: "editor" }] }],
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
  };
}
