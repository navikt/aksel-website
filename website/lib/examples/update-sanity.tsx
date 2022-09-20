import dotenv from "dotenv";
import { readExampleFile, readExampleFiles } from ".";
import { SanityT } from "..";
import { noCdnClient } from "../sanity/sanity.server";
import { getExampleFiles } from "./get-example-files";
dotenv.config();

const main = async () => {
  const token = process.env.SANITY_WRITE_KEY;
  const transactionClient = noCdnClient(token).transaction();
  const examples = getExampleFiles();

  const docs: SanityT.Schema.kode_eksempler_fil[] = await noCdnClient(
    token
  ).fetch(`*[_type == "kode_eksempler_fil"]`);

  for (const doc of docs) {
    if (!examples.some((x) => doc.title === x.path)) {
      transactionClient.delete(doc._id);
    }
  }

  for (const ex of examples) {
    const data = {
      _id: `kode_eksempelid_${ex.path.replace("/", "-").replace(".", "-")}`,
      _type: "kode_eksempler_fil",
      title: ex.path,
      dir: ex.dir,
      filer: ex.dir ? readExampleFiles(ex.path) : [readExampleFile(ex.path)],
    };

    transactionClient.createIfNotExists(data);
  }

  await transactionClient
    .commit({ autoGenerateArrayKeys: true })
    .then(() => console.log(`Oppdaterte kode-eksempler`))
    .catch((e) => console.error(e.message));
};

main();
