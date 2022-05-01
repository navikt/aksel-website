import { GetServerSidePropsContext, NextApiRequest } from "next";
import { isDevelopment } from "../../components";
import { tokenIsValid } from "./azure";

export function getBearerToken(req) {
  return req.headers?.authorization?.substring("Bearer ".length);
}

/**
 * Used to authenticate Next.JS pages. Assumes application is behind
 * Wonderwall (https://doc.nais.io/security/auth/idporten/sidecar/).
 */
export const isValidated = async (context: GetServerSidePropsContext) => {
  if (isDevelopment()) {
    return false;
  }

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

export const isValidatedApi = async (req: NextApiRequest) => {
  if (isDevelopment()) {
    return t;
  }

  if (req == null) {
    throw new Error("Context is missing request. This should not happen");
  }

  const bearerToken = getBearerToken(req);

  if (!bearerToken) {
    console.log("No bearer token");
    return null;
  }

  try {
    const payload = await tokenIsValid(bearerToken);
    return payload;
  } catch (e) {
    console.log(e);
    return null;
  }
};

const t = {
  aud: "57c23e46-d647-4ee8-83a4-85ec75ef4a83",
  iss: "https://login.microsoftonline.com/62366534-1ec3-4962-8869-9b5535279d0b/v2.0",
  iat: 1651432217,
  nbf: 1651432217,
  exp: 1651437722,
  aio: "AXQAi/8TAAAAAExnfX45kOC31qnOuPAMo3L1trteiR4JTyvYGgkuHU4pKvHdYReds8v1PPVCZ+kmVWC/oFHMCVRmPfzzrVIKlROd2fiSifp7UUmJWZ1j9TZQgFhc85zcwOb5Og2+04JCM/AunaiFJs7GwkH3DnHtTQ==",
  azp: "57c23e46-d647-4ee8-83a4-85ec75ef4a83",
  azpacr: "2",
  groups: ["2d7f1c0d-5784-4f81-8bb2-8f3a79f8f949"],
  name: "Johansen, Ken Aleksander",
  oid: "c9e5dfed-fba0-4afc-886d-98d0ee5499f6",
  preferred_username: "Ken.Aleksander.Johansen@nav.no",
  rh: "0.ASAANGU2YsMeYkmIaZtVNSedC0Y-wldH1uhOg6SF7HXvSoMgAGI.",
  scp: "defaultaccess",
  sub: "A3IGKXGbYNE8F6y_MMo5QpnJxiIuOdvlatpl98mfCBo",
  tid: "62366534-1ec3-4962-8869-9b5535279d0b",
  uti: "R3VCVrAxmk6Vf4kXguIRAA",
  ver: "2.0",
};
