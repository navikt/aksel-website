## TODO

> rekkefølge ikke satt etter prioritet!

- TS-type sanity-schema sider?
- Flytte Queries, sanity client jobber ut i egen fil.
- Lage sanity-schema templates for artikkelsider
- Validate URL for komponent-eksempel URL i `sanity/schemas/objects/code-example.js`
- Endre Changelog til liste med Accordions?
- Sidebar-state for mobil
- Lage alle kode-eksempler i storybook.
- Lage dashboard for sanity.
- Tagge santy-dokumenter basert på om de er "gått ut på dato" i santy.
- Cache docker-image for raskere buildtimes i github-actions.
- Finne en metode å hente ut hvilken args en story bruker, for da å kunne endre dem i code-preview. Kan da lage en live demo som her: https://www.carbondesignsystem.com/components/button/usage/#live-demo
- Løse hvordan man enforcer at bilder har visse størrelser?
- Refactore mye av style-komponents koden. Kan ting flyttes høyere opp i strykturen og gjennbrukes?
- Rydde opp i ubrukte dependencies for alle workspaces.
- Less-støtte i storybook
- Active styling på acrive TOC-element (low prio)

### Design

- Design layout. Fixed header? Scroller sidebar med content?
- Design komponentsider
- Design artikkelsider
- Design Tabs for side-nav
- Design Sidebar
- Design Header
- Design Table of contents
- Footer?

### Unike sider (ikke template)

> Løses dette ved at hver av disse bare er en komponent i sanity-blockcontent?

- Fargeside (vise palette)
- Ikonside
- Typo side? (kan evt bare være en artikkel)

## BUGS

- Storybook-build med `--watch` mode fungerer ikke nå, så `watch-run` brukes istedenfor. Fikse slik at watch-mode fungerer da buildtimes antagelig vil være raskere for storybook da.

- Redirect fra /storybook -> /stroybook/index.html fungerer ikke i next.config.js, noe som gjør at bruker må gå til selve index.html siden..

- Ikke alle komponenter under /components sjekker at de propsene de trenger faktisk er gitt fra sanity i `preview-mode`. Eks et felt kan være required i santy, men siden preview-mode vises så prøves det å rendre siden/innholdet uansett. Kan da ende opp med å forsøke rendring av uferdige felt. Gjelder bare preview mode, da sanity-sider ikke kan være published før required-felt er fylt.
