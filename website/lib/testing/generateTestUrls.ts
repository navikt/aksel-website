import fs from "fs";
import { getAkselArtikler, getDsPaths, getGpPaths } from "..";

const generateUrls = async () => {
  const urls = [
    [""],
    ["designsystem"],
    ...(await getDsPaths()),
    ...(await getGpPaths()),
  ];
  const parsedUrls = urls.map((u) => `/${u.join("/")}`);
  parsedUrls.push(...(await getAkselArtikler()));

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
