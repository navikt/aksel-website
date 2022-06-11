/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
// jest.config.js
const nextJest = require("next/jest");
const { pathsToModuleNameMapper } = require("ts-jest/utils");
const { compilerOptions } = require("./tsconfig");

const createJestConfig = nextJest({
  dir: "./",
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testEnvironment: "node",
  modulePathIgnorePatterns: ["cypress", "mockdata.ts"],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>/",
  }),
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
