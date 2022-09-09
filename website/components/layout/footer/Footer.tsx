import React from "react";
import { EditButton, NavLogoWhite, ScrollTop } from "../..";
import FooterForm from "./FooterForm";
import cl from "classnames";

const Footer = ({ variant = "ds" }: { variant: "ds" | "aksel" }) => {
  return (
    <footer
      data-hj-suppress
      className={cl(
        "algolia-ignore-index relative flex w-full justify-center px-4  text-text-inverted",
        {
          "bg-deepblue-900": variant === "aksel",
          "bg-gray-900": variant === "ds",
        }
      )}
    >
      <ScrollTop />
      <div className="relative mx-auto w-full max-w-aksel py-8 xs:w-[90%]">
        <div className="flex items-start justify-between">
          <div className="mb-16 inline-flex h-[49px] items-center text-2xl">
            <NavLogoWhite aria-hidden />
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-12">
          <FooterForm />
        </div>
      </div>
      <EditButton variant={variant} />
    </footer>
  );
};

export default Footer;
