import { LayoutPicker } from "@/components";
import { DsHeader, DsSidebar, Footer } from "@/layout";
import { isDevelopment } from "@/lib";
import { useState } from "react";

const Page = () => {
  const [version, setVersion] = useState<"aksel" | "ds">("aksel");

  if (version === "aksel") {
    return (
      <>
        <button
          className="fixed bottom-4 right-4"
          onClick={() => setVersion((x) => (x === "ds" ? "aksel" : "ds"))}
        >
          {version} demo
        </button>
        <LayoutPicker
          title="Aksel"
          data={{ ...mockArtikkel, _type: "aksel_artikkel" } as any}
        />
      </>
    );
  }
  return (
    <>
      <button
        className="fixed bottom-4 right-4 z-[9999]"
        onClick={() => setVersion((x) => (x === "ds" ? "aksel" : "ds"))}
      >
        {version} demo
      </button>
      <DsHeader />
      <div className="flex w-full flex-col items-center bg-canvas-background-light">
        <div className="flex w-full max-w-screen-2xl">
          <DsSidebar />
          <div className="relative w-full">
            <main
              tabIndex={-1}
              id="hovedinnhold"
              className="relative min-h-screen-header w-full focus:outline-none md:max-w-screen-sidebar"
            >
              <LayoutPicker title="Designsystemet" data={mockArtikkel as any} />
              <div className="mt-auto" aria-hidden />
            </main>
          </div>
        </div>
        <Footer variant="ds" />
      </div>
    </>
  );
};

export default Page;

export const getStaticProps = async () => {
  if (!isDevelopment()) {
    return { notFound: true };
  }

  return {
    props: {
      page: mockArtikkel,
      navigation: mockNav,
      slug: "/designsystem/komponenter/toggle-group",
    },
  };
};

