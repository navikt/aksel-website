import { jwtVerify } from "jose";
import getConfig from "next/config";
/* import { Client, Issuer } from "openid-client"; */

const { serverRuntimeConfig } = getConfig();

/* const discoveryUrl = serverRuntimeConfig.azureAppWellKnownUrl; */
const clientId = serverRuntimeConfig.azureAppClientId;
const appJWK = serverRuntimeConfig.azureAppJWK;
const issuer = serverRuntimeConfig.azureAppIssuer;

/* let azureAdIssuer: Issuer<Client>; */

/* export const discoverAzureAdIssuer = async () => {
  if (discoveryUrl) {
    azureAdIssuer = await Issuer.discover(discoveryUrl);
  } else {
    throw Error(
      `serverRuntimeConfig.azureAppWellKnownUrl "AZURE_APP_WELL_KNOWN_URL" må være definert`
    );
  }
}; */

export const tokenIsValid = async (token: string) => {
  try {
    /* if (!azureAdIssuer) {
      await discoverAzureAdIssuer();
    } */

    const verification = await jwtVerify(token, appJWK, {
      algorithms: ["RS256"],
      audience: clientId,
      issuer,
    });

    return !!verification.payload;
  } catch (e) {
    return e;
  }
};
