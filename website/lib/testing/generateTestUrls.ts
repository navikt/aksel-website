import fs from "fs";
import { getAllPages } from "../sanity/santiy";

const generateUrls = async () => {
  const pages = await getAllPages();

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
