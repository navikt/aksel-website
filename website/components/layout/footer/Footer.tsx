import React from "react";
import { NavLogoWhite, ScrollTop } from "../..";
import FooterForm from "./FooterForm";
import cl from "classnames";

const Footer = ({ variant = "ds" }: { variant: "ds" | "aksel" }) => {
  return (
    <footer
      data-hj-suppress
      className={cl(
        "algolia-ignore-index flex w-full justify-center text-text-inverted",
        {
          "bg-deepblue-900": variant === "aksel",
          "bg-gray-900": variant === "ds",
        }
      )}
    >
      <div className="relative w-full max-w-aksel p-6 md:p-12">
        <ScrollTop />
        <div className="flex max-w-7xl flex-wrap justify-between gap-x-8 gap-y-12">
          <div className="max-w max-w-lg flex-auto">
            <div className="mb-16 inline-flex h-[49px] items-center text-2xl">
              <NavLogoWhite aria-hidden />
            </div>
          </div>
          <FooterForm />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
