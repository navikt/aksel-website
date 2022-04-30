/* export const envVars = {
  azureAppClientId: "AZURE_APP_CLIENT_ID",
  azureOpenidConfigTokenEndpoint: "AZURE_OPENID_CONFIG_TOKEN_ENDPOINT",
  azureAppClientSecret: "AZURE_APP_CLIENT_SECRET",
  azureOpenidConfigIssuer: "AZURE_OPENID_CONFIG_ISSUER",
  jwkUri: "AZURE_OPENID_CONFIG_JWKS_URI",
  appJwk: "AZURE_APP_JWK",
};

const getEnvVar = (name: string) => {
  if (!process.env[name]) throw new Error(`Missing required variable ${name}`);
  return process.env[name];
};

export const Azure = {
  clientId: getEnvVar(envVars.azureAppClientId),
  tokenEndpoint: getEnvVar(envVars.azureOpenidConfigTokenEndpoint),
  clientSecret: getEnvVar(envVars.azureAppClientSecret),
  issuer: getEnvVar(envVars.azureOpenidConfigIssuer),
  jwkUri: getEnvVar(envVars.jwkUri),
  appJwk: getEnvVar(envVars.appJwk),
};
 */

export const dummy = "";
