import fs from "fs";
import { getDsPaths, getGpPaths } from "..";

const generateUrls = async () => {
  const urls = [
    [""],
    ["designsystem"],
    ...(await getDsPaths()),
    ...(await getGpPaths()),
  ];
  const parsedUrls = urls.map((u) => `/${u.join("/")}`);
  console.log(parsedUrls);
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
