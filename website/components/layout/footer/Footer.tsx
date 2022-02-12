import { BodyLong } from "@navikt/ds-react";
import React from "react";
import { NavLogoWhite, ScrollTop } from "../..";
import FooterForm from "./FooterForm";

const Footer = () => {
  return (
    <footer className="index-ignore relative w-full bg-canvas-background-inverted p-6 text-text-inverted lg:p-12">
      <ScrollTop />
      <div className="flex max-w-7xl flex-wrap justify-between gap-x-8 gap-y-12">
        <div className="max-w-lg flex-auto">
          <div className="mb-16 inline-flex h-[49px] items-center text-2xl">
            <NavLogoWhite aria-hidden />
          </div>
          <BodyLong spacing>
            Aksel holdes ved like med bidrag fra produkt-team. Derfor er “døra”
            åpen hele tiden. Huk tak i oss på kontoret, på video eller send oss
            en melding.
          </BodyLong>
          <BodyLong>Takk til alle som bidrar!</BodyLong>
        </div>
        <FooterForm />
      </div>
    </footer>
  );
};

export default Footer;
