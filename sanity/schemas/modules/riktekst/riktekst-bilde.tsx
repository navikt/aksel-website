import { block, headingStyles } from "./riktekst";

export default {
  title: "Riktekst",
  name: "riktekst_bilde",
  type: "array",
  of: [
    {
      ...block,
      styles: [...headingStyles],
    },
    { type: "bilde" },
  ],
};
