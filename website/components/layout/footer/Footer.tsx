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
        </div>
        <FooterForm />
      </div>
    </footer>
  );
};

export default Footer;
