import { SanityCodegenConfig } from "sanity-codegen";

const config: SanityCodegenConfig = {
  schemaPath: "./schemas/schema.ts",
  outputPath: "../website/lib/types/autogen-types.ts",
};

export default config;
