import createSchema from "part:@sanity/base/schema-creator";
import schemaTypes from "all:part:@sanity/base/schema-type";

import frontpage from "./documents/frontpage";
import blockContent from "./documents/blockContent";
import ds_page from "./documents/ds/ds-page";
import ds_frontpage from "./documents/ds/ds-frontpage";
import RefLinkPanel from "./objects/RefLinkPanel";
import CodeExample from "./objects/components/code";
import nav from "./documents/nav/nav";
import navLink from "./documents/nav/navLink";
import navSection from "./documents/nav/section";
import free_block from "./objects/block";
import prop_table from "./objects/components/proptable/Proptable";
import prop from "./objects/components/proptable/Prop";
import changelog from "./objects/components/changelog/Changelog";
import change from "./objects/components/changelog/Change";
import page_builder from "./objects/pagebuilder";
import designsystem_component_page from "./documents/ds/ds-component-page";
import component_versions from "./documents/versions";

export default createSchema({
  name: "default",
  types: schemaTypes.concat([
    CodeExample,
    frontpage,
    blockContent,
    ds_page,
    ds_frontpage,
    RefLinkPanel,
    nav,
    navLink,
    navSection,
    free_block,
    prop_table,
    prop,
    changelog,
    change,
    page_builder,
    designsystem_component_page,
    component_versions,
  ]),
});
