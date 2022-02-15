import GeneriskBlokk from "./generisk-blokk";
import Riktekst from "./riktekst/riktekst";
import RiktekstEnkel from "./riktekst/riktekst-enkel";
import DoDontV2 from "./do-dont";
import Bilde from "./bilde";
import Alert from "./alert";
import RelatertInnhold from "./relatert-innhold";
import Kode from "./kode";
import introKomponent from "./intro-komponent";
import liveDemo from "./live-demo";
import Tabell from "./table";

const v2Blocks = [
  GeneriskBlokk,
  Riktekst,
  DoDontV2,
  Bilde,
  RiktekstEnkel,
  Alert,
  Kode,
  RelatertInnhold,
  introKomponent,
  liveDemo,
  ...Tabell,
];

export default v2Blocks;
