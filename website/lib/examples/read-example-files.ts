import path from "path";
import fs from "fs";
import JSON5 from "json5";

const filterCode = (code: string) =>
  code
    .split("\n")
    .filter((line) => !line.includes("withDsExample"))
    .join("\n");

const getIndex = (str: string) => {
  const args = str.match(/export const args = {([^}]+)}/)?.[1];
  if (args) {
    const obj = JSON5.parse(`{${args}}`);
    return obj?.index ?? 1;
  }
  return 1;
};

const sortResult = (res: { innhold: string; navn: string }[]) => {
  return res.sort((a, b) => {
    return getIndex(a.innhold) - getIndex(b.innhold);
  });
};

/**
 *
 * @param dirName Directory name
 * @returns File-content for files in dir + filename
 */
export const readExampleFiles = (
  dirName: string
): { innhold: string; navn: string }[] => {
  const examplePath = path.resolve(process.cwd(), `pages/eksempler/${dirName}`);
  if (fs.existsSync(examplePath)) {
    const files = fs.readdirSync(examplePath);

    const res = files.map((file) => {
      let code = "";
      const filepath = path.resolve(
        process.cwd(),
        `pages/eksempler/${dirName}/${file}`
      );
      code = fs.readFileSync(filepath, "utf-8");
      return {
        innhold: code,
        navn: file.replace(".tsx", ""),
      };
    });
    return sortResult(res);
  }
};

/**
 *
 * @param fileName example filename including dir: button/primary.tsx
 * @returns File-content for file + filename
 */
export const readExampleFile = (
  fileName: string
): { innhold: string; navn: string } => {
  const examplePath = path.resolve(
    process.cwd(),
    `pages/eksempler/${fileName}`
  );
  if (fs.existsSync(examplePath)) {
    let code = "";
    code = fs.readFileSync(examplePath, "utf-8");
    return {
      innhold: filterCode(code),
      navn: fileName.replace(".tsx", ""),
    };
  }
};
