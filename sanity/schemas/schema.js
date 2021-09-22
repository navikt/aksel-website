import createSchema from "part:@sanity/base/schema-creator";
import schemaTypes from "all:part:@sanity/base/schema-type";

/* Schemas */
/* Documents */
import metadata from "./documents/admin/metadata";
import editors from "./documents/editors";
import navigation, { dropdown, link } from "./documents/navigation";
import changelog from "./documents/designsystem/changelog";
/*--  Designsystem */
import designsystem_component_page from "./documents/designsystem/ds-component-page";
import designsystem_article_page from "./documents/designsystem/ds-article-page";
import designsystem_tabbed_article_page from "./documents/designsystem/ds-tabbed-article-page";
import designsystem_frontpage from "./documents/designsystem/ds-frontpage";
/*--  God Praksis */
import god_praksis_article_page from "./documents/god-praksis/gp-article-page";
import god_praksis_frontpage from "./documents/god-praksis/gp-frontpage";
/*--  Admin */
import vk_frontpage from "./documents/admin/frontpage";

/*  Components */
import block_content from "./block-content";
import block_content_simple from "./block-content-simple";
import code_example, { example } from "./objects/code-example";
import prop_table, { prop } from "./objects/proptable";
import do_dont, { doDont } from "./objects/do-dont";
import linker, { links } from "./objects/linker";
import uu_interactions, { keyboardTable } from "./objects/uu-interaction";
import picture from "./objects/image";
import alert from "./objects/alert";

export default createSchema({
  name: "default",
  types: schemaTypes.concat([
    designsystem_component_page,
    designsystem_article_page,
    designsystem_tabbed_article_page,
    designsystem_frontpage,
    god_praksis_article_page,
    god_praksis_frontpage,
    vk_frontpage,
    code_example,
    example,
    block_content,
    block_content_simple,
    prop_table,
    prop,
    changelog,
    do_dont,
    doDont,
    linker,
    links,
    editors,
    uu_interactions,
    keyboardTable,
    picture,
    alert,
    navigation,
    link,
    dropdown,
    metadata,
  ]),
});
