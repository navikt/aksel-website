import { createConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { media } from "sanity-plugin-media";
import * as Aksel from "./schemas/documents/aksel";
import * as Designsystem from "./schemas/documents/designsystem";
import v2Blocks from "./schemas/modules";
import editors from "./schemas/documents/editors";
import navigation, { dropdown, link } from "./schemas/documents/navigation";
import frontpage from "./schemas/documents/frontpage";

export default createConfig({
  name: "default",
  title: "Aksel",
  projectId: "hnbe3yhs",
  dataset: "production",

  plugins: [deskTool(), media()],

  schema: {
    types: [],
  },
});
