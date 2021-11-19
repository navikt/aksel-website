import type { NextApiRequest, NextApiResponse } from "next";

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

        console.log(slackUrl);

        const data = JSON.parse(req.body);
        const postRes = await fetch(slackUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json;",
          },
          body: JSON.stringify({
            text: data.message,
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
