import { errors, jwtVerify } from "jose";
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
      /* return {
                redirect: {
                    destination: `/oauth2/login?redirect=${getEnv('NEXT_PUBLIC_BASE_PATH')}${
                        context.resolvedUrl ?? ''
                    }`,
                    permanent: false,
                },
            }; */
    }

    return handler({
      ...context,
      params: {
        token: bearerToken ?? "",
        valid: JSON.stringify(await tokenIsValid(bearerToken)),
      },
    });
    /* try {
      await validerAccessToken(bearerToken);
    } catch (error) {
      return handler({
        ...context,
        params: {
          token: bearerToken ?? "",
          validated: "no",
          error: JSON.stringify(error),
        },
      });
    } */
  };
}

export function getBearerToken(req) {
  return req.headers?.authorization?.substring("Bearer ".length);
}

/* export const validerAccessToken = (accessToken: string): Promise<void> => {
  const options = {
    algorithms: ["RS256"],
    audience: Azure.clientId,
    issuer: Azure.issuer,
  };
  return jwtVerify(accessToken, JSON.parse(Azure.appJwk), options)
    .then(() => Promise.resolve())
    .catch((error) => {
      let feilmelding: string;
      if (error instanceof errors.JWTExpired) {
        feilmelding = "Token har utløpt";
      } else if (error instanceof errors.JWTInvalid) {
        feilmelding = "Payload i tokenet må være gyldig JSON!";
      } else if (error instanceof errors.JWTClaimValidationFailed) {
        feilmelding = `Token mottatt har ugyldig claim ${error.claim}`;
      } else {
        feilmelding = "Tokenet er ikke gyldig";
      }
      return Promise.reject(new Error(feilmelding));
    });
};
 */
