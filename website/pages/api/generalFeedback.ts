import type { NextApiRequest, NextApiResponse } from "next";
import { DsFeddbackMsgT } from "../../lib";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  switch (req.method) {
    case "POST":
      try {
        const trelloKey = process.env.TRELLO_AUTH;
        const trelloToken = process.env.TRELLO_TOKEN;

        const data: DsFeddbackMsgT = JSON.parse(req.body);

        if (!trelloKey || !trelloToken) {
          res.status(500).json({ msg: "Could not find needed tokens in .env" });
          return;
        }
        const card = `&name=Generell feedback&desc=Bruker: ${
          data.user ? data.user : "Ukjent"
        }\n\n${data.message}`;
        const url = `https://api.trello.com/1/cards?idList=619cc5721924df5816bcc45f&key=${trelloKey}&token=${trelloToken}${card}`;

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
