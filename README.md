<h1 align="center">
    <img src="https://user-images.githubusercontent.com/26967723/164701858-e8237611-1285-4c68-b9e3-e047499b94cf.svg" />
    <br/>Aksel
</h1>

## Kom i gang

### Bidrag

Branch `main` blir pusher rett til prod og da aksel.nav.no. For å utvikle nye features brukes branch `NEXT` som
ved push publiseres til devmiljø aksel.dev.nav.no (krever naisdevice).

### Nettside (localhost:3000)

```
yarn install
yarn dev
```

For å se preview innhold kan man legge til `preview` i URL-en´.
Eks:

`/preview/designsystem/side/button´

### Sanity (localhost:3333)

> Note: Må være developer i https://verktoykasse.sanity.studio, Ta kontakt med Ken Aleksander Johansen nevnt under "Henvendelser" om det trengs.

Starter opp sanity-studioet lokalt. Husk at alle endringer i datasettet lokalt også gjøres i prod. Bytt derfor til `development`-dataset hvis man vil teste destruktive handlinger.

```
yarn install
yarn sanity
```

### .env

Blir brukt flere keys i .env under `./website`, men ingen av dem trengs for å teste lokalt

- SANITY_WRITE_KEY: Secret for å sende dokumenter til sanity, brukt til å oppdatere sanboxes/examples/farger
- ALGOLIA_ADMIN: Secret for å oppdatere records i søkemotoren. Gjøres automatisk i prod ved hjelp av Sanity-webhook hver gang et dokument endres. Trengs bare hvis man oppdaterer søkeindexen lokalt
- ALGOLIA_ID: Søkemotor algolia-index-id for å redigere riktig Index. ---||---
- TRELLO_TOKEN: Sender feedback til et egent trello-board. Ikke nødvendig lokalt hvis man ikke vil teste feedback-modulen.
- SENTRY_AUTH_TOKEN: Gir appen tilgang til Sentry-logging (er for tiden disabled, så ikke nødvendig lokalt)
- SANITY_PREVIEW_TOKEN: Gir appen tilgang til å lese draft innhold fra sanity i "preview"-mode
- SANITY_PRIVATE_NO_DRAFTS: Gir appen tilgang til å lese innhold fra Sanity da datasettet er privat

### Søk

Søk-index blir generert av algolia-scraper. Kjøres daglig i en github-action, men kan kjøres lokalt også med docker.

```
docker run -it --env-file=.env -e "CONFIG=$(cat crawler.json | jq -r tostring)" algolia/docsearch-scraper
```

## Henvendelser

Tar gjerne imot issues, men spørsmål og kontakt kan rettes til Ken Aleksander Johansen på slack eller mail: `ken.aleksander.johansen@nav.no`
