import createSchema from "part:@sanity/base/schema-creator";
import schemaTypes from "all:part:@sanity/base/schema-type";

/* Schemas */
/* Documents */
import metadata from "./documents/admin/metadata";
import editors from "./documents/editors";
import navigation, { dropdown, link } from "./documents/navigation";
import changelog from "./documents/designsystem/changelog";
import feedback from "./documents/feedback";
/*--  Designsystem */
import designsystem_component_page from "./documents/designsystem/ds-component-page";
import designsystem_article_page from "./documents/designsystem/ds-article-page";
import designsystem_tabbed_article_page from "./documents/designsystem/ds-tabbed-article-page";
import designsystem_frontpage from "./documents/designsystem/ds-frontpage";
import designsystem_navigation, {
  ds_header_heading,
} from "./documents/designsystem/navigation";
/*--  God Praksis */
import god_praksis_article_page from "./documents/god-praksis/gp-article-page";
import god_praksis_frontpage from "./documents/god-praksis/gp-frontpage";
import gp_block_content from "./documents/god-praksis/gp-block-content";
import gp_situations from "./documents/god-praksis/gp-situations";
/*--  Admin */
import vk_frontpage from "./documents/admin/frontpage";

/*  Components */
import block_content from "./block-content";
import block_content_simple from "./block-content-simple";
import code_example, { example } from "./documents/designsystem/code-example";
import code_snippet from "./objects/code-snippet";
import code_example_ref from "./objects/code-example-ref";

import prop_table, { prop } from "./objects/proptable";
import do_dont, { doDont } from "./objects/do-dont";
import uu_interactions, { keyboardTable } from "./objects/uu-interaction";
import picture from "./objects/image";
import alert from "./objects/alert";
import figma_embed from "./objects/figma-embed";
import link_panel from "./objects/link-panel";

export default createSchema({
  name: "default",
  types: schemaTypes.concat([
    designsystem_component_page,
    designsystem_article_page,
    designsystem_tabbed_article_page,
    designsystem_frontpage,
    designsystem_navigation,
    ds_header_heading,
    god_praksis_article_page,
    god_praksis_frontpage,
    gp_situations,
    vk_frontpage,
    code_example,
    code_snippet,
    code_example_ref,
    example,
    block_content,
    block_content_simple,
    gp_block_content,
    prop_table,
    prop,
    changelog,
    feedback,
    do_dont,
    doDont,
    editors,
    uu_interactions,
    keyboardTable,
    picture,
    alert,
    figma_embed,
    link_panel,
    navigation,
    link,
    dropdown,
    metadata,
  ]),
});
