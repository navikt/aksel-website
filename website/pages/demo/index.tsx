import { isDevelopment } from "@/lib";

const Page = () => {
  return <div>page 1</div>;
};

export default Page;

export const getStaticProps = async () => {
  if (!isDevelopment()) {
    return { notFound: true };
  }

  return {
    props: {},
  };
};

const mockArtikkel = {
  _id: "a7d88641-5dd9-4bf0-a6b8-9365aa77b3b3",
  _type: "ds_artikkel",
  artikkel_type: false,
  metadata_feedback: {
    hide_feedback: false,
  },
  heading: "Demo tittel",
  slug: {
    _type: "slug",
    current: "designsystem/side/demo-tittel",
  },
  contributors: [
    {
      _type: "reference",
      _key: "eee6b4f772e7",
      _ref: "editor.pDErWTCOv",
    },
    {
      _type: "reference",
      _key: "e188729e46e1",
      _ref: "editor.pv5AzOXXs",
    },
    {
      _type: "reference",
      _key: "e6159fd1713b",
      _ref: "78562f22-cf9d-4fc9-bd5c-9ed04477f140",
    },
  ],
  innhold: [
    {
      _type: "generisk_seksjon",
      _key: "8ffd58df064c",
      title: "Seksjon med h2, generisk seksjon",
      brikker: [
        {
          _type: "riktekst_blokk",
          _key: "b4e80834b656",
          body: [
            {
              _type: "block",
              markDefs: [],
              style: "h3",
              children: [
                {
                  _type: "span",
                  marks: [],
                  text: "Seksjon 1",
                  _key: "312363350e8d0",
                },
              ],
              _key: "6789432f4754",
            },
            {
              _type: "block",
              markDefs: [],
              style: "normal",
              _key: "89a6fe931706",
              children: [
                {
                  _type: "span",
                  marks: [],
                  _key: "05690a1dbec1",
                  text: "Anim magna proident consectetur amet excepteur cillum est dolor excepteur in occaecat.",
                },
              ],
            },
            {
              _type: "block",
              markDefs: [],
              style: "h4",
              _key: "afa74f3e865e",
              children: [
                {
                  _type: "span",
                  marks: [],
                  _key: "13597bc5705e",
                  text: "Underseksjon",
                },
              ],
            },
            {
              _type: "block",
              markDefs: [],
              style: "normal",
              children: [
                {
                  _type: "span",
                  marks: [],
                  text: "Anim magna proident consectetur amet excepteur cillum est dolor excepteur in occaecat.",
                  _key: "6176ff98d7900",
                },
              ],
              _key: "3f14f311a918",
            },
          ],
        },
        {
          _type: "tips",
          _key: "4bf26f2fdc09",
          body: [
            {
              _type: "block",
              markDefs: [],
              style: "normal",
              children: [
                {
                  _type: "span",
                  marks: [],
                  text: "Anim magna proident consectetur amet excepteur cillum est dolor excepteur in occaecat.",
                  _key: "e7c4765157e20",
                },
              ],
              _key: "f98151c13341",
            },
          ],
        },
        {
          _type: "relatert_innhold",
          _key: "6d7d0bc58072",
          lenker: [
            {
              _type: "lenke",
              _key: "37592a7ea5c2",
              intern: false,
              ekstern_domene: false,
              tags: "none",
              title: "Relatert kort 1",
              description: "Anim magna proident consectetur amet excepteur",
              ekstern_link:
                "https://verktoykasse.sanity.studio/desk/designsystemet;artikler;fe99d9ce-9605-4c61-b705-76205d91484a%2Ctemplate%3Dds_artikkel",
            },
            {
              _type: "lenke",
              _key: "c7bc61ab820bf0931bec7299802edb93",
              intern: false,
              ekstern_domene: false,
              tags: "none",
              title: "Relatert kort 2",
              description: "Anim magna proident consectetur amet excepteur",
              ekstern_link:
                "https://verktoykasse.sanity.studio/desk/designsystemet;artikler;fe99d9ce-9605-4c61-b705-76205d91484a%2Ctemplate%3Dds_artikkel",
            },
            {
              _type: "lenke",
              _key: "df3cb13bac29bcea34ebbf788bd2739c",
              intern: false,
              ekstern_domene: false,
              tags: "none",
              title: "Relatert kort 2",
              description: "Anim magna proident consectetur amet excepteur",
              ekstern_link:
                "https://verktoykasse.sanity.studio/desk/designsystemet;artikler;fe99d9ce-9605-4c61-b705-76205d91484a%2Ctemplate%3Dds_artikkel",
            },
          ],
        },
        {
          _type: "do_dont_v2",
          _key: "d128087104ea",
          title: "Dodont 1",
          forklaring: [
            {
              _type: "block",
              markDefs: [],
              style: "normal",
              children: [
                {
                  _type: "span",
                  marks: [],
                  text: "Anim magna proident consectetur amet excepteur cillum est dolor excepteur in occaecat.",
                  _key: "20bc7296c0c20",
                },
              ],
              _key: "19014f1ed77e",
            },
          ],
          blokker: [
            {
              _type: "do_dont_block",
              _key: "1dfbbffaabb5",
              fullwidth: false,
              variant: "do",
              picture: {
                _type: "image",
                asset: {
                  _type: "reference",
                  _ref: "image-4b8859d7fad19ba3e51cfb2ce05571940ccdcd22-1600x720-png",
                },
              },
              alt: "Anim magna proident consectetur amet excepteur cillum est dolor excepteur in occaecat.",
              description:
                "Anim magna proident consectetur amet excepteur cillum est dolor excepteur in occaecat.",
            },
            {
              _type: "do_dont_block",
              _key: "49609cf8a85dd44310f85f6321913e1f",
              fullwidth: true,
              variant: "do",
              picture: {
                _type: "image",
                asset: {
                  _type: "reference",
                  _ref: "image-4b8859d7fad19ba3e51cfb2ce05571940ccdcd22-1600x720-png",
                },
              },
              alt: "Anim magna proident consectetur amet excepteur cillum est dolor excepteur in occaecat.",
              description:
                "Anim magna proident consectetur amet excepteur cillum est dolor excepteur in occaecat.",
            },
          ],
        },
        {
          _type: "relatert_innhold",
          _key: "5a0cc1fc97cbfdb7b2ae9dac15a2e7b3",
          lenker: [
            {
              _type: "lenke",
              _key: "37592a7ea5c2",
              intern: false,
              ekstern_domene: false,
              tags: "none",
              title: "Relatert kort 1",
              description: "Anim magna proident consectetur amet excepteur",
              ekstern_link:
                "https://verktoykasse.sanity.studio/desk/designsystemet;artikler;fe99d9ce-9605-4c61-b705-76205d91484a%2Ctemplate%3Dds_artikkel",
            },
            {
              _type: "lenke",
              _key: "c7bc61ab820bf0931bec7299802edb93",
              intern: false,
              ekstern_domene: false,
              tags: "none",
              title: "Relatert kort 2",
              description: "Anim magna proident consectetur amet excepteur",
              ekstern_link:
                "https://verktoykasse.sanity.studio/desk/designsystemet;artikler;fe99d9ce-9605-4c61-b705-76205d91484a%2Ctemplate%3Dds_artikkel",
            },
          ],
        },
        {
          _type: "bilde",
          _key: "c4741f800813",
          floating: false,
          floating_align: "hoyre",
          small: false,
          asset: {
            _type: "reference",
            _ref: "image-4b8859d7fad19ba3e51cfb2ce05571940ccdcd22-1600x720-png",
          },
          alt: "Anim magna proident consectetur amet excepteur cillum est dolor excepteur in occaecat.",
          caption: "Standalone bilde",
        },
        {
          _type: "alert_v2",
          _key: "aaab7e5f9045",
          variant: "info",
          heading_level: "h3",
          heading: "Alert ",
          body: [
            {
              _type: "block",
              markDefs: [],
              style: "normal",
              children: [
                {
                  _type: "span",
                  marks: [],
                  text: "Anim magna proident consectetur amet excepteur cillum est dolor excepteur in occaecat.",
                  _key: "acc1452d670f0",
                },
              ],
              _key: "9da684f0b3c5",
            },
          ],
        },
        {
          _type: "kode",
          _key: "f25e2bf054a2",
          variant: false,
          code: {
            _type: "code",
            language: "jsx",
            code: "<code>kodesnippet</code>",
          },
        },
        {
          _type: "tabell",
          _key: "def193b36b99",
          title: "enkel tabell",
          powerTable: {
            _type: "powerTable",
            _key: "6736e370-5bd4-48aa-8c54-cb86e3a79563",
            rows: [
              {
                _type: ["powerTable.row"],
                _key: "25005efc-3499-454f-aa01-6a754b4b4b3a",
                cells: [
                  {
                    _type: ["powerTable.cell"],
                    _key: "fdcfd274-2a94-4688-9bf9-0a73f775cc55",
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
                          _key: "ec9f7aa7be72",
                          style: "normal",
                          markDefs: [],
                          children: [
                            {
                              _type: "span",
                              _key: "da5b235a4bb5",
                              text: "cell 1",
                              marks: [],
                            },
                          ],
                        },
                      ],
                    },
                  },
                  {
                    _type: ["powerTable.cell"],
                    _key: "12f03054-28d6-4b74-b415-3808905e6aa2",
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
                          _key: "fa09e7d4ca9f",
                          style: "normal",
                          markDefs: [],
                          children: [
                            {
                              _type: "span",
                              _key: "aa06224d61be",
                              text: "cell 2",
                              marks: [],
                            },
                          ],
                        },
                      ],
                    },
                  },
                ],
              },
              {
                _type: ["powerTable.row"],
                _key: "46ba6c37-e5e2-49b9-b077-203335eb2881",
                cells: [
                  {
                    _type: ["powerTable.cell"],
                    _key: "b735efbd-7a54-4fdd-82ff-82fe3a9b138e",
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
                          _key: "e0c9145fe3fc",
                          style: "normal",
                          markDefs: [],
                          children: [
                            {
                              _type: "span",
                              _key: "0e8c490bfe7a",
                              text: "cell 3",
                              marks: [],
                            },
                          ],
                        },
                      ],
                    },
                  },
                  {
                    _type: ["powerTable.cell"],
                    _key: "0f46e82b-6647-44c1-aa8a-041d8a739f31",
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
                          _key: "674ddfd2728d",
                          style: "normal",
                          markDefs: [],
                          children: [
                            {
                              _type: "span",
                              _key: "2f81a46244ef",
                              text: "cell4",
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
          _key: "b83f039a128c",
          title: "Accordion",
          list: [
            {
              _type: "element",
              _key: "71badcc3d92e",
              title: "Accordion 1",
              innhold: [
                {
                  _type: "riktekst_blokk",
                  _key: "e120d360063e",
                  body: [
                    {
                      _type: "block",
                      markDefs: [],
                      style: "normal",
                      children: [
                        {
                          _type: "span",
                          marks: [],
                          text: "Anim magna proident consectetur amet excepteur cillum est dolor excepteur in occaecat.",
                          _key: "8af3e090b6af0",
                        },
                      ],
                      _key: "295e6b556bc2",
                    },
                  ],
                },
              ],
            },
            {
              _type: "element",
              _key: "feb5b43c39da2674b1e301127c3534d2",
              title: "Accordion 2",
              innhold: [
                {
                  _type: "riktekst_blokk",
                  _key: "e120d360063e",
                  body: [
                    {
                      _type: "block",
                      markDefs: [],
                      style: "normal",
                      children: [
                        {
                          _type: "span",
                          marks: [],
                          text: "Anim magna ",
                          _key: "8af3e090b6af0",
                        },
                        {
                          _type: "span",
                          marks: ["strong"],
                          _key: "e382d9573ded",
                          text: "proident",
                        },
                        {
                          _type: "span",
                          marks: [],
                          _key: "15ecf4afb796",
                          text: " consectetur amet excepteur cillum est dolor excepteur in occaecat.",
                        },
                      ],
                      _key: "295e6b556bc2",
                    },
                  ],
                },
                {
                  _type: "tips",
                  _key: "c4277d7afed1",
                  body: [
                    {
                      _type: "block",
                      _key: "7eee70099add",
                      style: "normal",
                      markDefs: [],
                      children: [
                        {
                          _type: "span",
                          _key: "bb2477d43f24",
                          text: "Komponent inne i ",
                          marks: [],
                        },
                        {
                          _type: "span",
                          _key: "3f48745764b7",
                          marks: ["code"],
                          text: "accordion",
                        },
                      ],
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
      _type: "riktekst_blokk",
      _key: "2f10c079199c",
      body: [
        {
          _type: "block",
          _key: "f959716e7e60",
          style: "h3",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "01109ddeb31d",
              text: "Riktekst utenfor seksjon",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          markDefs: [
            {
              _type: "link",
              _key: "dcdad3b09b50",
              blank: true,
              href: "https://verktoykasse.sanity.studio/desk/designsystemet;artikler;fe99d9ce-9605-4c61-b705-76205d91484a%2Ctemplate%3Dds_artikkel",
            },
          ],
          style: "normal",
          children: [
            {
              _type: "span",
              marks: [],
              text: "Et occaecat sunt ",
              _key: "2ec8e9527c950",
            },
            {
              _type: "span",
              marks: ["code"],
              _key: "ff819b3c6525",
              text: "dolor",
            },
            {
              _type: "span",
              marks: [],
              _key: "1588ee9c754c",
              text: " labore occaecat. ",
            },
            {
              _type: "span",
              marks: ["kbd"],
              _key: "53e13135e6ee",
              text: "Occaecat",
            },
            {
              _type: "span",
              marks: [],
              _key: "737a8bc14a1c",
              text: " irure sunt ",
            },
            {
              _type: "span",
              marks: ["em"],
              _key: "318eadc345b7",
              text: "consectetur",
            },
            {
              _type: "span",
              marks: [],
              _key: "174345ee1171",
              text: " ad irure ",
            },
            {
              _type: "span",
              marks: ["strong"],
              _key: "bf9e5e1085e4",
              text: "consectetur",
            },
            {
              _type: "span",
              marks: [],
              _key: "0687854e6bda",
              text: " eu ",
            },
            {
              _type: "span",
              marks: ["dcdad3b09b50"],
              _key: "a40b2890c052",
              text: "exercitation",
            },
            {
              _type: "span",
              marks: [],
              _key: "ca1363302cbe",
              text: " dolore sunt duis veniam.",
            },
          ],
          _key: "5149ea8439a8",
        },
      ],
    },
    {
      _type: "tips",
      _key: "a4cbd1df7043",
      body: [
        {
          _type: "block",
          _key: "13365850923d",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "09d0a701c38c",
              text: "Tips utenfor seksjon",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          markDefs: [],
          style: "normal",
          children: [
            {
              _type: "span",
              marks: [],
              text: "Anim magna proident consectetur amet excepteur cillum est dolor excepteur in occaecat.",
              _key: "820fbd55a1640",
            },
          ],
          _key: "e96672ba25ef",
        },
      ],
    },
    {
      _type: "relatert_innhold",
      _key: "ca4061db7590",
      lenker: [
        {
          _type: "lenke",
          _key: "ab942e1a9c26",
          intern: false,
          ekstern_domene: true,
          tags: "none",
          title: "Relatert kort",
          description: "Anim magna proident consectetur amet excepteur cillum",
          ekstern_link:
            "https://verktoykasse.sanity.studio/desk/designsystemet;artikler;fe99d9ce-9605-4c61-b705-76205d91484a%2Ctemplate%3Dds_artikkel",
        },
        {
          _type: "lenke",
          _key: "de2df80796acdf25db59de890fc9e895",
          intern: false,
          ekstern_domene: true,
          tags: "none",
          title: "Relatert kort",
          description: "Anim magna proident consectetur amet excepteur cillum",
          ekstern_link:
            "https://verktoykasse.sanity.studio/desk/designsystemet;artikler;fe99d9ce-9605-4c61-b705-76205d91484a%2Ctemplate%3Dds_artikkel",
        },
      ],
    },
  ],
  _rev: "p611vx-xfw-51n-25p-djs2hyal8",
  _updatedAt: "2022-05-13T14:00:57.841Z",
};
