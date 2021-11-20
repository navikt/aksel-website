import type { NextApiRequest, NextApiResponse } from "next";
import { DsFeddbackMsgT } from "../../lib";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  switch (req.method) {
    case "POST":
      try {
        const slackUrl = process.env.SLACK_URL;
        if (!slackUrl) {
          throw new Error("Could not find SLACK_URL token in .env");
        }

        const data: DsFeddbackMsgT = JSON.parse(req.body);

        const postRes = await fetch(slackUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json;",
          },
          body: JSON.stringify({
            blocks: [
              {
                type: "section",
                text: {
                  type: "mrkdwn",
                  text: `Bruker: ${data.user !== "" ? data.user : "Ukjent"}`,
                },
              },
              {
                type: "section",
                text: {
                  type: "mrkdwn",
                  text: `:speaking_head_in_silhouette: *Melding*\n\n${data.message}`,
                },
              },
              {
                type: "divider",
              },
              {
                type: "context",
                elements: [
                  {
                    type: "mrkdwn",
                    text: "Tag melding med :white_check_mark: hvis feedback er håndtert og bruker har fått respons.\n",
                  },
                ],
              },
            ],
          }),
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
