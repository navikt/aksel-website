import createSchema from "part:@sanity/base/schema-creator";
import schemaTypes from "all:part:@sanity/base/schema-type";

import frontpage from "./documents/frontpage";
import blockContent from "./documents/blockContent";
import ds_page from "./documents/ds/ds-page";
import ds_frontpage from "./documents/ds/ds-frontpage";
import RefLinkPanel from "./objects/RefLinkPanel";
import CodeExample from "./objects/components/Code";
import nav from "./documents/nav/nav";
import navLink from "./documents/nav/navLink";
import navSection from "./documents/nav/section";
import free_block from "./objects/block";

export default createSchema({
  name: "default",
  types: schemaTypes.concat([
    frontpage,
    blockContent,
    ds_page,
    ds_frontpage,
    RefLinkPanel,
    CodeExample,
    nav,
    navLink,
    navSection,
    free_block,
  ]),
});
