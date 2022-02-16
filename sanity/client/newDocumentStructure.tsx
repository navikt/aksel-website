import S from "@sanity/base/structure-builder";

const docTypes = [
  {
    name: "ds_article_page",
    title: "Artikkel Designsystemet",
    desc: "Atikkel som legges under designsystemet",
  },
  {
    name: "komponent_artikkel_template",
    title: "BETA: Komponentside (ny struktur)",
    desc: "Atikkel som legges under designsystemet",
  },
  {
    name: "gp_article_page",
    title: "Artikkel Aksel",
    desc: "Atikkel som legges under god-praksis(wip)",
  },
  {
    name: "ds_changelog",
    title: "Changelog DS",
    desc: "Ny changelog for designsystemet",
  },
  {
    name: "newEditor",
    title: "Bruker/redaktør",
    desc: "Lager en psuedo-bruker for deg som kan koble artikler til brukeren",
  },
];

export default [
  ...docTypes.map((doct) =>
    S.initialValueTemplateItem(doct.name)
      .id(`doc-${doct.name}`)
      .title(doct.title)
      .templateId(doct.name)
      .description(doct?.desc ?? "")
  ),
  /* ...S.defaultInitialValueTemplateItems() */
];
