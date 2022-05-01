import { errors, importJWK, jwtVerify } from "jose";
import { GetServerSidePropsContext } from "next";
import getConfig from "next/config";
import { tokenIsValid } from "./azure";
/* import { Azure } from "./azure"; */
/* import { GetServerSidePropsPrefetchResult } from "../shared/types"; */
/* import { getEnv, isDevOrDemo } from "../utils/env"; */

type PageHandler = (context: GetServerSidePropsContext) => Promise<any>;

export interface Jwk {
  use: string;
  kty: string;
  kid: string;
  n: string;
  e: string;
  d: string;
  p: string;
  q: string;
  dp: string;
  dq: string;
  qi: string;
  x5c: string[];
  x5t: string;
  "x5t#S256": string;
}

const { serverRuntimeConfig } = getConfig();

/**
 * Used to authenticate Next.JS pages. Assumes application is behind
 * Wonderwall (https://doc.nais.io/security/auth/idporten/sidecar/). Will automatically redirect to login if
 * Wonderwall-cookie is missing.
 *
 */
export function withAuthenticatedPage(
  handler: PageHandler = async () => ({ props: {} })
) {
  return async function withBearerTokenHandler(
    context: GetServerSidePropsContext
  ): Promise<ReturnType<NonNullable<typeof handler>>> {
    /* if (isDevOrDemo) {
      return handler({ ...context, params: { token: bearerToken } });
    } */

    const request = context.req;

    if (request == null) {
      throw new Error("Context is missing request. This should not happen");
    }

    const bearerToken = getBearerToken(request);

    if (!bearerToken) {
      console.log("No bearer token");
      return handler({ ...context, params: { token: bearerToken ?? "" } });
    }

    const clientId = serverRuntimeConfig.azureAppClientId;
    const appJWK = serverRuntimeConfig.azureAppJWK;
    const issuer = serverRuntimeConfig.azureAppIssuer;
    const jwksUri = serverRuntimeConfig.azureJwksUri;

    try {
      await tokenIsValid(bearerToken);
      return handler({
        ...context,
        params: {
          token: bearerToken ?? "",
          valid: "true",
          clientId,
          appJWK: JSON.stringify(JSON.parse(appJWK)),
          jwksUri: jwksUri,
          issuer,
        },
      });
    } catch (e) {
      return handler({
        ...context,
        params: {
          token: bearerToken ?? "",
          valid: "false",
          clientId,
          appJWK: JSON.stringify(JSON.parse(appJWK)),
          jwksUri: jwksUri,
          issuer,
          error: e.message,
        },
      });
    }
  };
}

export function getBearerToken(req) {
  return req.headers?.authorization?.substring("Bearer ".length);
}
