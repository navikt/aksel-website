import { SandboxKeys } from "../../stories/sandbox";
import dotenv from "dotenv";
import { noCdnClient } from "../sanity/sanity.server";
import { writeFileSync } from "fs";

dotenv.config();
const token = process.env.SANITY_WRITE_KEY;

const testdata = {
  _id: "drafts.b05ecba2-2612-4d15-a986-15e7c7ba95cf",
  _type: "aksel_artikkel",
  under_arbeid: {
    status: false,
  },
  heading: "Sidetittel123",
  tema: [
    {
      _type: "reference",
      _key: "24f9233086ad",
      _ref: "5d0efa2e-e418-4b5e-808e-9e2e506e4f48",
    },
  ],
  ingress: "Ingress-tekst",
  publishedAt: "2022-07-05T09:01:00.000Z",
  contributors: [
    {
      _type: "reference",
      _key: "8470c88531c4",
      _ref: "editor.pDErWTCOv",
    },
  ],
  slug: {
    _type: "slug",
    current: "artikkel/sidetittel123",
  },
  seo: {
    meta: "Seo beskrivelse",
  },
  innhold: [
    {
      _type: "relatert_innhold",
      _key: "83d360a12904",
      lenker: [
        {
          _type: "lenke",
          _key: "3aa3bc55ba25",
          intern: false,
          ekstern_domene: false,
          title: "Top-level related card",
          ekstern_link:
            "http://localhost:3333/desk/aksel;artikler;alleArtikler;b05ecba2-2612-4d15-a986-15e7c7ba95cf%2Ctemplate%3Daksel_artikkel",
        },
        {
          _type: "lenke",
          _key: "1e40e31914d3dfddb1ce6cac3b3fe98c",
          intern: false,
          ekstern_domene: false,
          title: "22Top-level related card22",
          ekstern_link:
            "http://localhost:3333/desk/aksel;artikler;alleArtikler;b05ecba2-2612-4d15-a986-15e7c7ba95cf%2Ctemplate%3Daksel_artikkel",
        },
      ],
    },
    {
      _type: "riktekst_blokk",
      _key: "6de1038a0eed",
      body: [
        {
          _type: "block",
          _key: "7706f1553ffe",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "227b7c009ec8",
              text: "Top level riktekst 123123",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "f2efee59c733",
          style: "h3",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "6ce74d979e9d",
              marks: [],
              text: "asasd",
            },
          ],
        },
        {
          _type: "block",
          _key: "70987486a68a",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "b632433eeb0c",
              text: "asdasdas",
              marks: ["code"],
            },
          ],
        },
      ],
    },
    {
      _type: "tips",
      _key: "36146472be01",
      eksperiment: false,
      body: [
        {
          _type: "block",
          _key: "2b1eb2ce1968",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "0a3b81a7bc16",
              text: "Top level Tips 1",
              marks: [],
            },
          ],
        },
      ],
    },
    {
      _type: "generisk_seksjon",
      _key: "a32542617cd2",
      title: "H2 seksjon 1",
      brikker: [
        {
          _type: "riktekst_blokk",
          _key: "69e51d29a1fc",
          body: [
            {
              _type: "block",
              _key: "d51090c42431",
              style: "h3",
              markDefs: [],
              children: [
                {
                  _type: "span",
                  _key: "fa7cd6725fff",
                  text: "h2 riktekst",
                  marks: [],
                },
              ],
            },
            {
              _type: "block",
              _key: "d5c053aefca3",
              style: "normal",
              markDefs: [],
              children: [
                {
                  _type: "span",
                  _key: "608d45cea0dd",
                  text: "med mer tekst",
                  marks: [],
                },
              ],
            },
          ],
        },
        {
          _type: "tips",
          _key: "c6d4f443ff4d",
          eksperiment: false,
          body: [
            {
              _type: "block",
              _key: "4c1728a42d85",
              style: "normal",
              markDefs: [],
              children: [
                {
                  _type: "span",
                  _key: "2238f0bf2243",
                  text: "h2 Tips",
                  marks: [],
                },
              ],
            },
          ],
        },
        {
          _type: "relatert_innhold",
          _key: "4192e67f0d2c",
          lenker: [
            {
              _type: "lenke",
              _key: "4ffb1b0d2e51",
              intern: false,
              ekstern_domene: false,
              title: "h2 relatert innhold",
              ekstern_link:
                "http://localhost:3333/desk/aksel;artikler;alleArtikler;b05ecba2-2612-4d15-a986-15e7c7ba95cf%2Ctemplate%3Daksel_artikkel",
            },
          ],
        },
        {
          _type: "do_dont_v2",
          _key: "5925dec48824",
          title: "h2 dodont (h3)",
          blokker: [
            {
              _type: "do_dont_block",
              _key: "222eafb6600d",
              fullwidth: false,
              variant: "do",
              alt: "asdasdas",
              picture: {
                _type: "image",
                asset: {
                  _type: "reference",
                  _ref: "image-407bd0a703d158cc4c3b45734a5d001c14a6b79c-4046x3034-png",
                },
              },
              description: "asdas",
            },
            {
              _type: "do_dont_block",
              _key: "87a79b720e64e70086d3fc6876a7ca4b",
              fullwidth: false,
              variant: "do",
              alt: "asdasdas",
              picture: {
                _type: "image",
                asset: {
                  _type: "reference",
                  _ref: "image-407bd0a703d158cc4c3b45734a5d001c14a6b79c-4046x3034-png",
                },
              },
              description: "asdas",
            },
          ],
          forklaring: [
            {
              _type: "block",
              _key: "3b142be725fc",
              style: "normal",
              markDefs: [],
              children: [
                {
                  _type: "span",
                  _key: "bd9e2585d380",
                  text: "beskrivelse i dodont",
                  marks: [],
                },
              ],
            },
          ],
        },
        {
          _type: "bilde",
          _key: "6cd8103508c9",
          floating: false,
          floating_align: "hoyre",
          small: false,
          asset: {
            _type: "reference",
            _ref: "image-cf519c190f1c099db9b5e9626b2e673b25f50504-3088x840-png",
          },
          alt: "Standalone bilde",
          caption: "Standalone bilde-tekst",
        },
        {
          _type: "video",
          _key: "b475197fe79a",
          alt: "Video-modul",
          caption: "Video-modul-tekst",
          transkripsjon: "Video-modul-transkripsjon",
          webm: {
            _type: "file",
            asset: {
              _type: "reference",
              _ref: "file-a1143c3475adb17286adb1f8c222b6bcc0b505d0-mp4",
            },
          },
        },
        {
          _type: "alert_v2",
          _key: "514ddbcd8dcf",
          variant: "info",
          heading_level: "h3",
          heading: "h2 alert",
          body: [
            {
              _type: "block",
              _key: "a35b65f75693",
              style: "normal",
              markDefs: [],
              children: [
                {
                  _type: "span",
                  _key: "45859bafabaa",
                  text: "med noe tekst",
                  marks: [],
                },
              ],
            },
          ],
        },
        {
          _type: "kode",
          _key: "5e7182259060",
          variant: false,
          code: {
            _type: "code",
            code: "Kodeblokk",
          },
        },
        {
          _type: "tabell",
          _key: "5d9246f6ff8e",
          title: "Tabell",
          powerTable: {
            _type: "powerTable",
            _key: "9e2792cf-c4bd-4341-a31e-f7e17452ebcb",
            rows: [
              {
                _type: ["powerTable.row"],
                _key: "d1d37b8e-e201-4c63-a518-3883fd8fa894",
                cells: [
                  {
                    _type: ["powerTable.cell"],
                    _key: "e4c0eb23-360e-40e7-a79b-103bac379b1c",
                    colSpan: 1,
                    rowSpan: 1,
                    value: {
                      _type: "powerTable.cell.data",
                    },
                    data: {
                      _type: "powerTable.cell.data",
                      body: [
                        {
                          _type: "block",
                          _key: "67dc0a48c766",
                          style: "normal",
                          markDefs: [],
                          children: [
                            {
                              _type: "span",
                              _key: "bd663096b717",
                              text: "min tabell",
                              marks: [],
                            },
                          ],
                        },
                      ],
                    },
                  },
                  {
                    _type: ["powerTable.cell"],
                    _key: "891d5138-16a2-47c2-a749-a25ac774753c",
                    colSpan: 1,
                    rowSpan: 1,
                    value: {
                      _type: "powerTable.cell.data",
                    },
                    data: {
                      _type: "powerTable.cell.data",
                      body: [
                        {
                          _type: "block",
                          _key: "148510097c40",
                          style: "normal",
                          markDefs: [],
                          children: [
                            {
                              _type: "span",
                              _key: "8588966ee6a2",
                              text: "din tabell",
                              marks: [],
                            },
                          ],
                        },
                      ],
                    },
                  },
                ],
              },
            ],
          },
        },
        {
          _type: "accordion_v2",
          _key: "0ee645cde771",
          title: "Accordion-tittel",
          list: [
            {
              _type: "element",
              _key: "d58219328213",
              title: "Accordion 1",
              innhold: [
                {
                  _type: "riktekst_blokk",
                  _key: "d5c971d994a0",
                  body: [
                    {
                      _type: "block",
                      _key: "f67147a4af78",
                      style: "normal",
                      markDefs: [],
                      children: [
                        {
                          _type: "span",
                          _key: "95acf25fe08b",
                          text: "Riktekst-innhold i accordion",
                          marks: [],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              _type: "element",
              _key: "d58219328213",
              title: "Accordion 2",
              innhold: [
                {
                  _type: "riktekst_blokk",
                  _key: "d5c971d994a0",
                  body: [
                    {
                      _type: "block",
                      _key: "f67147a4af78",
                      style: "normal",
                      markDefs: [],
                      children: [
                        {
                          _type: "span",
                          _key: "95acf25fe08b",
                          text: "Riktekst-innhold i accordion 2",
                          marks: [],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          _type: "tokens",
          _key: "4940d3a0fcae",
          title: "Token-visning",
          tokenlist: [
            {
              _type: "reference",
              _key: "c42bbb6200e1",
              _ref: "semantic_color_border_autogen_token",
            },
            {
              _type: "reference",
              _key: "2f453b469319",
              _ref: "semantic_color_divider_autogen_token",
            },
          ],
        },
        {
          _type: "riktekst_blokk",
          _key: "59e9125eee1c2ff306f392c461a242bd",
          body: [
            {
              _type: "block",
              _key: "d51090c42431",
              style: "h3",
              markDefs: [],
              children: [
                {
                  _type: "span",
                  _key: "fa7cd6725fff",
                  text: "h2 riktekst",
                  marks: [],
                },
              ],
            },
            {
              _type: "block",
              _key: "d5c053aefca3",
              style: "normal",
              markDefs: [],
              children: [
                {
                  _type: "span",
                  _key: "608d45cea0dd",
                  text: "med mer tekst",
                  marks: [],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  _rev: "wkg48b-t6q-t87-np1-iwhjqumjf",
  _updatedAt: "2022-07-12T09:07:10.157Z",
};

const createStyle = (text: string, style: string) => ({
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

/**
 * // TODO
 * Oppdatere dodont_v2 block (fjerne title og forklaring)
 * Migrering for DS-artikler
 * Ny riktekstblokk som har alle modulene
 * Rename content_bruk/kode -> kode_tab, bruk_tab
 */
const transform = (src: any, type?: string) => {
  const newData = [];

  src.forEach((data) => {
    switch (data._type) {
      case "relatert_innhold":
        type === "komponent"
          ? newData.push({
              ...data,
              ...(data.lenker
                ? {
                    lenker: data.lenker.map((x) => ({
                      ...x,
                      title:
                        data?.title === "Setup!"
                          ? "Kom i gang som utvikler!"
                          : data.title,
                    })),
                  }
                : {}),
            })
          : newData.push(data);
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
        newData.push(data);
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
        newData.push(data);
        break;
      case "riktekst_blokk":
        data?.body && newData.push(...data.body);
        break;
      case "generisk_seksjon":
        data?.title && newData.push(createStyle(data.title, "h2"));
        data?.brikker && newData.push(...transform(data.brikker));
        break;
      case "accordion_v2":
        newData.push({
          ...data,
          ...(data.list
            ? {
                list: data.list.map((x) => ({
                  ...x,
                  content: transform(x.innhold),
                })),
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
        newData.push({ ...data });
        break;
      case "uu_seksjon":
        newData.push(createStyle("Tilgjengelighet", "h2"));
        data?.innhold && newData.push(data.innhold);

        data?.interaksjon_mus &&
          newData.push(createStyle("Interaksjon Mus", "h3"));
        data?.interaksjon_mus && newData.push(data.interaksjon_mus);

        data?.interaksjon_touch &&
          newData.push(createStyle("Interaksjon Touch", "h3"));
        data?.interaksjon_touch && newData.push(data.interaksjon_touch);

        data?.interaksjon_tastatur &&
          newData.push(createStyle("Interaksjon Tastatur", "h3"));
        data?.interaksjon_tastatur && newData.push(data.interaksjon_tastatur);

        data.tastatur &&
          newData.push({ _type: "tastatur_modul", tastatur: data.tastatur });

        data?.interaksjon_skjermleser &&
          newData.push(createStyle("Interaksjon Skjermleser", "h3"));
        data?.interaksjon_skjermleser &&
          newData.push(data.interaksjon_skjermleser);
        break;

      default:
        break;
    }
  });
  return newData;
};

const main = async () => {
  /* const transactionClient = noCdnClient(token).transaction();

   */
  /* transactionClient.createIfNotExists({
    _id: `${key}_autogen_sandbox`,
    _type: "ds_code_sandbox",
    title: key,
    autogenerated: true,
  }); */
  /* await transactionClient
    .commit({ autoGenerateArrayKeys: true})
    .then(() => console.log(`Updated code-sandboxes`))
    .catch((e) => console.error(e.message)); */
  const docs = await noCdnClient(token).fetch(
    `*[_type in ["aksel_artikkel","aksel_prinsipp","aksel_blogg","aksel_standalone","komponent_artikkel","ds_artikkel"]]`
  );
  /* const docsAksel = await noCdnClient(token).fetch(
    `*[_type in ["aksel_artikkel","aksel_prinsipp","aksel_blogg","aksel_standalone"]]`
  ); */
  /* console.log(docs.filter((x) => !x._id.includes("draft")).length); */
  const newData = [];

  const srcData: any[] = [...docs];
  srcData.forEach((data) => {
    switch (data._type) {
      case "aksel_artikkel":
        newData.push({ ...data, content: transform(data.innhold) });
        break;
      case "aksel_prinsipp":
        newData.push({ ...data, content: transform(data.innhold) });
        break;
      case "aksel_blogg":
        newData.push({ ...data, content: transform(data.innhold) });
        break;
      case "aksel_standalone":
        newData.push({ ...data, content: transform(data.innhold) });
        break;
      case "ds_artikkel":
        newData.push({
          ...data,
          ...(data?.innhold ? { content: transform(data.innhold) } : {}),
          ...(data?.innhold_tabs
            ? {
                content_tabs: data.innhold_tabs.map((x) => ({
                  ...x,
                  content: transform(x.innhold),
                })),
              }
            : {}),
        });
        break;
      case "komponent_artikkel":
        newData.push({
          ...data,
          ...(data?.content_bruk
            ? {
                bruk_tab: transform(data?.content_bruk),
                /* Move intro-seksjon ut fra riktekst */
                ...(data?.content_bruk.find(
                  (x) => x._type === "intro_komponent"
                )
                  ? data?.content_bruk.find(
                      (x) => x._type === "intro_komponent"
                    )
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

  /* console.log(newData[0].content); */

  writeFileSync("tmp.json", JSON.stringify(newData, null, 2));
};

main();
