import { getExpireDates } from "../../../config";
import LastUpdate from "../../../components/last-update";

export function documentMetadata(docType) {
  const dates = getExpireDates(docType);
  return {
    title: "Ekstra informasjon (brukes bare internt i Sanity)",
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
        title: "Kontaktperson",
        description:
          "Linker dokumentet til en person, slik at man kan lettere ta kontakt hvis noe oppstår",
        name: "contact",
        type: "reference",
        to: [{ type: "editor" }],
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
