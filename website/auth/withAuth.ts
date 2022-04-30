import {
  GetServerSidePropsContext,
  /* NextApiRequest,
  NextApiResponse, */
} from "next";
/* import { GetServerSidePropsPrefetchResult } from "../shared/types"; */
/* import { getEnv, isDevOrDemo } from "../utils/env"; */

type PageHandler = (context: GetServerSidePropsContext) => Promise<any>;

export interface TokenPayload {
  sub: string;
  iss: string;
  client_amr: string;
  pid: string;
  token_type: string;
  client_id: string;
  acr: string;
  scope: string;
  exp: string;
  iat: string;
  client_orgno: string;
  jti: string;
  consumer: {
    authority: string;
    ID: string;
  };
}

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

    const bearerToken: string | null | undefined =
      request.headers["authorization"];

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

    return handler({ ...context, params: { token: bearerToken ?? "" } });
  };
}
