import createSchema from "part:@sanity/base/schema-creator";
import schemaTypes from "all:part:@sanity/base/schema-type";

/* Schemas */
/* Documents */
import editors from "./documents/editors";
import navigation, { dropdown, link } from "./documents/navigation";
import changelog from "./documents/designsystem/changelog";
/*--  Designsystem */
import designsystem_component_page from "./documents/designsystem/ds-component-page";
import designsystem_article_page from "./documents/designsystem/ds-article-page";
import designsystem_tabbed_article_page from "./documents/designsystem/ds-tabbed-article-page";
import designsystem_frontpage from "./documents/designsystem/ds-frontpage";
import designsystem_packages from "./documents/designsystem/packages";
import designsystem_navigation, {
  ds_header_heading,
} from "./documents/designsystem/navigation";
import ds_component_overview from "./documents/designsystem/overview";
import ds_color_categories, {
  Color,
} from "./documents/designsystem/color-categories";
/*--  God Praksis */
import god_praksis_article_page from "./documents/god-praksis/gp-article-page";
import god_praksis_frontpage from "./documents/god-praksis/gp-frontpage";
import gp_block_content from "./documents/god-praksis/gp-block-content";
import gp_situations from "./documents/god-praksis/gp-situations";

/*  Components */

import code_example, { example } from "./documents/designsystem/code-example";
import codeSandbox from "./documents/designsystem/code-sandbox";

import mainCategories from "./documents/designsystem/main-categories";
import frontpage from "./documents/frontpage";

import * as SanityModules from "./sanity-modules";
import * as RichText from "./rich-text";

export default createSchema({
  name: "default",
  types: schemaTypes.concat([
    SanityModules.Accordion,
    SanityModules.Alert,
    SanityModules.CodeExampleRef,
    SanityModules.CodeSandboxRef,
    SanityModules.CodeSnippet,
    SanityModules.ColorRef,
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

    frontpage,
    mainCategories,
    designsystem_component_page,
    designsystem_article_page,
    designsystem_tabbed_article_page,
    designsystem_frontpage,
    designsystem_navigation,
    designsystem_packages,
    ds_header_heading,
    ds_component_overview,
    ds_color_categories,
    Color,
    god_praksis_article_page,
    god_praksis_frontpage,
    gp_situations,
    code_example,
    codeSandbox,
    example,
    gp_block_content,
    changelog,
    editors,
    navigation,
    link,
    dropdown,
  ]),
});
