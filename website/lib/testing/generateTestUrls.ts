import dotenv from "dotenv";
import fs from "fs";
import { getAllPages } from "../sanity/santiy";

dotenv.config();

const generateUrls = async () => {
  const pages = await getAllPages(process.env.SANITY_WRITE_KEY);

  fs.writeFile(
    "./cypress/test-urls.json",
    JSON.stringify(pages.map((x) => `/${x}`)),
    (err) => {
      if (err) {
        console.error(err);
        return;
      }
    }
  );
};

generateUrls();