const mockArtikkel = {
  _createdAt: "2022-05-13T13:54:13Z",
  _id: "drafts.fe99d9ce-9605-4c61-b705-76205d91484a",
  _rev: "p611vx-xfw-51n-25p-djs2hyal8",
  _type: "ds_artikkel",
  _updatedAt: "2022-05-13T14:00:57Z",
  artikkel_type: false,
  contributors: [
    { title: "Ola Normann" },
    { title: "Petter Pettersen" },
    { title: "Henrik Henriksen" },
  ],
  heading: "Demo tittel",
  tema: [{ title: "Måling" }, { title: "Metode" }, { title: "Analyse" }],
  innhold: [
    {
      _key: "8ffd58df064c",
      _type: "generisk_seksjon",
      brikker: [
        {
          _key: "ec7c3c48a651",
          _type: "bilde",
          alt: "Anim magna proident consectetur amet excepteur cillum est dolor excepteur in occaecat.",
          asset: {
            _ref: "image-24d4d2462d3f24dae3b8e0f48a63af3eafdfea39-2330x1110-webp",
            _type: "reference",
          },
          floating: false,
          floating_align: "hoyre",
          floating_text: null,
          small: false,
        },
        {
          _key: "b4e80834b656",
          _type: "riktekst_blokk",
          body: [
            {
              _key: "6789432f4754",
              _type: "block",
              children: [
                {
                  _key: "312363350e8d0",
                  _type: "span",
                  marks: [],
                  text: "Seksjon 1",
                },
              ],
              markDefs: [],
              style: "h3",
            },
            {
              _key: "89a6fe931706",
              _type: "block",
              children: [
                {
                  _key: "05690a1dbec1",
                  _type: "span",
                  marks: [],
                  text: "Anim magna proident consectetur amet excepteur cillum est dolor excepteur in occaecat.",
                },
              ],
              markDefs: [],
              style: "normal",
            },
            {
              _key: "afa74f3e865e",
              _type: "block",
              children: [
                {
                  _key: "13597bc5705e",
                  _type: "span",
                  marks: [],
                  text: "Underseksjon",
                },
              ],
              markDefs: [],
              style: "h4",
            },
            {
              _key: "3f14f311a918",
              _type: "block",
              children: [
                {
                  _key: "6176ff98d7900",
                  _type: "span",
                  marks: [],
                  text: "Anim magna proident consectetur amet excepteur cillum est dolor excepteur in occaecat.",
                },
              ],
              markDefs: [],
              style: "normal",
            },
          ],
        },
        {
          _key: "4bf26f2fdc09",
          _type: "tips",
          body: [
            {
              _key: "f98151c13341",
              _type: "block",
              children: [
                {
                  _key: "e7c4765157e20",
                  _type: "span",
                  marks: [],
                  text: "Anim magna proident consectetur amet excepteur cillum est dolor excepteur in occaecat.",
                },
              ],
              markDefs: [],
              style: "normal",
            },
          ],
        },
        {
          _key: "6d7d0bc58072",
          _type: "relatert_innhold",
          lenker: [
            {
              _key: "37592a7ea5c2",
              _type: "lenke",
              description: "Anim magna proident consectetur amet excepteur",
              ekstern_domene: false,
              ekstern_link:
                "https://verktoykasse.sanity.studio/desk/designsystemet;artikler;fe99d9ce-9605-4c61-b705-76205d91484a%2Ctemplate%3Dds_artikkel",
              intern: false,
              intern_lenke: null,
              tags: "none",
              title: "Relatert kort 1",
            },
            {
              _key: "c7bc61ab820bf0931bec7299802edb93",
              _type: "lenke",
              description: "Anim magna proident consectetur amet excepteur",
              ekstern_domene: false,
              ekstern_link:
                "https://verktoykasse.sanity.studio/desk/designsystemet;artikler;fe99d9ce-9605-4c61-b705-76205d91484a%2Ctemplate%3Dds_artikkel",
              intern: false,
              intern_lenke: null,
              tags: "none",
              title: "Relatert kort 2",
            },
            {
              _key: "df3cb13bac29bcea34ebbf788bd2739c",
              _type: "lenke",
              description: "Anim magna proident consectetur amet excepteur",
              ekstern_domene: false,
              ekstern_link:
                "https://verktoykasse.sanity.studio/desk/designsystemet;artikler;fe99d9ce-9605-4c61-b705-76205d91484a%2Ctemplate%3Dds_artikkel",
              intern: false,
              intern_lenke: null,
              tags: "none",
              title: "Relatert kort 2",
            },
          ],
        },
        {
          _key: "d128087104ea",
          _type: "do_dont_v2",
          blokker: [
            {
              _key: "1dfbbffaabb5",
              _type: "do_dont_block",
              alt: "Anim magna proident consectetur amet excepteur cillum est dolor excepteur in occaecat.",
              description:
                "Anim magna proident consectetur amet excepteur cillum est dolor excepteur in occaecat.",
              fullwidth: false,
              picture: {
                _type: "image",
                asset: {
                  _ref: "image-4b8859d7fad19ba3e51cfb2ce05571940ccdcd22-1600x720-png",
                  _type: "reference",
                },
              },
              variant: "do",
            },
            {
              _key: "49609cf8a85dd44310f85f6321913e1f",
              _type: "do_dont_block",
              alt: "Anim magna proident consectetur amet excepteur cillum est dolor excepteur in occaecat.",
              description:
                "Anim magna proident consectetur amet excepteur cillum est dolor excepteur in occaecat.",
              fullwidth: true,
              picture: {
                _type: "image",
                asset: {
                  _ref: "image-4b8859d7fad19ba3e51cfb2ce05571940ccdcd22-1600x720-png",
                  _type: "reference",
                },
              },
              variant: "do",
            },
          ],
          forklaring: [
            {
              _key: "19014f1ed77e",
              _type: "block",
              children: [
                {
                  _key: "20bc7296c0c20",
                  _type: "span",
                  marks: [],
                  text: "Anim magna proident consectetur amet excepteur cillum est dolor excepteur in occaecat.",
                },
              ],
              markDefs: [],
              style: "normal",
            },
          ],
          title: "Dodont 1",
        },
        {
          _key: "5a0cc1fc97cbfdb7b2ae9dac15a2e7b3",
          _type: "relatert_innhold",
          lenker: [
            {
              _key: "37592a7ea5c2",
              _type: "lenke",
              description: "Anim magna proident consectetur amet excepteur",
              ekstern_domene: false,
              ekstern_link:
                "https://verktoykasse.sanity.studio/desk/designsystemet;artikler;fe99d9ce-9605-4c61-b705-76205d91484a%2Ctemplate%3Dds_artikkel",
              intern: false,
              intern_lenke: null,
              tags: "none",
              title: "Relatert kort 1",
            },
            {
              _key: "c7bc61ab820bf0931bec7299802edb93",
              _type: "lenke",
              description: "Anim magna proident consectetur amet excepteur",
              ekstern_domene: false,
              ekstern_link:
                "https://verktoykasse.sanity.studio/desk/designsystemet;artikler;fe99d9ce-9605-4c61-b705-76205d91484a%2Ctemplate%3Dds_artikkel",
              intern: false,
              intern_lenke: null,
              tags: "none",
              title: "Relatert kort 2",
            },
          ],
        },
        {
          _key: "c4741f800813",
          _type: "bilde",
          alt: "Anim magna proident consectetur amet excepteur cillum est dolor excepteur in occaecat.",
          asset: {
            _ref: "image-4b8859d7fad19ba3e51cfb2ce05571940ccdcd22-1600x720-png",
            _type: "reference",
          },
          caption: "Standalone bilde",
          floating: false,
          floating_align: "hoyre",
          floating_text: null,
          small: false,
        },
        {
          _key: "aaab7e5f9045",
          _type: "alert_v2",
          body: [
            {
              _key: "9da684f0b3c5",
              _type: "block",
              children: [
                {
                  _key: "acc1452d670f0",
                  _type: "span",
                  marks: [],
                  text: "Anim magna proident consectetur amet excepteur cillum est dolor excepteur in occaecat.",
                },
              ],
              markDefs: [],
              style: "normal",
            },
          ],
          heading: "Alert ",
          heading_level: "h3",
          variant: "info",
        },
        {
          _key: "f25e2bf054a2",
          _type: "kode",
          code: {
            _type: "code",
            code: "<code>kodesnippet</code>",
            language: "jsx",
          },
          ref: null,
          variant: false,
        },
        {
          _key: "def193b36b99",
          _type: "tabell",
          powerTable: {
            _key: "6736e370-5bd4-48aa-8c54-cb86e3a79563",
            _type: "powerTable",
            rows: [
              {
                _key: "25005efc-3499-454f-aa01-6a754b4b4b3a",
                _type: ["powerTable.row"],
                cells: [
                  {
                    _key: "fdcfd274-2a94-4688-9bf9-0a73f775cc55",
                    _type: ["powerTable.cell"],
                    colSpan: 1,
                    data: {
                      _type: "powerTable.cell.data",
                      body: [
                        {
                          _key: "ec9f7aa7be72",
                          _type: "block",
                          children: [
                            {
                              _key: "da5b235a4bb5",
                              _type: "span",
                              marks: [],
                              text: "cell 1",
                            },
                          ],
                          markDefs: [],
                          style: "normal",
                        },
                      ],
                    },
                    rowSpan: 1,
                    value: { _type: "powerTable.cell.data" },
                  },
                  {
                    _key: "12f03054-28d6-4b74-b415-3808905e6aa2",
                    _type: ["powerTable.cell"],
                    colSpan: 1,
                    data: {
                      _type: "powerTable.cell.data",
                      body: [
                        {
                          _key: "fa09e7d4ca9f",
                          _type: "block",
                          children: [
                            {
                              _key: "aa06224d61be",
                              _type: "span",
                              marks: [],
                              text: "cell 2",
                            },
                          ],
                          markDefs: [],
                          style: "normal",
                        },
                      ],
                    },
                    rowSpan: 1,
                    value: { _type: "powerTable.cell.data" },
                  },
                ],
              },
              {
                _key: "46ba6c37-e5e2-49b9-b077-203335eb2881",
                _type: ["powerTable.row"],
                cells: [
                  {
                    _key: "b735efbd-7a54-4fdd-82ff-82fe3a9b138e",
                    _type: ["powerTable.cell"],
                    colSpan: 1,
                    data: {
                      _type: "powerTable.cell.data",
                      body: [
                        {
                          _key: "e0c9145fe3fc",
                          _type: "block",
                          children: [
                            {
                              _key: "0e8c490bfe7a",
                              _type: "span",
                              marks: [],
                              text: "cell 3",
                            },
                          ],
                          markDefs: [],
                          style: "normal",
                        },
                      ],
                    },
                    rowSpan: 1,
                    value: { _type: "powerTable.cell.data" },
                  },
                  {
                    _key: "0f46e82b-6647-44c1-aa8a-041d8a739f31",
                    _type: ["powerTable.cell"],
                    colSpan: 1,
                    data: {
                      _type: "powerTable.cell.data",
                      body: [
                        {
                          _key: "674ddfd2728d",
                          _type: "block",
                          children: [
                            {
                              _key: "2f81a46244ef",
                              _type: "span",
                              marks: [],
                              text: "cell4",
                            },
                          ],
                          markDefs: [],
                          style: "normal",
                        },
                      ],
                    },
                    rowSpan: 1,
                    value: { _type: "powerTable.cell.data" },
                  },
                ],
              },
            ],
          },
          title: "enkel tabell",
        },
        {
          _key: "b83f039a128c",
          _type: "accordion_v2",
          list: [
            {
              _key: "71badcc3d92e",
              _type: "element",
              innhold: [
                {
                  _key: "e120d360063e",
                  _type: "riktekst_blokk",
                  body: [
                    {
                      _key: "295e6b556bc2",
                      _type: "block",
                      children: [
                        {
                          _key: "8af3e090b6af0",
                          _type: "span",
                          marks: [],
                          text: "Anim magna proident consectetur amet excepteur cillum est dolor excepteur in occaecat.",
                        },
                      ],
                      markDefs: [],
                      style: "normal",
                    },
                  ],
                },
              ],
              title: "Accordion 1",
            },
            {
              _key: "feb5b43c39da2674b1e301127c3534d2",
              _type: "element",
              innhold: [
                {
                  _key: "e120d360063e",
                  _type: "riktekst_blokk",
                  body: [
                    {
                      _key: "295e6b556bc2",
                      _type: "block",
                      children: [
                        {
                          _key: "8af3e090b6af0",
                          _type: "span",
                          marks: [],
                          text: "Anim magna ",
                        },
                        {
                          _key: "e382d9573ded",
                          _type: "span",
                          marks: ["strong"],
                          text: "proident",
                        },
                        {
                          _key: "15ecf4afb796",
                          _type: "span",
                          marks: [],
                          text: " consectetur amet excepteur cillum est dolor excepteur in occaecat.",
                        },
                      ],
                      markDefs: [],
                      style: "normal",
                    },
                  ],
                },
                {
                  _key: "c4277d7afed1",
                  _type: "tips",
                  body: [
                    {
                      _key: "7eee70099add",
                      _type: "block",
                      children: [
                        {
                          _key: "bb2477d43f24",
                          _type: "span",
                          marks: [],
                          text: "Komponent inne i ",
                        },
                        {
                          _key: "3f48745764b7",
                          _type: "span",
                          marks: ["code"],
                          text: "accordion",
                        },
                      ],
                      markDefs: [],
                      style: "normal",
                    },
                  ],
                },
              ],
              title: "Accordion 2",
            },
          ],
          title: "Accordion",
        },
      ],
      markDefs: null,
      title: "Seksjon med h2, generisk seksjon",
    },
    {
      _key: "2f10c079199c",
      _type: "riktekst_blokk",
      body: [
        {
          _key: "f959716e7e60",
          _type: "block",
          children: [
            {
              _key: "01109ddeb31d",
              _type: "span",
              marks: [],
              text: "Riktekst utenfor seksjon",
            },
          ],
          markDefs: [],
          style: "h3",
        },
        {
          _key: "5149ea8439a8",
          _type: "block",
          children: [
            {
              _key: "2ec8e9527c950",
              _type: "span",
              marks: [],
              text: "Et occaecat sunt ",
            },
            {
              _key: "ff819b3c6525",
              _type: "span",
              marks: ["code"],
              text: "dolor",
            },
            {
              _key: "1588ee9c754c",
              _type: "span",
              marks: [],
              text: " labore occaecat. ",
            },
            {
              _key: "53e13135e6ee",
              _type: "span",
              marks: ["kbd"],
              text: "Occaecat",
            },
            {
              _key: "737a8bc14a1c",
              _type: "span",
              marks: [],
              text: " irure sunt ",
            },
            {
              _key: "318eadc345b7",
              _type: "span",
              marks: ["em"],
              text: "consectetur",
            },
            {
              _key: "174345ee1171",
              _type: "span",
              marks: [],
              text: " ad irure ",
            },
            {
              _key: "bf9e5e1085e4",
              _type: "span",
              marks: ["strong"],
              text: "consectetur",
            },
            { _key: "0687854e6bda", _type: "span", marks: [], text: " eu " },
            {
              _key: "a40b2890c052",
              _type: "span",
              marks: ["dcdad3b09b50"],
              text: "exercitation",
            },
            {
              _key: "ca1363302cbe",
              _type: "span",
              marks: [],
              text: " dolore sunt duis veniam.",
            },
          ],
          markDefs: [
            {
              _key: "dcdad3b09b50",
              _type: "link",
              blank: true,
              href: "https://verktoykasse.sanity.studio/desk/designsystemet;artikler;fe99d9ce-9605-4c61-b705-76205d91484a%2Ctemplate%3Dds_artikkel",
            },
          ],
          style: "normal",
        },
      ],
      markDefs: null,
    },
    {
      _key: "a4cbd1df7043",
      _type: "tips",
      body: [
        {
          _key: "13365850923d",
          _type: "block",
          children: [
            {
              _key: "09d0a701c38c",
              _type: "span",
              marks: [],
              text: "Tips utenfor seksjon",
            },
          ],
          markDefs: [],
          style: "normal",
        },
        {
          _key: "e96672ba25ef",
          _type: "block",
          children: [
            {
              _key: "820fbd55a1640",
              _type: "span",
              marks: [],
              text: "Anim magna proident consectetur amet excepteur cillum est dolor excepteur in occaecat.",
            },
          ],
          markDefs: [],
          style: "normal",
        },
      ],
      markDefs: null,
    },
    {
      _key: "ca4061db7590",
      _type: "relatert_innhold",
      lenker: [
        {
          _key: "ab942e1a9c26",
          _type: "lenke",
          description: "Anim magna proident consectetur amet excepteur cillum",
          ekstern_domene: true,
          ekstern_link:
            "https://verktoykasse.sanity.studio/desk/designsystemet;artikler;fe99d9ce-9605-4c61-b705-76205d91484a%2Ctemplate%3Dds_artikkel",
          intern: false,
          intern_lenke: null,
          tags: "none",
          title: "Relatert kort",
        },
        {
          _key: "de2df80796acdf25db59de890fc9e895",
          _type: "lenke",
          description: "Anim magna proident consectetur amet excepteur cillum",
          ekstern_domene: true,
          ekstern_link:
            "https://verktoykasse.sanity.studio/desk/designsystemet;artikler;fe99d9ce-9605-4c61-b705-76205d91484a%2Ctemplate%3Dds_artikkel",
          intern: false,
          intern_lenke: null,
          tags: "none",
          title: "Relatert kort",
        },
      ],
      markDefs: null,
    },
  ],
  metadata_feedback: { hide_feedback: false },
  slug: "designsystem/komponenter/toggle-group",
};

