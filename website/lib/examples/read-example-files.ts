import path from "path";
import fs from "fs";

/**
 *
 * @param dirName Directory name
 * @returns File-content for files in dir + filename
 */
export const readExampleFiles = (
  dirName: string
): { innhold: string; navn: string }[] => {
  const examplePath = path.resolve(process.cwd(), `pages/examples/${dirName}`);
  if (fs.existsSync(examplePath)) {
    const files = fs.readdirSync(examplePath);

    const res = files.map((file) => {
      let code = "";
      const filepath = path.resolve(
        process.cwd(),
        `pages/examples/${dirName}/${file}`
      );
      code = fs.readFileSync(filepath, "utf-8");
      return {
        innhold: code
          .split("\n")
          .filter((line) => !line.includes("withDsExample"))
          .join("\n"),
        navn: file.replace(".tsx", ""),
      };
    });
    return res;
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
  const examplePath = path.resolve(process.cwd(), `pages/examples/${fileName}`);
  if (fs.existsSync(examplePath)) {
    let code = "";
    code = fs.readFileSync(examplePath, "utf-8");
    return {
      innhold: code
        .split("\n")
        .filter((line) => !line.includes("withDsExample"))
        .join("\n"),
      navn: fileName.replace(".tsx", ""),
    };
  }
};
