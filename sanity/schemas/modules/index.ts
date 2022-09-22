import Accordion from "./accordion";
import Alert from "./alert";
import Anatomi from "./anatomi";
import Bilde from "./bilde";
import DoDont, { doDontBlock } from "./do-dont";
import Installasjon from "./installasjon";
import introKomponent from "./intro-komponent";
import Kode from "./kode";
import liveDemo from "./live-demo";
import Props from "./props";
import RelatertInnhold from "./relatert-innhold";
import Innholdskort from "./innholdskort";
import KodeEksempler from "./kode-eksempler";
import {
  RiktekstAksel,
  RiktekstDsArtikkel,
  RiktekstEnkel,
  RiktekstKomponent,
  RiktekstTabell,
  RiktekstPrinsipp,
} from "./riktekst";
import SpesialSeksjon from "./spesial-seksjon";
import Tabell, { TabellSchema } from "./tabell";
import Tastatur from "./tastatur";
import Tips from "./tips";
import Tokens from "./tokens";
import Video from "./video";

const v2Blocks = [
  /* Blocks */
  RiktekstEnkel,
  RiktekstAksel,
  RiktekstDsArtikkel,
  RiktekstKomponent,
  RiktekstTabell,
  RiktekstPrinsipp,

  /* Moduler */
  DoDont,
  doDontBlock,
  Bilde,
  Alert,
  Kode,
  RelatertInnhold,
  Innholdskort,
  introKomponent,
  liveDemo,
  Tabell,
  ...TabellSchema,
  Anatomi,
  Installasjon,
  Props,
  Accordion,
  SpesialSeksjon,
  Video,
  Tokens,
  Tips,
  Tastatur,
  KodeEksempler,
];

export default v2Blocks;
