import fs from "fs";
import { getAkselDocuments, getAkselTema, getDsPaths } from "..";

const generateUrls = async () => {
  let pages = await getDsPaths().then((paths) =>
    paths.map((slugs) => slugs.join("/"))
  );

  const artikler = await getAkselDocuments("all");
  const temaer = await getAkselTema();

  pages = [
    "",
    "designsystem",
    "tema",
    ...pages,
    ...artikler,
    ...temaer.map((x) => `tema/${x}`),
  ];

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
