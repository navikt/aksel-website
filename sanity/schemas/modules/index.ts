import Accordion from "./accordion";
import Alert from "./alert";
import Anatomi from "./anatomi";
import Bilde from "./bilde";
import DoDontV2, { doDont } from "./do-dont";
import GeneriskBlokk from "./generisk-blokk";
import GeneriskBlokkArtikkel from "./generisk-blokk-artikkel";
import Installasjon from "./installasjon";
import introKomponent from "./intro-komponent";
import Kode from "./kode";
import liveDemo from "./live-demo";
import Props from "./props";
import RelatertInnhold from "./relatert-innhold";
import Riktekst from "./riktekst/riktekst";
import {
  RiktekstAksel,
  RiktekstDsArtikkel,
  RiktekstKomponent,
  RiktekstTabell,
  RiktekstEnkel,
} from "./riktekst/riktekst-artikkel";
import SpesialSeksjon from "./spesial-seksjon";
import Tabell, { TabellSchema } from "./tabell";
import Tastatur from "./tastatur";
import Tips from "./tips";
import Tokens from "./tokens";
import Video from "./video";

const v2Blocks = [
  /* Blocks */
  Riktekst,
  RiktekstEnkel,
  RiktekstAksel,
  RiktekstDsArtikkel,
  RiktekstKomponent,

  GeneriskBlokk,
  GeneriskBlokkArtikkel,
  DoDontV2,
  doDont,
  Bilde,
  Alert,
  Kode,
  RelatertInnhold,
  introKomponent,
  liveDemo,
  Tabell,
  ...TabellSchema,
  Anatomi,
  Installasjon,
  Props,
  Accordion,
  RiktekstTabell,
  SpesialSeksjon,
  Video,
  Tokens,
  Tips,
  Tastatur,
];

export default v2Blocks;
