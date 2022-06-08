import createSchema from "part:@sanity/base/schema-creator";
import schemaTypes from "all:part:@sanity/base/schema-type";

/* Schemas */
/* Documents */
import team from "./documents/team";
import editors from "./documents/editors";
import navigation, { dropdown, link } from "./documents/navigation";
import frontpage from "./documents/frontpage";

import * as Designsystem from "./documents/designsystem";
import * as Aksel from "./documents/aksel";
import * as SanityModules from "./old-template";
import * as RichText from "./old-template/rich-text";
import introduction from "./documents/introduction";
import v2Blocks from "./modules";

export default createSchema({
  name: "default",
  types: schemaTypes.concat([
    ...v2Blocks,
    frontpage,
    team,
    editors,
    navigation,
    link,
    dropdown,
    introduction,

    /* Gammel template, fjernets etterhvert */
    SanityModules.Alert,
    SanityModules.CodeExampleRef,
    SanityModules.CodeSandboxRef,
    SanityModules.CodeSnippet,
    SanityModules.DoDont,
    SanityModules.doDont,
    SanityModules.Image,
    SanityModules.PropTable,
    RichText.BlockContent,

    Designsystem.Color,
    Designsystem.ds_header_heading,
    Designsystem.CodeExamples,
    Designsystem.example,
    Designsystem.CodeSandboxes,
    Designsystem.ColorCategories,
    Designsystem.Tokens,
    Designsystem.Props,
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
    Aksel.Blogg,
    Aksel.Tema,
    Aksel.Prinsipp,
  ]),
});
