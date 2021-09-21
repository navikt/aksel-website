import createSchema from "part:@sanity/base/schema-creator";
import schemaTypes from "all:part:@sanity/base/schema-type";

/* Schemas */
/* Documents */
import metadata from "./documents/admin/metadata";
import editors from "./documents/editors";
import navigation, { dropdown, link } from "./documents/navigation";
/*--  Designsystem */
import designsystem_component_page from "./documents/designsystem/ds-component-page";
import designsystem_article_page from "./documents/designsystem/ds-article-page";
import designsystem_tabbed_article_page from "./documents/designsystem/ds-tabbed-article-page";
/*--  God Praksis */
import god_praksis_article_page from "./documents/god-praksis/gp-article-page";
/*--  Admin */

/*  Components */
import block_content from "./block-content";
import code_example, { example } from "./objects/code-example";
import prop_table, { prop } from "./objects/proptable";
import changelog, { change } from "./objects/changelog";
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
    god_praksis_article_page,
    code_example,
    example,
    block_content,
    prop_table,
    prop,
    changelog,
    change,
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
