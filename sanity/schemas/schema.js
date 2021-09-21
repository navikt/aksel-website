import createSchema from "part:@sanity/base/schema-creator";
import schemaTypes from "all:part:@sanity/base/schema-type";

/* Schemas */
import block_content from "./block-content";
import code_example, { example } from "./objects/code-example";
import prop_table, { prop } from "./objects/proptable";
import changelog, { change } from "./objects/changelog";
import designsystem_component_page from "./documents/designsystem/ds-component-page";
import designsystem_article_page from "./documents/designsystem/ds-article-page";
import designsystem_tabbed_article_page from "./documents/designsystem/ds-tabbed-article-page";
import component_versions from "./documents/versions";
import do_dont, { doDont } from "./objects/do-dont";
import linker, { links } from "./objects/linker";
import persons from "./documents/persons";
import uu_interactions, { keyboardTable } from "./objects/uu-interaction";
import picture from "./objects/image";
import alert from "./objects/alert";
import navigation, { dropdown, link, LinkTitle } from "./documents/navigation";
import metadata from "./documents/metadata";

export default createSchema({
  name: "default",
  types: schemaTypes.concat([
    designsystem_component_page,
    designsystem_article_page,
    designsystem_tabbed_article_page,
    code_example,
    example,
    block_content,
    prop_table,
    prop,
    changelog,
    change,
    component_versions,
    do_dont,
    doDont,
    linker,
    links,
    persons,
    uu_interactions,
    keyboardTable,
    picture,
    alert,
    navigation,
    link,
    dropdown,
    LinkTitle,
    metadata,
  ]),
});
