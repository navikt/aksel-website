import createSchema from "part:@sanity/base/schema-creator";
import schemaTypes from "all:part:@sanity/base/schema-type";

/* Schemas */
import block_content from "./block-content";
import code_example from "./objects/code-example";
import prop_table, { prop } from "./objects/proptable";
import changelog, { change } from "./objects/changelog";
import designsystem_component_page from "./documents/ds/ds-component-page";
import component_versions from "./documents/versions";
import do_dont, { doDont } from "./objects/do-dont";
import page_linker from "./objects/pagelinker";
import persons from "./documents/persons";
import uu_interactions, { keyboardTable } from "./objects/uu-interaction";

export default createSchema({
  name: "default",
  types: schemaTypes.concat([
    code_example,
    block_content,
    prop_table,
    prop,
    changelog,
    change,
    designsystem_component_page,
    component_versions,
    do_dont,
    doDont,
    page_linker,
    persons,
    uu_interactions,
    keyboardTable,
  ]),
});
