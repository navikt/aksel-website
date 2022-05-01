import type { NextApiRequest, NextApiResponse } from "next";
import { isValidatedApi } from "../../lib/auth/auth";

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const payload = await isValidatedApi(req);
  res
    .status(200)
    .json({ status: payload ? 200 : 401, data: JSON.stringify(payload) });
};
