import fs from "fs";
import { getDsPaths } from "../lib";

const generateUrls = async () => {
  const urls = await getDsPaths();
  const parsedUrls = urls.map((u) => `/${u.join("/")}`);
  fs.writeFile(
    "./cypress/test-urls.json",
    JSON.stringify(parsedUrls),
    (err) => {
      if (err) {
        console.error(err);
        return;
      }
    }
  );
};

generateUrls();
