import dotenv from "dotenv";
import { noCdnClient } from "../sanity/sanity.server";
import { customAlphabet } from "nanoid/non-secure";

dotenv.config();
const token = process.env.SANITY_WRITE_KEY;

const randKey = () => {
  const nanoid = customAlphabet("1234567890abcdef", 12);
  return nanoid();
};

const createStyle = (text: string, style: string) => ({
  _key: randKey(),
  _type: "block",
  style: style,
  markDefs: [],
  children: [
    {
      _type: "span",
      marks: [],
      text: text,
    },
  ],
});

const transform = (src: any, type?: string) => {
  const newData = [];

  let copy: any[] = [];
  try {
    copy = JSON.parse(JSON.stringify(src));
  } catch (error) {
    console.log(src);
    throw new Error("Ops");
  }

  copy.forEach((data) => {
    switch (data._type) {
      case "relatert_innhold":
        type === "komponent"
          ? newData.push({
              ...data,
              ...(data.lenker
                ? {
                    lenker: data.lenker.map((x) => ({
                      ...x,
                      _key: randKey(),
                      title:
                        x?.title === "Setup"
                          ? "Kom i gang som utvikler!"
                          : x.title,
                    })),
                  }
                : {}),
            })
          : newData.push({
              ...data,
              lenker: data.lenker.map((x) => ({ ...x, _key: randKey() })),
            });
        break;
      case "tabell":
        newData.push(data);
        break;
      case "kode":
        newData.push(data);
        break;
      case "tips":
        newData.push(data);
        break;
      case "alert_v2":
        newData.push({ ...data, _type: "alert" });
        break;
      case "video":
        newData.push(data);
        break;
      case "tokens":
        newData.push(data);
        break;
      case "bilde":
        newData.push(data);
        break;
      case "spesial_seksjon":
        newData.push(data);
        break;
      case "do_dont_v2":
        data?.title && newData.push(createStyle(data?.title, "h3"));
        data?.forklaring && newData.push(...data.forklaring);
        delete data?.title;
        delete data?.forklaring;
        newData.push({ ...data, _type: "do_dont" });
        break;
      case "riktekst_blokk":
        data?.body &&
          newData.push(
            ...data.body.map((x) => ({
              ...x,
              _key: randKey(),
              children: x.children.map((x) => ({ ...x, _key: randKey() })),
            }))
          );
        break;
      case "generisk_seksjon":
        data?.title && newData.push(createStyle(data.title, "h2"));
        data?.brikker && newData.push(...transform(data.brikker));
        break;
      case "accordion_v2":
        newData.push({
          ...data,
          _type: "accordion",
          ...(data.list
            ? {
                list: data.list.map((x) => {
                  const content = x?.innhold ? transform(x.innhold) : null;
                  delete x?.innhold;
                  return { ...x, content, _key: randKey() };
                }),
              }
            : {}),
        });
        break;
      case "intro_komponent":
        break;
      case "props_seksjon":
        newData.push(data);
        break;
      case "installasjon_seksjon":
        newData.push(createStyle("Installasjon", "h2"));
        newData.push({
          _type: "kode",
          variant: true,
          ref: {
            _type: "reference",
            _ref: data?.code_ref?._ref,
          },
        });
        break;
      case "live_demo":
        delete data?.body;
        delete data?.forklaring;
        delete data?.code_ref;
        newData.push(createStyle("Demo", "h2"));
        newData.push(data);
        break;
      case "anatomi":
        newData.push(createStyle("Anatomi", "h2"));
        delete data?.intro;
        delete data?.title;
        delete data?.nested;
        delete data?.extra;
        newData.push({
          ...data,
          forklaring: data.forklaring.map((x) => ({
            ...x,
            ...(x?.beskrivelse
              ? {
                  beskrivelse: x.beskrivelse.map((y) => ({
                    ...y,
                    _key: randKey(),
                    children: y.children.map((z) => ({
                      ...z,
                      _key: randKey(),
                    })),
                  })),
                }
              : {}),
          })),
        });
        break;
      case "uu_seksjon":
        newData.push(createStyle("Tilgjengelighet", "h2"));
        data?.innhold && newData.push(...data.innhold);

        data?.interaksjon_mus &&
          newData.push(createStyle("Interaksjon Mus", "h3"));
        data?.interaksjon_mus && newData.push(...data.interaksjon_mus);

        data?.interaksjon_touch &&
          newData.push(createStyle("Interaksjon Touch", "h3"));
        data?.interaksjon_touch && newData.push(...data.interaksjon_touch);

        data?.interaksjon_tastatur &&
          newData.push(createStyle("Interaksjon Tastatur", "h3"));
        data?.interaksjon_tastatur &&
          newData.push(...data.interaksjon_tastatur);

        data.tastatur &&
          newData.push({ _type: "tastatur_modul", tastatur: data.tastatur });

        data?.interaksjon_skjermleser &&
          newData.push(createStyle("Interaksjon Skjermleser", "h3"));
        data?.interaksjon_skjermleser &&
          newData.push(...data.interaksjon_skjermleser);
        break;

      default:
        break;
    }
  });
  return newData;
};

