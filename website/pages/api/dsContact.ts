import type { NextApiRequest, NextApiResponse } from "next";
import { feedbackClient } from "../../lib";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  switch (req.method) {
    case "POST":
      try {
        const token = process.env.SANITY_WRITE_KEY;
        if (!token) {
          throw new Error("Could not find sanity write token in .env");
        }

        const data = JSON.parse(req.body);
        await feedbackClient(token)
          .create({
            _type: "ds_contact",
            ...data,
            done: false,
          })
          .then((res) => {
            console.log(`Created ds_contact document, ID is ${res._id}`);
          });
        res.status(200).json({ msg: `Created ds_contact document` });
      } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Error, check console" });
      }
      break;
  }
}
