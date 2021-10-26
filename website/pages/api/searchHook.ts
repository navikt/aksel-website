// pages/api/hook.js
import { isValidRequest } from "@sanity/webhook";
import algoliasearch from "algoliasearch";
import type { NextApiRequest, NextApiResponse } from "next";
import { isDevelopment } from "../../components";
import { getDesignsystemRecords } from "../../lib";

const secret = process.env.HOOK_SECRET;
const token = process.env.SANITY_WRITE_KEY;
const APP_ID = process.env.ALGOLIA_ID;
const ALGOLIA_ADMIN = process.env.ALGOLIA_ADMIN;

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!secret || !token || !APP_ID || !ALGOLIA_ADMIN) {
    res.status(401).json({ success: false, message: "Invalid tokens" });
    return;
  }

  if (!isValidRequest(req, secret) && !isDevelopment()) {
    res.status(401).json({ success: false, message: "Invalid signature" });
    console.log("Unauthorized indexing attempt");
    return;
  }

  const algolia = algoliasearch(APP_ID, ALGOLIA_ADMIN);
  const algoliaIndex = algolia.initIndex("vk_designsystemet");

  const records: Record<string, any>[] = [];

  const dsRecords: Record<string, any>[] = await getDesignsystemRecords();

  records.push(...dsRecords);

  await algoliaIndex.replaceAllObjects(records);

  res.status(200).json({ success: true });
}

export default handler;
