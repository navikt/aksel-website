import S from "@sanity/base/structure-builder";
const docTypes = [
  {
    name: "ds_component_page_template",
    title: "Komponentside",
    desc: "Komponentspesifikk artikkel for designsystemet",
  },
  {
    name: "ds_article_page",
    title: "Artikkel Designsystemet",
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
