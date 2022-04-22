import { Back, Expand } from "@navikt/ds-icons";
import { BodyShort, Label } from "@navikt/ds-react";
import cl from "classnames";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { logNav, NavLogoWhite } from "../../..";
import AkselLogo from "../../../assets/AkselLogo";
import Toggle from "./Toggle";

const HeadingDropDown = ({ title }: { title: string }) => {
  const [open, setOpen] = useState(false);

  const { asPath } = useRouter();

  const logNavigation = (e) => {
    logNav(
      "portalnavigasjon",
      window.location.pathname,
      e.currentTarget.getAttribute("href")
    );
  };

  const Button = (
    <>
      {/* <NavLogoWhite focusable={false} className="hidden md:block" /> */}
      <AkselLogo focusable={false} className="hidden h-10 w-10 md:block" />
      <span className="mt-1 flex items-center gap-2 text-text-inverted">
        {title}
        <Expand
          className="text-medium"
          aria-label={`${open ? "Lukk" : "Åpne"} portal navigasjon`}
        />
      </span>
    </>
  );

  const menu = (
    <ul className="rounded text-text">
      <li>
        <NextLink href="/" passHref>
          <a
            className="flex items-center gap-2 rounded-t px-2 py-3 hover:bg-gray-50 hover:underline focus:shadow-focus-inset focus:outline-none"
            onClick={(e) => {
              setOpen(false);
              logNavigation(e);
            }}
          >
            <Back
              className="text-medium"
              aria-hidden
              aria-label="Gå til forsiden"
            />
            <Label>Tilbake til Aksel</Label>
          </a>
        </NextLink>
      </li>
      <li className=" border-t border-border">
        <NextLink href="/designsystem" passHref>
          <a
            className={cl(
              "flex flex-col items-start rounded-b pt-3 pr-4 pb-2 pl-8 hover:bg-gray-100 focus:shadow-focus-inset focus:outline-none",
              {
                "border-l-[6px] border-canvas-background-inverted bg-canvas-background pl-[26px]":
                  asPath.startsWith(`/designsystem`),
              }
            )}
            onClick={(e) => {
              setOpen(false);
              logNavigation(e);
            }}
          >
            <BodyShort className="font-semibold">Designsystemet</BodyShort>
            <BodyShort size="small">
              Informasjon omhandlende designsystemet
            </BodyShort>
          </a>
        </NextLink>
      </li>
    </ul>
  );

  return (
    <Toggle
      buttonContent={Button}
      menu={menu}
      open={open}
      setOpen={(v) => setOpen(v)}
    />
  );
};

export default HeadingDropDown;
