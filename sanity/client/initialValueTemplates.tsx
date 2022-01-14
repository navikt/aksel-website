import T from "@sanity/base/initial-value-template-builder";

export default [
  ...T.defaults(),

  T.template({
    id: "ds_component_page_template",
    title: "Mal for Komponentsider",
    schemaType: "ds_component_page",
    value: () => ({
      status: "wip",
      accessibility: [
        {
          _type: "block",
          children: [
            {
              _type: "span",
              marks: ["draft_only"],
              text: 'Om du ikke har noe innhold som passer inn her kan du slette alt på denne siden. Da vises ikke tabben "Tilgjengelighet". Tilgjengelighet er godt dekket i de andre tabbene.',
            },
          ],
          markDefs: [],
          style: "normal",
        },
        {
          _type: "block",
          children: [
            {
              _type: "span",
              marks: [],
              text: "Krav og anbefalinger",
            },
          ],
          markDefs: [],
          style: "h2",
        },
        {
          _type: "block",
          children: [
            {
              _type: "span",
              marks: [],
              text: "[Legg til krav eller anbefaling i lista]",
            },
          ],
          level: 1,
          listItem: "bullet",
          markDefs: [],
          style: "normal",
        },
        {
          _type: "block",
          children: [
            {
              _type: "span",
              marks: [],
              text: "",
            },
          ],
          level: 1,
          listItem: "bullet",
          markDefs: [],
          style: "normal",
        },
      ],
      design: [
        {
          _type: "block",
          children: [
            {
              _type: "span",
              marks: ["draft_only"],
              text: 'Link til "Kom i gang som designer"',
            },
          ],
          markDefs: [],
          style: "normal",
        },
        {
          _type: "related_pages",
        },
        {
          _type: "block",
          children: [
            {
              _type: "span",
              marks: [],
              text: "Anatomien",
            },
          ],
          markDefs: [],
          style: "h2",
        },
        {
          _type: "block",
          children: [
            {
              _type: "span",
              marks: ["draft_only"],
              text: "Sett inn bilde av anatomien. Bruk egen ",
            },
            {
              _type: "span",
              marks: ["draft_only", "4cd633181e6e_figma_link"],
              text: "Figma-fil",
            },
            {
              _type: "span",
              marks: ["draft_only"],
              text: " til grafikken.",
            },
          ],
          markDefs: [
            {
              _key: "4cd633181e6e_figma_link",
              _type: "link",
              blank: true,
              href: "https://www.figma.com/file/mRu1NJAXPzx3NIdVWD2dg2/Grafikk-til-DS-dokumentasjon?node-id=2378%3A2149",
            },
          ],
          style: "normal",
        },
        {
          _type: "picture",
        },
        {
          _type: "block",
          children: [
            {
              _type: "span",
              marks: ["draft_only"],
              text: '↓ Seksjonen under dupliseres så mange ganger du ønsker (fra "Header" til "Relatert side")',
            },
          ],
          markDefs: [],
          style: "normal",
        },
        {
          _type: "block",
          children: [
            {
              _type: "span",
              marks: [],
              text: "[Heading - prinsipp, funksjon eller god praksis.]",
            },
          ],
          markDefs: [],
          style: "h2",
        },
        {
          _type: "block",
          children: [
            {
              _type: "span",
              marks: [],
              text: "[Beskriv hva som er anbefalt(bestemt) og hvorfor (NAV-avgjørelse, UX-prinsipp, mentale modeller, UU)]",
            },
          ],
          markDefs: [],
          style: "normal",
        },
        {
          _type: "block",
          children: [
            {
              _type: "span",
              marks: ["draft_only"],
              text: "Vis eksempler med do&don't som illustrerer det du har beskrevet over.",
            },
          ],
          markDefs: [],
          style: "normal",
        },
        {
          _type: "do_dont",
        },
        {
          _type: "block",
          children: [
            {
              _type: "span",
              marks: ["draft_only"],
              text: "Om det er behov kan du linke til relatert innhold som belyser dette, eller utdyper et poeng ↓",
            },
          ],
          markDefs: [],
          style: "normal",
        },
        {
          _type: "related_pages",
        },
      ],
      development: [
        {
          _type: "block",
          children: [
            {
              _type: "span",
              marks: ["draft_only"],
              text: 'Link til "Kom i gang som utvikler"',
            },
          ],
          markDefs: [],
          style: "normal",
        },
        {
          _type: "related_pages",
        },
        {
          _type: "block",
          children: [
            {
              _type: "span",
              marks: [],
              text: "Sandbox",
            },
          ],
          markDefs: [],
          style: "h2",
        },
        {
          _type: "block",
          children: [
            {
              _type: "span",
              marks: ["draft_only"],
              text: "Sett inn sandbox",
            },
          ],
          markDefs: [],
          style: "normal",
        },
        {
          _type: "block",
          children: [
            {
              _type: "span",
              marks: [],
              text: "[Beskrivelse til sandbox om det er behov]",
            },
          ],
          markDefs: [],
          style: "normal",
        },
        {
          _type: "block",
          children: [
            {
              _type: "span",
              marks: [],
              text: "Installasjon",
            },
          ],
          markDefs: [],
          style: "h2",
        },
        {
          _type: "code_snippet",
        },
        {
          _type: "block",
          children: [
            {
              _type: "span",
              marks: [],
              text: "Retningslinjer",
            },
          ],
          markDefs: [],
          style: "h2",
        },
        {
          _type: "block",
          children: [
            {
              _type: "span",
              marks: [],
              text: "[Retningslinjer her]",
            },
          ],
          level: 1,
          listItem: "bullet",
          markDefs: [],
          style: "normal",
        },
        {
          _type: "block",
          children: [
            {
              _type: "span",
              marks: [],
              text: "Props",
            },
          ],
          markDefs: [],
          style: "h2",
        },
        {
          _type: "prop_table",
          extends: "HtmlDivElement",
          overridable: false,
          preset_children: true,
          preset_classname: true,
          refplacement: "root element",
        },
        {
          _type: "block",
          children: [
            {
              _type: "span",
              marks: ["draft_only"],
              text: "Om det finnes eksempler hvor denne komponenten er brukt i kode kan de listes opp her. Om det ikke finnes noen eksempler du kan linke til kan du slette denne seksjonen ↓",
            },
          ],
          markDefs: [],
          style: "normal",
        },
        {
          _type: "block",
          children: [
            {
              _type: "span",
              marks: [],
              text: "Live eksempler",
            },
          ],
          markDefs: [],
          style: "h2",
        },
        {
          _type: "block",
          children: [
            {
              _type: "span",
              marks: [],
              text: "[Beskrivelse på løsning og link til løsning]",
            },
          ],
          level: 1,
          listItem: "bullet",
          markDefs: [],
          style: "normal",
        },
        {
          _type: "block",
          children: [
            {
              _type: "span",
              marks: [],
              text: "Endringslogg",
            },
          ],
          markDefs: [],
          style: "h2",
        },
        {
          _type: "block",
          children: [
            {
              _type: "span",
              marks: [],
              text: "[Legg til endringslogg]",
            },
          ],
          markDefs: [],
          style: "normal",
        },
        {
          _type: "block",
          children: [
            {
              _type: "span",
              marks: [],
              text: "",
            },
          ],
          markDefs: [],
          style: "normal",
        },
      ],
      heading: "Ny komponentmal",
      ingress: [
        {
          _type: "block",
          children: [
            {
              _type: "span",
              marks: [],
              text: "[Skriv hva denne komponenten er. Fakta. Ikke hva den brukes til eller hvordan den brukes, det kommer i Bruk-tabben]",
            },
          ],
          markDefs: [],
          style: "normal",
        },
      ],
      metadata: {
        doctype: "article",
        last_update: "2021-12-08",
      },
      metadata_search: {
        high_priority: false,
      },
      slug: {
        _type: "slug",
        current: "designsystem/side/ny-komponentmal",
      },
      tags: ["core"],
      title: "Ny komponentmal",
      usage: [
        {
          _type: "block",
          children: [
            {
              _type: "span",
              marks: [],
              text: "Intro",
            },
          ],
          markDefs: [],
          style: "h2",
        },
        {
          _type: "block",
          children: [
            {
              _type: "span",
              marks: ["draft_only"],
              text: 'Dette blir komponenten brukt til, og slik fungerer den.\n(grunnen til at denne komponenten eksisterer)\n\n⚠️ Btw, tekst som ligger inne som "utkast" er en god blanding av placeholder og instruksjoner og kan slettes.',
            },
          ],
          markDefs: [],
        },
        {
          _type: "block",
          children: [
            {
              _type: "span",
              marks: [],
              text: "[Heading -> bytt ut med variantnavn]",
            },
          ],
          markDefs: [],
          style: "h2",
        },
        {
          _type: "block",
          children: [
            {
              _type: "span",
              marks: ["draft_only"],
              text: "Beskriv hvordan varianten av komponenten brukes.",
            },
          ],
          markDefs: [],
        },
        {
          _type: "block",
          children: [
            {
              _type: "span",
              marks: ["draft_only"],
              text: "Velg kodeeksempel ↓ som viser varianten.",
            },
          ],
          markDefs: [],
          style: "normal",
        },
        {
          _type: "code_example_ref",
        },
        {
          _type: "block",
          children: [
            {
              _type: "span",
              marks: ["draft_only"],
              text: "Det er supert om du kan vise bruken med en do&don't. Før du viser do&don't er det viktig å introdusere konseptet med tekst. Om det er flere do&don't konsepter dupliserer du denne seksjonen ↓",
            },
          ],
          markDefs: [],
          style: "normal",
        },
        {
          _type: "block",
          children: [
            {
              _type: "span",
              marks: [],
              text: "[Subheader til do&don't]",
            },
          ],
          markDefs: [],
          style: "h3",
        },
        {
          _type: "block",
          children: [
            {
              _type: "span",
              marks: [],
              text: "[Tekst som beskriver konseptet som vises med en do&don't]",
            },
          ],
          markDefs: [],
          style: "normal",
        },
        {
          _type: "do_dont",
        },
        {
          _type: "block",
          children: [
            {
              _type: "span",
              marks: [],
              text: "[Relatert innhold]",
            },
          ],
          markDefs: [],
          style: "h2",
        },
        {
          _type: "block",
          children: [
            {
              _type: "span",
              marks: ["draft_only"],
              text: "Bytt heading til hva slags relatert innhold det er ↑",
            },
          ],
          markDefs: [],
          style: "normal",
        },
        {
          _type: "related_pages",
        },
        {
          _type: "block",
          children: [
            {
              _type: "span",
              marks: [],
              text: "Tilgjengelighet i praksis",
            },
          ],
          markDefs: [],
          style: "h2",
        },
        {
          _type: "block",
          children: [
            {
              _type: "span",
              marks: ["draft_only"],
              text: "Avsnittene nedenfor er IKKE relevant for alle komponenter. Slett det som ikke er relevant for denne komponenten.",
            },
          ],
          markDefs: [],
          style: "normal",
        },
        {
          _type: "block",
          children: [
            {
              _type: "span",
              marks: [],
              text: "Label",
            },
          ],
          markDefs: [],
          style: "h3",
        },
        {
          _type: "block",
          children: [
            {
              _type: "span",
              marks: [],
              text: "[Beskrivelse]",
            },
          ],
          markDefs: [],
          style: "normal",
        },
        {
          _type: "block",
          children: [
            {
              _type: "span",
              marks: [],
              text: "Fokushåndtering",
            },
          ],
          markDefs: [],
          style: "h3",
        },
        {
          _type: "block",
          children: [
            {
              _type: "span",
              marks: [],
              text: "[Beskrivelse]",
            },
          ],
          markDefs: [],
          style: "normal",
        },
        {
          _type: "block",
          children: [
            {
              _type: "span",
              marks: [],
              text: "Interaksjon med mus",
            },
          ],
          markDefs: [],
          style: "h3",
        },
        {
          _type: "block",
          children: [
            {
              _type: "span",
              marks: [],
              text: "[Beskrivelse]",
            },
          ],
          markDefs: [],
          style: "normal",
        },
        {
          _type: "block",
          children: [
            {
              _type: "span",
              marks: [],
              text: "Interaksjon med tastatur",
            },
          ],
          markDefs: [],
          style: "h3",
        },
        {
          _type: "block",
          children: [
            {
              _type: "span",
              marks: [],
              text: "[Beskrivelse, tabell]",
            },
          ],
          markDefs: [],
          style: "normal",
        },
        {
          _type: "table",
          header_direction: "row",
          rows: [
            {
              _type: "row",
              cells: [
                {
                  _type: "cell",
                  alignment: "left",
                  body: [
                    {
                      _type: "block",
                      children: [
                        {
                          _type: "span",
                          marks: [],
                          text: "Kommando",
                        },
                      ],
                      markDefs: [],
                      style: "normal",
                    },
                  ],
                },
                {
                  _type: "cell",
                  alignment: "left",
                  body: [
                    {
                      _type: "block",
                      children: [
                        {
                          _type: "span",
                          marks: [],
                          text: "Beskrivelse",
                        },
                      ],
                      markDefs: [],
                      style: "normal",
                    },
                  ],
                },
              ],
            },
            {
              _type: "row",
              cells: [
                {
                  _type: "cell",
                  alignment: "left",
                  body: [
                    {
                      _type: "block",
                      children: [
                        {
                          _type: "span",
                          marks: ["kbd"],
                          text: "Enter",
                        },
                      ],
                      markDefs: [],
                      style: "normal",
                    },
                  ],
                },
                {
                  _type: "cell",
                  alignment: "left",
                  body: [
                    {
                      _type: "block",
                      children: [
                        {
                          _type: "span",
                          marks: [],
                          text: "Velger elementet.",
                        },
                      ],
                      markDefs: [],
                      style: "normal",
                    },
                  ],
                },
              ],
            },
          ],
          title: "Eksempeltabell",
        },
        {
          _type: "block",
          children: [
            {
              _type: "span",
              marks: [],
              text: "Interaksjon med skjermleser",
            },
          ],
          markDefs: [],
          style: "h3",
        },
        {
          _type: "block",
          children: [
            {
              _type: "span",
              marks: [],
              text: "[Beskrivelse]",
            },
          ],
          markDefs: [],
          style: "normal",
        },
      ],
    }),
  }),
];
