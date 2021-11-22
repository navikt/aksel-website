import type { NextApiRequest, NextApiResponse } from "next";
import { FoundOnPageFeedbackT } from "../../lib";

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

        const data: FoundOnPageFeedbackT = JSON.parse(req.body);

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
                  text: `:alphabet-white-question: *Fant du det du lette etter?*\n\n ${
                    data.answer ? ":thumbsup: *Ja*" : ":thumbsdown: *Nei*"
                  }`,
                },
              },
            ],
            attachments: [
              {
                color: data.answer ? "#06893A" : "#BA3A26",
                blocks: [
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
                    type: "section",
                    text: {
                      type: "mrkdwn",
                      text: data.url,
                    },
                  },
                  {
                    type: "section",
                    text: {
                      type: "mrkdwn",
                      text: `<https://verktoykasse.sanity.studio/desk/__edit__${data.docId}%2Ctype%3D${data.docType}|Rediger side i CMS>`,
                    },
                  },
                  {
                    type: "context",
                    elements: [
                      {
                        type: "mrkdwn",
                        text: "Tag melding med :white_check_mark: hvis feedback er håndtert.\n",
                      },
                    ],
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
