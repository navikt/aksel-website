import type { NextApiRequest, NextApiResponse } from "next";
import { FoundOnPageFeedbackT } from "../../lib";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  switch (req.method) {
    case "POST":
      try {
        const trelloKey = "c319bd921b9b1a9d8fb2d3c872c0134e";
        const trelloToken = process.env.TRELLO_TOKEN;

        const data: FoundOnPageFeedbackT = JSON.parse(req.body);

        if (!trelloKey || !trelloToken) {
          res.status(500).json({ msg: "Could not find needed tokens in .env" });
          return;
        }
        const card = `&name=${data.answer ? "Fant" : "Fant ikke"}&desc=${
          data.message
        }\n\n\n\nDokument: ${`https://verktoykasse.sanity.studio/desk/__edit__${data.docId}%2Ctype%3D${data.docType}`}\n\nSide: ${
          data.url
        }`;
        const url = `https://api.trello.com/1/cards?idList=619cc57d84cb8a4c9be3bb9c&key=${trelloKey}&token=${trelloToken}${card}`;

        const postRes = await fetch(url, {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
        });

        if (!postRes.ok) {
          throw new Error(
            `request failed with status ${res.status}: ${await postRes.text()}`
          );
        }
        return res.json({ status: "ok" });
      } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Error, check console" });
      }
      break;
  }
}
