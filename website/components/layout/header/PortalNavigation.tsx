import { Back, Expand } from "@navikt/ds-icons";
import { BodyShort, Label, Popover } from "@navikt/ds-react";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { useMedia } from "react-use";
import styled, { css } from "styled-components";
import { AmplitudeEvents, NavLogoWhite, useAmplitude } from "../..";
import NextLink from "next/link";

export const ScWrapper = styled.div`
  height: 100%;
  display: flex;
  z-index: 1050;
  margin-right: var(--navds-spacing-8);

  &[data-mobile="true"] {
    margin-right: 0;
  }
`;

const ScPopover = styled(Popover)`
  border-radius: 4px;
  border: none;
  width: 300px;
  max-width: 100%;
  z-index: 1100;
  box-shadow: 0 1px 3px 0 rgba(38, 38, 38, 0.2),
    0 2px 1px 0 rgba(38, 38, 38, 0.12), 0 1px 1px 0 rgba(38, 38, 38, 0.14);

  :focus {
    box-shadow: 0 1px 3px 0 rgba(38, 38, 38, 0.2),
      0 2px 1px 0 rgba(38, 38, 38, 0.12), 0 1px 1px 0 rgba(38, 38, 38, 0.14);
  }

  > * {
    border-radius: 4px;
    background-color: var(--navds-semantic-color-canvas-background-light);
  }

  > * > li:nth-child(2) {
    border-top: 1px solid var(--navds-semantic-color-border);
  }

  ul,
  li {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li:first-child > a {
    border-radius: 4px 4px 0 0;
  }

  li:last-child > a {
    border-radius: 0 0 4px 4px;
  }
`;

export const ScLinkCss = css`
  color: var(--navds-semantic-color-text);

  min-height: 5rem;
  width: 100%;
  display: flex;
  text-decoration: none;

  :hover {
    background-color: var(--navds-semantic-color-canvas-background);
  }

  :focus {
    box-shadow: inset 0 0 0 3px var(--navds-semantic-color-focus);
    z-index: 2;
    outline: none;
  }
`;

export const ScLink = styled.a`
  ${ScLinkCss}
  flex-direction: column;
  padding: 0.75rem 1rem 0.5rem 2rem;
  align-items: flex-start;

  &[data-active="true"] {
    border-left: 6px solid
      var(--navds-semantic-color-canvas-background-inverted);
    padding-left: calc(2rem - 6px);
    background-color: var(--navds-semantic-color-canvas-background);

    > :first-child {
      font-weight: 600;
    }
  }

  :focus {
    box-shadow: inset 0 0 0 3px var(--navds-semantic-color-focus);
    z-index: 2;
    outline: none;
  }
`;

export const ScIconLink = styled.a`
  ${ScLinkCss}
  flex-direction: row;
  align-items: center;
  min-height: 3.25rem;
  gap: 0.5rem;
  padding: 0.5rem;

  svg {
    font-size: 1rem;
  }

  :hover {
    text-decoration: underline;
  }
`;

const ScToggle = styled.button`
  gap: 1rem;

  @media (max-width: 564px) {
    min-width: unset;
  }

  > span {
    margin-top: 4px;
    display: flex;
    gap: 0.5rem;
    align-items: center;

    svg {
      font-size: 1rem;
    }
  }

  :focus {
    box-shadow: inset 0 0 0 1px
        var(--navds-semantic-color-component-background-inverted),
      inset 0 0 0 3px var(--navds-global-color-blue-200);
  }
`;

const ScOverlay = styled.div`
  width: 100vw;
  height: 100%;
  background-color: var(--navds-semantic-color-canvas-background-inverted);
  opacity: 0;
  position: fixed;
  top: var(--header-height);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition: opacity 200ms ease-in-out;
  visibility: hidden;
  z-index: 1010;

  &[data-visible="true"] {
    opacity: 0.5;
    visibility: visible;
  }
`;

const HeadingDropDown = ({ title }: { title: string }) => {
  const showLogo = useMedia("(min-width: 563px)", true);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null);
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
      <ScWrapper data-mobile={!showLogo}>
        <ScToggle
          ref={buttonRef}
          className="navdsi-dropdown__toggle navdsi-header__button"
          aria-haspopup="false"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
        >
          {showLogo && <NavLogoWhite focusable={false} />}
          <span>
            {title}
            <Expand aria-label="Åpne Portal-navigasjon" />
          </span>
        </ScToggle>

        <ScPopover
          onClose={() => setOpen(false)}
          anchorEl={buttonRef.current}
          open={open}
          arrow={false}
          placement={"bottom-start"}
          offset={8}
          className="animate-fadeIn"
        >
          <ul>
            <li>
              <NextLink href="/" passHref>
                <ScIconLink
                  onClick={(e) => {
                    setOpen(false);
                    logNavigation(e);
                  }}
                >
                  <Back aria-hidden aria-label="Gå til forsiden" />
                  <Label>Tilbake til Aksel</Label>
                </ScIconLink>
              </NextLink>
            </li>
            <li>
              <NextLink href="/designsystem" passHref>
                <ScLink
                  onClick={(e) => {
                    setOpen(false);
                    logNavigation(e);
                  }}
                  data-active={router.asPath.startsWith(`/designsystem`)}
                >
                  <BodyShort>Designsystemet</BodyShort>
                  <BodyShort size="small">
                    Informasjon omhandlende designsystemet
                  </BodyShort>
                </ScLink>
              </NextLink>
            </li>
          </ul>
        </ScPopover>
      </ScWrapper>
      <ScOverlay data-visible={open} />
    </>
  );
};

export default HeadingDropDown;
