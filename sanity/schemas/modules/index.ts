import GeneriskBlokk from "./generisk-blokk";
import GeneriskBlokkArtikkel from "./generisk-blokk-artikkel";
import Riktekst_artikkel from "./riktekst/riktekst-artikkel";
import Riktekst from "./riktekst/riktekst";
import RiktekstEnkel from "./riktekst/riktekst-enkel";
import RiktekstTabell from "./riktekst/riktekst-tabell";
import RiktekstBilde from "./riktekst/riktekst-bilde";
import RiktekstBildeEnkel from "./riktekst/riktekst-bilde-enkel";
import DoDontV2, { doDont } from "./do-dont";
import Bilde from "./bilde";
import Alert from "./alert";
import RelatertInnhold from "./relatert-innhold";
import Kode from "./kode";
import introKomponent from "./intro-komponent";
import liveDemo from "./live-demo";
import Tabell, { TabellSchema } from "./tabell";
import UU from "./uu";
import Anatomi from "./anatomi";
import Installasjon from "./installasjon";
import Props from "./props";
import Accordion from "./accordion";
import SpesialSeksjon from "./spesial-seksjon";
import Video from "./video";
import Tokens from "./tokens";
import Tips from "./tips";

const v2Blocks = [
  GeneriskBlokk,
  GeneriskBlokkArtikkel,
  Riktekst,
  DoDontV2,
  doDont,
  Bilde,
  RiktekstEnkel,
  RiktekstBilde,
  RiktekstBildeEnkel,
  Alert,
  Kode,
  RelatertInnhold,
  introKomponent,
  liveDemo,
  Tabell,
  ...TabellSchema,
  UU,
  Anatomi,
  Installasjon,
  Props,
  Accordion,
  RiktekstTabell,
  SpesialSeksjon,
  Video,
  Tokens,
  Tips,
  Riktekst_artikkel,
];

export default v2Blocks;
