import path from "path";
import fs from "fs";

/**
 *
 * @param dirName Directory name
 * @returns File-content for files in dir + filename
 */
export const readExampleFiles = (
  dirName: string
): { code: string; name: string; dir: string }[] => {
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
        code: code
          .split("\n")
          .filter((line) => !line.includes("withDsExample"))
          .join("\n"),
        name: file.replace(".tsx", ""),
        dir: dirName,
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
): { code: string; name: string; dir: string } => {
  const examplePath = path.resolve(process.cwd(), `pages/examples/${fileName}`);
  if (fs.existsSync(examplePath)) {
    let code = "";
    code = fs.readFileSync(examplePath, "utf-8");
    return {
      code: code
        .split("\n")
        .filter((line) => !line.includes("withDsExample"))
        .join("\n"),
      name: fileName.replace(".tsx", ""),
      dir: fileName.split("/")[0],
    };
  }
};
