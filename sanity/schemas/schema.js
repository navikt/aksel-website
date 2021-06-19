import createSchema from "part:@sanity/base/schema-creator";
import schemaTypes from "all:part:@sanity/base/schema-type";

/* import nav from "./documents/nav/nav";
import navLink from "./documents/nav/navLink";
import navSection from "./documents/nav/section"; */
import blockContent from "./documents/blockContent";
import simple_block_content from "./documents/simpleBlockContent";
import codeExample from "./objects/components/code/code-example";
import portable_block from "./objects/block";
import prop_table from "./objects/components/proptable/Proptable";
import prop from "./objects/components/proptable/Prop";
import changelog from "./objects/components/changelog/Changelog";
import change from "./objects/components/changelog/Change";
import designsystem_component_page from "./documents/ds/ds-component-page";
import component_versions from "./documents/versions";
import do_dont from "./objects/components/do-dont/do-dont";
import page_linker from "./objects/pagelinker";

export default createSchema({
  name: "default",
  types: schemaTypes.concat([
    codeExample,
    blockContent,
    simple_block_content,
    portable_block,
    prop_table,
    prop,
    changelog,
    change,
    designsystem_component_page,
    component_versions,
    do_dont,
    page_linker,
  ]),
});
