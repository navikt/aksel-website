import fs from "fs";
import { getAkselArtikler, getDsPaths } from "..";

const generateUrls = async () => {
  const urls = [
    [""],
    ["designsystem"],
    ...(await getDsPaths()),
    ...(await getAkselArtikler().then((x) => x.map((y) => y.split("/")))),
  ];
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
