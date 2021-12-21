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

        if (!trelloKey || !trelloToken) {
          res.status(500).json({ msg: "Could not find needed tokens in .env" });
          return;
        }

        const data: FoundOnPageFeedbackT = JSON.parse(req.body);
        const sideUrl = "https://design.nav.no";
        const trelloList = data.answer
          ? "619e32343427c94d3e47d3fe"
          : "619cc57d84cb8a4c9be3bb9c";
        const label = data.answer
          ? "619e2f1de9dace4f5e4d69b0"
          : "619e30b17e833981fcc79136";
        const editUrl = `https://verktoykasse.sanity.studio/desk/__edit__${data.docId}%2Ctype%3D${data.docType}`;

        const card = `&name=${data.message}&desc=**Side:**\n${
          sideUrl + data.url
        }\n\n**[Rediger side](${editUrl})**`;
        const url = `https://api.trello.com/1/cards?idList=${trelloList}&idLabels=${label}&key=${trelloKey}&token=${trelloToken}${card}`;

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
