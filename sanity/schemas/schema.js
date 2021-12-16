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
import block_content from "./block-content";
import block_content_simple from "./block-content-simple";
import code_example, { example } from "./documents/designsystem/code-example";
import code_snippet from "./objects/code-snippet";
import code_example_ref from "./objects/code-example-ref";
import codeSandboxRef from "./objects/code-sandbox-ref";
import codeSandbox from "./documents/designsystem/code-sandbox";
import color_category_ref from "./objects/color-ref";

import prop_table, { prop } from "./objects/proptable";
import do_dont, { doDont } from "./objects/do-dont";
import uu_interactions, { keyboardTable } from "./objects/uu-interaction";
import picture from "./objects/image";
import picture_text from "./objects/image-with-text";
import alert from "./objects/alert";
import accordion from "./objects/accordion";
import link_panel from "./objects/link-panel";
import icon_search from "./objects/uniques/ikonsok";
import component_overview from "./objects/overview-ref";
import spacing from "./objects/spacing";
import relatedPages from "./objects/related-pages";
import table, { Rows, Cells } from "./objects/table";
import tips from "./objects/tips";

export default createSchema({
  name: "default",
  types: schemaTypes.concat([
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
    code_snippet,
    code_example_ref,
    codeSandboxRef,
    codeSandbox,
    color_category_ref,
    example,
    block_content,
    block_content_simple,
    gp_block_content,
    prop_table,
    prop,
    changelog,
    do_dont,
    doDont,
    editors,
    uu_interactions,
    keyboardTable,
    picture,
    picture_text,
    alert,
    accordion,
    link_panel,
    navigation,
    link,
    dropdown,
    icon_search,
    component_overview,
    spacing,
    relatedPages,
    table,
    Cells,
    Rows,
    tips,
  ]),
});
