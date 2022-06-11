import { setConfig } from "next/config";
import "../styles/index.css";
import React from "react";
setConfig({
  serverRuntimeConfig: {
    azureAppClientId: "5b300b41-f042-4851-8454-37f3274c6252",
    azureJwksUri: "5b300b41-f042-4851-8454-37f3274c6252",
    azureAppIssuer: "5b300b41-f042-4851-8454-37f3274c6252",
    azureAppWellKnownUrl: "5b300b41-f042-4851-8454-37f3274c6252",
    azureAppJWK: "5b300b41-f042-4851-8454-37f3274c6252",
  },
});

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => (
    <div id="#__next">
      <Story />
    </div>
  ),
];
