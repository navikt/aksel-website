import createSchema from "part:@sanity/base/schema-creator";
import schemaTypes from "all:part:@sanity/base/schema-type";

/* Schemas */
/* Documents */
import editors from "./documents/editors";
import navigation, { dropdown, link } from "./documents/navigation";
import frontpage from "./documents/frontpage";

import * as Designsystem from "./documents/designsystem";
import * as Aksel from "./documents/aksel";
import * as SanityModules from "./sanity-modules";
import * as RichText from "./rich-text";
import introduction from "./documents/introduction";
import v2Blocks from "./v2";

export default createSchema({
  name: "default",
  types: schemaTypes.concat([
    ...v2Blocks,
    frontpage,
    editors,
    navigation,
    link,
    dropdown,
    introduction,

    SanityModules.Accordion,
    SanityModules.Alert,
    SanityModules.CodeExampleRef,
    SanityModules.CodeSandboxRef,
    SanityModules.CodeSnippet,
    SanityModules.ColorRef,
    SanityModules.Changelogs,
    SanityModules.DoDont,
    SanityModules.doDont,
    SanityModules.IkonSok,
    SanityModules.Image,
    SanityModules.ImageWithText,
    SanityModules.LinkPanel,
    SanityModules.OverviewRef,
    SanityModules.PropTable,
    SanityModules.prop,
    SanityModules.RelatedPages,
    SanityModules.Spacing,
    SanityModules.Table,
    SanityModules.Cells,
    SanityModules.Rows,
    SanityModules.Tips,
    RichText.BlockContent,
    RichText.BlockContentAccordion,
    RichText.BlockContentSimple,
    RichText.IconDecorator,

    Designsystem.Color,
    Designsystem.ds_header_heading,
    Designsystem.Changelog,
    Designsystem.CodeExamples,
    Designsystem.example,
    Designsystem.CodeSandboxes,
    Designsystem.ColorCategories,
    Designsystem.ComponentPage,
    Designsystem.ComponentTemplate,
    Designsystem.Frontpage,
    Designsystem.MainCategories,
    Designsystem.Navigation,
    Designsystem.Overview,
    Designsystem.Package,
    Designsystem.KomponentArtikkel,
    Designsystem.Artikkel,

    Aksel.Artikkel,
  ]),
});
