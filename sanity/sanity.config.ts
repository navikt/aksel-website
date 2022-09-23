import { createConfig, isDev } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import { media } from "sanity-plugin-media";
import { unsplashImageAsset } from "sanity-plugin-asset-source-unsplash";
import { dashboardTool } from "@sanity/dashboard";
import { documentListWidget } from "sanity-plugin-dashboard-widget-document-list";

import * as Aksel from "./schemas/documents/aksel";
import * as Designsystem from "./schemas/documents/designsystem";
import v2Blocks from "./schemas/modules";
import editors from "./schemas/documents/editors";
import navigation, { dropdown, link } from "./schemas/documents/navigation";
import frontpage from "./schemas/documents/frontpage";
import test from "./schemas/documents/testdoc";

const devOnlyPlugins = [
  visionTool({
    defaultDataset: "development",
  }),
];

export default createConfig({
  name: "default",
  title: "Aksel",
  projectId: "hnbe3yhs",
  dataset: "development",

  plugins: [
    deskTool(),
    media(),
    unsplashImageAsset(),
    dashboardTool({
      widgets: [documentListWidget({})],
    }),
    ...(isDev ? devOnlyPlugins : []),
  ],

  schema: {
    types: [test],
  },
});
