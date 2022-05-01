import { errors, jwtVerify } from "jose";
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

export const tokenIsValid = async (accessToken: string): Promise<void> => {
  try {
    await jwtVerify(accessToken, JSON.parse(appJWK), {
      audience: clientId,
      issuer: issuer,
    });
    return Promise.resolve();
  } catch (error) {
    let feilmelding: string;
    if (error instanceof errors.JWTExpired) {
      feilmelding = "Token har utløpt";
    } else if (error instanceof errors.JWTInvalid) {
      feilmelding = "Payload i tokenet må være gyldig JSON!";
    } else if (error instanceof errors.JWTClaimValidationFailed) {
      feilmelding = `Token mottatt har ugyldig claim ${error.claim}`;
    } else {
      feilmelding = JSON.stringify({
        code: error?.code ?? "",
        message: error?.message ?? "",
      });
    }
    return Promise.reject(new Error(feilmelding));
  }
};
