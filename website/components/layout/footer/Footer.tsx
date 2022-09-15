import React from "react";
import { EditButton, NavLogoWhite, ScrollTop } from "../..";
import FooterForm from "./FooterForm";
import cl from "classnames";
import { Label, BodyShort, Link, Heading } from "@navikt/ds-react";
import NextLink from "next/link";

const Footer = ({ variant = "ds" }: { variant: "ds" | "aksel" }) => {
  return (
    <footer
      data-hj-suppress
      data-theme="dark"
      className={cl(
        "algolia-ignore-index relative flex w-full justify-center px-4  text-text-inverted",
        {
          "bg-deepblue-900": variant === "aksel",
          "bg-gray-900": variant === "ds",
        }
      )}
    >
      <div className="dynamic-wrapper relative w-full py-12">
        <div className="footer-grid-3-1">
          <ScrollTop />
          <div>
            <Heading as="p" size="small">
              Til toppen
            </Heading>
            <BodyShort as="ul" className="mt-5 grid gap-2">
              <li>
                <Link
                  className="text-text-inverted focus:bg-blue-200 focus:text-text focus:shadow-focus focus:shadow-blue-200"
                  href="https://nav-it.slack.com/archives/C0370ADS0HX"
                >
                  Aksel på Slack
                </Link>
              </li>
              <li>
                <Link
                  className="text-text-inverted focus:bg-blue-200 focus:text-text focus:shadow-focus focus:shadow-blue-200"
                  href="https://nav-it.slack.com/archives/C7NE7A8UF"
                >
                  Designsystemet på Slack
                </Link>
              </li>
              <li>🏃 ...eller stikk innom</li>
            </BodyShort>
          </div>
          <FooterForm />
        </div>
        <div className="footer-grid-3-1">
          <div>
            &copy; 2022 NAV |{" "}
            <NextLink href="/side/personvernerklaering" passHref>
              <a className=" outline-none hover:underline focus:bg-focus-inverted focus:text-text focus:no-underline focus:ring focus:ring-focus-inverted">
                Personvernerklæring og informasjonskapsler
              </a>
            </NextLink>
          </div>
        </div>
        {/* <div className="flex items-start justify-between">
          <div className="mb-16 inline-flex h-[49px] items-center text-2xl">
            <NavLogoWhite aria-hidden />
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-12">
        <FooterForm />
        </div> */}
      </div>
      <EditButton variant={variant} />
    </footer>
  );
};

export default Footer;