const main = async () => {
  const transactionClient = noCdnClient(token).transaction();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const testpage = "drafts.b05ecba2-2612-4d15-a986-15e7c7ba95cf";
  const docs = await noCdnClient(token).fetch(
    `*[_type in ["komponent_artikkel","ds_artikkel","aksel_artikkel","aksel_prinsipp","aksel_blogg","aksel_standalone"]]`
  );

  /* const docs = await noCdnClient(token).fetch(`*[_id == "${testpage}"]`); */

  const newData = [];

  const srcData: any[] = [...docs].filter((x) => !x?.isMigrated);

  console.log(srcData.length);

  srcData.forEach((data) => {
    switch (data._type) {
      case "aksel_artikkel":
        data.innhold &&
          newData.push({ _id: data._id, content: transform(data.innhold) });
        break;
      case "aksel_prinsipp":
        data.innhold &&
          newData.push({ _id: data._id, content: transform(data.innhold) });
        break;
      case "aksel_blogg":
        data.innhold &&
          newData.push({ _id: data._id, content: transform(data.innhold) });
        break;
      case "aksel_standalone":
        data.innhold &&
          newData.push({ _id: data._id, content: transform(data.innhold) });
        break;
      case "ds_artikkel":
        newData.push({
          _id: data._id,
          ...(data?.innhold ? { content: transform(data.innhold) } : {}),
          ...(data?.innhold_tabs
            ? {
                content_tabs: data.innhold_tabs.map((x) => {
                  const content = transform(x.innhold);
                  delete x.innhold;
                  return {
                    ...x,
                    content,
                  };
                }),
              }
            : {}),
        });
        break;
      case "komponent_artikkel":
        newData.push({
          _id: data._id,
          ...(data?.content_bruk
            ? {
                bruk_tab: transform(data?.content_bruk),
                /* Move intro-seksjon ut fra riktekst */
                ...(data?.content_bruk.find(
                  (x) => x._type === "intro_komponent"
                )
                  ? {
                      intro: data?.content_bruk.find(
                        (x) => x._type === "intro_komponent"
                      ),
                    }
                  : {}),
              }
            : {}),
          ...(data?.content_kode
            ? { kode_tab: transform(data?.content_kode, "komponent") }
            : {}),
        });
        break;
      default:
        break;
    }
  });

  for (const data of newData) {
    const id = data._id;
    delete data._id;
    transactionClient.patch(id, (p) =>
      p
        .set({ ...data, isMigrated: true })
        .unset(["content_kode", "content_bruk", "innhold", "innhold_tabs"])
    );
  }
  await transactionClient
    .commit({ autoGenerateArrayKeys: true, dryRun: true })
    .then(() => console.log(`Updated!`))
    .catch((e) => console.error(e.message));
};

main();
