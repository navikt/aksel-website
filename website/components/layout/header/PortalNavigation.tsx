import { Back, Expand } from "@navikt/ds-icons";
import { BodyShort, Label, Popover } from "@navikt/ds-react";
import cl from "classnames";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { AmplitudeEvents, NavLogoWhite, useAmplitude } from "../..";

const HeadingDropDown = ({ title }: { title: string }) => {
  const [open, setOpen] = useState(true);
  const [buttonRef, setButtonRef] = useState(null);
  const { logAmplitudeEvent } = useAmplitude();
  const { asPath } = useRouter();

  const logNavigation = (e) => {
    logAmplitudeEvent(AmplitudeEvents.navigasjon, {
      kilde: "portalnavigasjon",
      fra: asPath,
      til: e.currentTarget.getAttribute("href"),
    });
  };

  return (
    <>
      <div className="z-[1050] mr-0 flex h-full md:mr-8">
        <button
          ref={setButtonRef}
          aria-haspopup="false"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          className="navdsi-dropdown__toggle navdsi-header__button gap-4 focus:shadow-[inset_0_0_0_1px_var(--navds-semantic-color-component-background-inverted),inset_0_0_0_3px_var(--navds-global-color-blue-200)]"
        >
          <NavLogoWhite focusable={false} className="hidden md:block" />
          <span className="mt-1 flex items-center gap-2 text-text-inverted">
            {title}
            <Expand
              className="text-medium"
              aria-label={`${open ? "Lukk" : "Åpne"} portal navigasjon`}
            />
          </span>
        </button>
        <Popover
          onClose={() => setOpen(false)}
          anchorEl={buttonRef}
          open={open}
          arrow={false}
          placement={"bottom-start"}
          offset={8}
          className="z-[1100] w-80 max-w-full animate-fadeIn rounded border-none bg-component-background-light shadow-card"
        >
          <ul className="rounded">
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
                  <BodyShort className="font-semibold">
                    Designsystemet
                  </BodyShort>
                  <BodyShort size="small">
                    Informasjon omhandlende designsystemet
                  </BodyShort>
                </a>
              </NextLink>
            </li>
          </ul>
        </Popover>
      </div>

      <div
        className={cl(
          "fixed inset-0 z-[1010] h-full w-screen bg-gray-900 transition-opacity",
          { "visible opacity-50": open, "invisible opacity-0": !open }
        )}
      />
    </>
  );
};

export default HeadingDropDown;
