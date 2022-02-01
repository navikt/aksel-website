export function documentMetadata() {
  return [
    {
      title: "Redaktør/kontakt",
      name: "contact",
      type: "reference",
      to: [{ type: "editor" }],
      group: "metadata",
    },
    {
      title: "Bidragsytere",
      description: "Legg til de som har bidratt med denne siden!",
      name: "contributors",
      type: "array",
      of: [{ type: "reference", to: [{ type: "editor" }] }],
      group: "metadata",
    },
  ];
}