const mockNav = {
  headings: [
    {
      _key: "b8739a954c22",
      _type: "heading",
      category_ref: {
        _createdAt: "2021-12-21T11:12:37Z",
        _id: "45d85cdb-1cf9-4e15-a3f6-1830b36e2e4a",
        _rev: "75tJosESYslMRr1bRPCnRB",
        _type: "main_categories",
        _updatedAt: "2021-12-21T11:12:45Z",
        level: "designsystem",
        picture: {
          _type: "image",
          asset: {
            _ref: "image-dfd560a978c852d005391d41514d1e54d2891894-97x97-svg",
            _type: "reference",
          },
          title: "Guider-piktogram",
        },
        title: "Guider",
      },
      link_ref: {
        _id: "03e7014d-8a09-4f33-a295-ab42455577f7",
        slug: { _type: "slug", current: "designsystem/side/oversikt-guider" },
      },
      menu: [
        {
          _key: "80f6c00df32f",
          _type: "item",
          link: {
            _id: "03e7014d-8a09-4f33-a295-ab42455577f7",
            slug: {
              _type: "slug",
              current: "designsystem/side/oversikt-guider",
            },
            tags: null,
          },
          title: "Oversikt",
        },
        {
          _key: "c9e0d67f8859",
          _type: "subheading",
          link: null,
          title: "Design",
        },
        {
          _key: "9cc9261afc21",
          _type: "item",
          link: {
            _id: "dd0ee57d-8765-4456-81a9-89a3a0c92c07",
            slug: {
              _type: "slug",
              current: "designsystem/side/designer-i-nav",
            },
            tags: null,
          },
          title: "Kom i gang som designer",
        },
        {
          _key: "24f6ec7bf623",
          _type: "item",
          link: {
            _id: "16dd3de4-abdb-4f41-990b-5838df60c237",
            slug: { _type: "slug", current: "designsystem/side/farger-figma" },
            tags: null,
          },
          title: "Farger",
        },
        {
          _key: "721d91600212",
          _type: "subheading",
          link: null,
          title: "Utvikling",
        },
        {
          _key: "46501d92005a",
          _type: "item",
          link: {
            _id: "826e9313-a5e5-4d38-b322-564d0556ac7b",
            slug: {
              _type: "slug",
              current: "designsystem/side/kom-i-gang-som-utvikler",
            },
            tags: null,
          },
          title: "Kom i gang som utvikler",
        },
        {
          _key: "da56807c0ae8",
          _type: "item",
          link: {
            _id: "d4b6194c-e9ac-41c8-8230-397f3e6e4255",
            slug: { _type: "slug", current: "designsystem/side/tailwind" },
            tags: null,
          },
          title: "Tailwind",
        },
        {
          _key: "ea28871fef65",
          _type: "item",
          link: {
            _id: "bdd27859-932c-4f24-9cf6-74f8abc0426b",
            slug: {
              _type: "slug",
              current: "designsystem/side/overridable-component",
            },
            tags: null,
          },
          title: "Overridable component",
        },
        {
          _key: "b0b78c2e1eaa",
          _type: "subheading",
          link: null,
          title: "Innhold",
        },
        {
          _key: "9520bae75b49",
          _type: "item",
          link: {
            _id: "a393eb65-78c7-44fe-b007-bcc13153180f",
            slug: { _type: "slug", current: "designsystem/side/sprak" },
            tags: null,
          },
          title: "Språk",
        },
        {
          _key: "a2b74c7ae257",
          _type: "item",
          link: {
            _id: "9d81d81a-b0a4-44c6-805f-8da1a434a328",
            slug: {
              _type: "slug",
              current: "designsystem/side/subdomener-i-nav",
            },
            tags: null,
          },
          title: "Subdomener i NAV",
        },
      ],
      title: "Guider",
    },
    {
      _key: "be787fd4e748",
      _type: "heading",
      category_ref: {
        _createdAt: "2021-12-21T11:12:16Z",
        _id: "0e4c9ccf-4e27-42e6-b8ec-3044f7d96a03",
        _rev: "75tJosESYslMRr1bRPCZZj",
        _type: "main_categories",
        _updatedAt: "2021-12-21T11:12:16Z",
        level: "designsystem",
        picture: {
          _type: "image",
          asset: {
            _ref: "image-8d6821f942659f75c7296e97b6921116cf51bdef-98x98-svg",
            _type: "reference",
          },
          title: "Flater-piktogram",
        },
        title: "Flater",
      },
      link_ref: {
        _id: "bcdff634-3869-4119-a736-c0fd9ef37b6a",
        slug: { _type: "slug", current: "designsystem/side/flater-i-nav" },
      },
      menu: [
        {
          _key: "6f821d428b2f",
          _type: "item",
          link: {
            _id: "bcdff634-3869-4119-a736-c0fd9ef37b6a",
            slug: { _type: "slug", current: "designsystem/side/flater-i-nav" },
            tags: null,
          },
          title: "Oversikt",
        },
        {
          _key: "f6d1cbca09a8",
          _type: "subheading",
          link: null,
          title: "NAV.NO PERSON",
        },
        {
          _key: "4d2e811ab171",
          _type: "item",
          link: {
            _id: "df3bf75d-fa81-48e9-9d76-99ab43ff0213",
            slug: {
              _type: "slug",
              current: "designsystem/side/innholdsstrategi-person",
            },
            tags: null,
          },
          title: "Innholdsstrategi for nav.no",
        },
        {
          _key: "92a13b5c0226",
          _type: "item",
          link: {
            _id: "df89aba6-f516-46d2-8bc1-d59398acd1b3",
            slug: {
              _type: "slug",
              current: "designsystem/side/beredskapsplan-navno",
            },
            tags: null,
          },
          title: "Beredskapsplan for nav.no",
        },
        {
          _key: "1106d9a6a5dc",
          _type: "item",
          link: {
            _id: "277d13c5-3903-417b-8283-e15a5984a047",
            slug: { _type: "slug", current: "designsystem/side/produktsider" },
            tags: null,
          },
          title: "Produktsider",
        },
        {
          _key: "bfde30fc3a6a",
          _type: "item",
          link: {
            _id: "818ed683-0414-4766-b280-b91305507170",
            slug: {
              _type: "slug",
              current: "designsystem/side/livssituasjonssider",
            },
            tags: null,
          },
          title: "Situasjonssider",
        },
        {
          _key: "89eef19af8cf",
          _type: "item",
          link: {
            _id: "a2f0e41d-fc7c-4cee-a051-197e4562a1bc",
            slug: { _type: "slug", current: "designsystem/side/temaartikkel" },
            tags: null,
          },
          title: "Temaartikkel",
        },
        {
          _key: "c71618a0a9d0",
          _type: "item",
          link: {
            _id: "7a9561a0-d8c7-415a-8528-3f125041a1e0",
            slug: { _type: "slug", current: "designsystem/side/slik-gjor-du" },
            tags: null,
          },
          title: "Skjemaveiledning",
        },
        {
          _key: "99ce0c1d9868",
          _type: "item",
          link: {
            _id: "72361071-03b8-471a-b317-0ab22bc9366c",
            slug: { _type: "slug", current: "designsystem/side/kalkulator" },
            tags: null,
          },
          title: "Kalkulator",
        },
        {
          _key: "b0b6ea7aae49",
          _type: "item",
          link: {
            _id: "d8558955-56fe-4a03-9b85-183caeced5fe",
            slug: { _type: "slug", current: "designsystem/side/veiviser" },
            tags: null,
          },
          title: "Veiviser",
        },
        {
          _key: "5fbeeea8831d",
          _type: "subheading",
          link: null,
          title: "INTERNE FLATER",
        },
        {
          _key: "7a5bbd26322f",
          _type: "item",
          link: {
            _id: "6ea48ce3-9d48-4cba-8426-540d2ba5b6b9",
            slug: {
              _type: "slug",
              current: "designsystem/side/prinsipper-for-interne-flater",
            },
            tags: null,
          },
          title: "Prinsipper for interne flater",
        },
      ],
      title: "Flater",
    },
    {
      _key: "53e435820d85",
      _type: "heading",
      category_ref: {
        _createdAt: "2021-12-21T09:24:35Z",
        _id: "3b520506-f91a-4c28-bcb1-24c6e94e3312",
        _rev: "A6xK5mJhq9BWoe96rTwXOY",
        _type: "main_categories",
        _updatedAt: "2021-12-21T11:11:25Z",
        level: "designsystem",
        picture: {
          _type: "image",
          asset: {
            _ref: "image-1d7a64653231e438b1237698e6edf1b4ec3691f5-100x98-svg",
            _type: "reference",
          },
          title: "Styling-piktogram",
        },
        title: "Styling",
      },
      link_ref: {
        _id: "83be891d-ffaa-4d96-a19a-4776b9c3a748",
        slug: { _type: "slug", current: "designsystem/side/stiler-nav" },
      },
      menu: [
        {
          _key: "55067769ff78",
          _type: "item",
          link: {
            _id: "83be891d-ffaa-4d96-a19a-4776b9c3a748",
            slug: { _type: "slug", current: "designsystem/side/stiler-nav" },
            tags: null,
          },
          title: "Oversikt",
        },
        {
          _key: "b8adc658dbd6",
          _type: "item",
          link: {
            _id: "c3af9549-9cb7-4c1d-b841-4251582d29ea",
            slug: { _type: "slug", current: "designsystem/side/farge-tokens" },
            tags: null,
          },
          title: "Farge tokens",
        },
      ],
      title: "Styling",
    },
    {
      _key: "e98927a61506",
      _type: "heading",
      category_ref: {
        _createdAt: "2021-12-21T11:13:54Z",
        _id: "00c75894-d18f-475b-a5f9-8b4ca693c602",
        _rev: "75tJosESYslMRr1bRPDGkS",
        _type: "main_categories",
        _updatedAt: "2021-12-21T11:13:54Z",
        level: "designsystem",
        picture: {
          _type: "image",
          asset: {
            _ref: "image-7bf9ab1e56118d3099cc14c94886c028050f8348-97x96-svg",
            _type: "reference",
          },
          title: "Komponenter-piktogram",
        },
        title: "Komponenter",
      },
      link_ref: {
        _id: "e81fa80c-15ba-4120-a099-476881fb55f0",
        slug: {
          _type: "slug",
          current: "designsystem/side/oversikt-komponenter",
        },
      },
      menu: [
        {
          _key: "cb00ceb1c819",
          _type: "item",
          link: {
            _id: "e81fa80c-15ba-4120-a099-476881fb55f0",
            slug: {
              _type: "slug",
              current: "designsystem/side/oversikt-komponenter",
            },
            tags: null,
          },
          title: "Oversikt",
        },
        {
          _key: "1c001c6b6374",
          _type: "item",
          link: {
            _id: "75351662-ecb0-455a-b9a5-59f319e423fa",
            slug: { _type: "slug", current: "designsystem/side/changelog" },
            tags: null,
          },
          title: "Endringslogg",
        },
        {
          _key: "9617a7ec488f",
          _type: "subheading",
          link: null,
          title: "Grafikk",
        },
        {
          _key: "7853600ca3a4",
          _type: "item",
          link: {
            _id: "574f256f-d253-484f-bd7a-48c5a634abbd",
            slug: { _type: "slug", current: "designsystem/side/ikoner" },
            tags: null,
          },
          title: "Ikoner",
        },
        {
          _key: "4ec38dfe82e3",
          _type: "subheading",
          link: null,
          title: "Core",
        },
        {
          _key: "3e637aaded6d",
          _type: "item",
          link: {
            _id: "7948e724-37c5-403a-8d9c-0233ab265964",
            slug: { _type: "slug", current: "designsystem/side/accordion" },
            tags: null,
          },
          title: "Accordion",
        },
        {
          _key: "8f62992857b3",
          _type: "item",
          link: {
            _id: "15bd5652-b30a-48d5-be1c-ca3d5cc92cfe",
            slug: { _type: "slug", current: "designsystem/komponenter/alert" },
            tags: null,
          },
          title: "Alert",
        },
        {
          _key: "6e3c6a48cb9e",
          _type: "item",
          link: {
            _id: "44fe5596-8180-4370-a8fd-f294c059e380",
            slug: { _type: "slug", current: "designsystem/side/button" },
            tags: null,
          },
          title: "Button",
        },
        {
          _key: "97dff5054ee4",
          _type: "item",
          link: {
            _id: "82102026-bffc-417f-9779-3a76b55d1a29",
            slug: {
              _type: "slug",
              current: "designsystem/komponenter/checkbox",
            },
            tags: null,
          },
          title: "Checkbox",
        },
        {
          _key: "8efa6d102903",
          _type: "item",
          link: {
            _id: "2d0530f7-3f73-4a3e-9fe1-65271e3d9d59",
            slug: {
              _type: "slug",
              current: "designsystem/side/confirmationpanel",
            },
            tags: null,
          },
          title: "Confirmation panel",
        },
        {
          _key: "3f81642db026",
          _type: "item",
          link: {
            _id: "9d862ca0-eb1f-4880-b1b2-ce80bc44387b",
            slug: { _type: "slug", current: "designsystem/side/errorsummary" },
            tags: null,
          },
          title: "Error summary",
        },
        {
          _key: "82896d298a73",
          _type: "item",
          link: {
            _id: "4b70bcb2-f21e-4a3e-8149-101766b5fae5",
            slug: { _type: "slug", current: "designsystem/side/guidepanel" },
            tags: null,
          },
          title: "Guide panel",
        },
        {
          _key: "e4dc71900177",
          _type: "item",
          link: {
            _id: "895f1235-d6f3-454a-a060-fe560d6efa1e",
            slug: { _type: "slug", current: "designsystem/side/helptext" },
            tags: null,
          },
          title: "Help text",
        },
        {
          _key: "f8ad497ab50e",
          _type: "item",
          link: {
            _id: "387bf3f9-19be-4691-b7a8-c0cdaea7f5d5",
            slug: { _type: "slug", current: "designsystem/side/link" },
            tags: null,
          },
          title: "Link",
        },
        {
          _key: "7c0091d33cef",
          _type: "item",
          link: {
            _id: "a11c46a4-e042-4729-aa16-a57e36ebb205",
            slug: { _type: "slug", current: "designsystem/side/linkpanel" },
            tags: null,
          },
          title: "Link panel",
        },
        {
          _key: "be6e7b203c88",
          _type: "item",
          link: {
            _id: "c5470384-0c58-497a-bb2b-4454723ca075",
            slug: { _type: "slug", current: "designsystem/side/loader" },
            tags: null,
          },
          title: "Loader",
        },
        {
          _key: "b7706b110076",
          _type: "item",
          link: {
            _id: "2d052fdc-0627-4432-8c98-3b643a851d9b",
            slug: { _type: "slug", current: "designsystem/side/modal" },
            tags: null,
          },
          title: "Modal",
        },
        {
          _key: "41fea6794b76",
          _type: "item",
          link: {
            _id: "6b5953cb-9a47-4cef-9a4d-dd1b6e82f4f3",
            slug: { _type: "slug", current: "designsystem/side/panel" },
            tags: null,
          },
          title: "Panel",
        },
        {
          _key: "ad387676e2cb",
          _type: "item",
          link: {
            _id: "c143f516-a98d-4210-8e63-ed46e54cc2e2",
            slug: { _type: "slug", current: "designsystem/side/popover" },
            tags: null,
          },
          title: "Popover",
        },
        {
          _key: "82e084325cff",
          _type: "item",
          link: {
            _id: "8042188a-62ce-4031-a7a0-e746f0d66452",
            slug: { _type: "slug", current: "designsystem/komponenter/radio" },
            tags: null,
          },
          title: "Radio",
        },
        {
          _key: "667372b74fe2",
          _type: "item",
          link: {
            _id: "8f3dff36-3ba9-4088-b362-f10a5fc70249",
            slug: { _type: "slug", current: "designsystem/komponenter/search" },
            tags: null,
          },
          title: "Search",
        },
        {
          _key: "00a558545f7b",
          _type: "item",
          link: {
            _id: "342175cf-34a8-45ed-83de-f8b91b20ed08",
            slug: { _type: "slug", current: "designsystem/side/select" },
            tags: null,
          },
          title: "Select",
        },
        {
          _key: "7fa62da7475f",
          _type: "item",
          link: {
            _id: "101c4a33-1606-429c-8b97-4cdb57e709fe",
            slug: { _type: "slug", current: "designsystem/side/stepindicator" },
            tags: null,
          },
          title: "StepIndicator",
        },
        {
          _key: "214bc7aa8f57",
          _type: "item",
          link: {
            _id: "9ecd263c-376a-4358-87ee-57e179b064cf",
            slug: { _type: "slug", current: "designsystem/komponenter/switch" },
            tags: null,
          },
          title: "Switch",
        },
        {
          _key: "c037f1155563",
          _type: "item",
          link: {
            _id: "2dedfe6c-6f67-4ab5-9b58-6850555727b3",
            slug: { _type: "slug", current: "designsystem/side/table" },
            tags: null,
          },
          title: "Table",
        },
        {
          _key: "415ed3c29b19",
          _type: "item",
          link: {
            _id: "91d62bdf-b71b-4118-809c-5ba83b00d004",
            slug: { _type: "slug", current: "designsystem/komponenter/tabs" },
            tags: null,
          },
          title: "Tabs",
        },
        {
          _key: "0254570d87d9",
          _type: "item",
          link: {
            _id: "5bd63e26-3ab8-4fd2-9da9-5345d1b85963",
            slug: { _type: "slug", current: "designsystem/side/tag" },
            tags: null,
          },
          title: "Tag",
        },
        {
          _key: "04c8911d3c8c",
          _type: "item",
          link: {
            _id: "0ad3c6f9-5246-40f5-92a2-c43c8d3bf953",
            slug: { _type: "slug", current: "designsystem/side/textarea" },
            tags: null,
          },
          title: "Text area",
        },
        {
          _key: "354a0cd19533",
          _type: "item",
          link: {
            _id: "64db70a0-31a5-47d4-8d22-eb74f4d99364",
            slug: { _type: "slug", current: "designsystem/side/textfield" },
            tags: null,
          },
          title: "Text field",
        },
        {
          _key: "134768a70a36",
          _type: "item",
          link: {
            _id: "982e0097-6d80-47e7-8119-8c17a7814304",
            slug: {
              _type: "slug",
              current: "designsystem/komponenter/toggle-group",
            },
            tags: null,
          },
          title: "Toggle group",
        },
        {
          _key: "9140b834b69a",
          _type: "item",
          link: {
            _id: "8ee39644-f81d-4528-9fce-b2b01efa74d7",
            slug: {
              _type: "slug",
              current: "designsystem/komponenter/tooltip",
            },
            tags: null,
          },
          title: "Tooltip",
        },
        {
          _key: "88260f000c73",
          _type: "item",
          link: {
            _id: "08b07fd6-7a7c-477f-a5c8-c9cc62b46366",
            slug: { _type: "slug", current: "designsystem/side/typography" },
            tags: null,
          },
          title: "Typography",
        },
        {
          _key: "ac2fde9429b8",
          _type: "subheading",
          link: null,
          title: "Internal",
        },
        {
          _key: "98d0fb55433e",
          _type: "item",
          link: {
            _id: "d8295e0e-5a68-40dd-a69f-3bd329e660d5",
            slug: { _type: "slug", current: "designsystem/side/intern-header" },
            tags: null,
          },
          title: "Intern Header",
        },
        {
          _key: "57545bd50d7c",
          _type: "item",
          link: {
            _id: "69736285-2ed4-4961-9d17-156c3ab6d052",
            slug: {
              _type: "slug",
              current: "designsystem/komponenter/pagination",
            },
            tags: null,
          },
          title: "Pagination",
        },
      ],
      title: "Komponenter",
    },
  ],
};
