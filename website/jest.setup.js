// jest.setup.js
import { setConfig } from "next/config";
import config from "./next.config";
import "@testing-library/jest-dom/extend-expect";

// Make sure you can use "publicRuntimeConfig" within tests.
setConfig(config);
