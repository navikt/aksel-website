import { block, headingStyles } from "./riktekst";

export default {
  title: "Riktekst",
  name: "riktekst_bilde_enkel",
  type: "array",
  of: [
    {
      ...block,
    },
    { type: "bilde" },
  ],
};
