import { GetServerSidePropsContext } from "next";
import { tokenIsValid } from "./azure";

export function getBearerToken(req) {
  return req.headers?.authorization?.substring("Bearer ".length);
}

/**
 * Used to authenticate Next.JS pages. Assumes application is behind
 * Wonderwall (https://doc.nais.io/security/auth/idporten/sidecar/).
 */
export const isValidated = async (context: GetServerSidePropsContext) => {
  /* if (isDevOrDemo) {
     true
    } */

  const request = context.req;

  if (request == null) {
    throw new Error("Context is missing request. This should not happen");
  }

  const bearerToken = getBearerToken(request);

  if (!bearerToken) {
    console.log("No bearer token");
    return false;
  }

  try {
    await tokenIsValid(bearerToken);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};
