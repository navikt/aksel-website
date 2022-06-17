import React from "react";
import { NavLogoWhite, ScrollTop } from "../..";
import FooterForm from "./FooterForm";
import cl from "classnames";

const Footer = ({ variant = "ds" }: { variant: "ds" | "aksel" }) => {
  return (
    <footer
      data-hj-suppress
      className={cl(
        "algolia-ignore-index flex w-full justify-center px-4 py-8 text-text-inverted",
        {
          "bg-deepblue-900": variant === "aksel",
          "bg-gray-900": variant === "ds",
        }
      )}
    >
      <div className="relative mx-auto w-full max-w-aksel xs:w-[90%]">
        <div className="flex items-start justify-between">
          <div className="mb-16 inline-flex h-[49px] items-center text-2xl">
            <NavLogoWhite aria-hidden />
          </div>
          <ScrollTop />
        </div>
        <div className="flex flex-wrap justify-between gap-12">
          <FooterForm />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
