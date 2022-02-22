import { block } from "./riktekst";

export default {
  title: "Riktekst",
  name: "riktekst_tabell",
  type: "array",
  of: [
    {
      ...block,
      marks: {
        ...block.marks,
        annotations: block.marks.annotations.filter(
          (x) => x.name !== "internalLink"
        ),
      },
    },
  ],
};
