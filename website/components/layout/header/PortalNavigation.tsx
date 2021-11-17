import { Expand, Left } from "@navikt/ds-icons";
import { BodyShort, Label, Popover } from "@navikt/ds-react";
import { motion } from "framer-motion";
import NextLink from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import { useRef, useState } from "react";
import { useMedia } from "react-use";
import styled, { css } from "styled-components";
import { fadeInCss, NavLogoWhite } from "../..";

export const ScWrapper = styled.div`
  height: 100%;
  display: flex;
`;

const ScPopover = styled(Popover)`
  ${fadeInCss}
  padding: 0.5rem 0;
  border: none;
  width: 300px;
  max-width: 100%;
  z-index: 1003;
  box-shadow: 0 1px 3px 0 rgba(38, 38, 38, 0.2),
    0 2px 1px 0 rgba(38, 38, 38, 0.12), 0 1px 1px 0 rgba(38, 38, 38, 0.14);

  > * {
    background-color: var(--navds-semantic-color-canvas-background-light);
  }

  > :nth-child(2) {
    border-top: 1px solid var(--navds-semantic-color-border-default);
  }
`;

export const ScLinkCss = css`
  color: var(--navds-semantic-color-text-default);

  min-height: 5rem;
  width: 100%;
  display: flex;
  text-decoration: none;

  :hover {
    background-color: var(--navds-semantic-color-canvas-background-default);
  }

  :focus {
    box-shadow: inset 0 0 0 3px var(--navds-semantic-color-focus);
    z-index: 2;
    outline: none;
  }
`;

export const ScLink = styled.li`
  ${ScLinkCss}
  flex-direction: column;
  padding: 0.75rem 1rem 0.5rem 2rem;
  align-items: flex-start;

  &[data-active="true"] {
    box-shadow: inset 6px 0 0 0
      var(--navds-semantic-color-canvas-background-inverted);
    background-color: var(--navds-semantic-color-canvas-background-default);

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

export const ScIconLink = styled.li`
  ${ScLinkCss}
  flex-direction: row;
  align-items: center;
  min-height: 3.25rem;
  gap: 0.5rem;
  padding: 0.5rem;
  margin-bottom: 0.5rem;

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
  height: calc(100vh - var(--header-height));
  background-color: var(--navds-semantic-color-canvas-background-inverted);
  opacity: 0;
  position: absolute;
  top: var(--header-height);
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  transition: opacity 200ms ease-in-out;
  visibility: hidden;

  &[data-visible="true"] {
    opacity: 0.5;
    visibility: visible;
  }
`;

const HeadingDropDown = ({ title }: { title: string }) => {
  const showLogo = useMedia("(min-width: 563px)");
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null);

  return (
    <>
      <ScWrapper
        as={motion.div}
        key="Portalmenu"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: "tween", duration: 0.2 }}
        exit={{ opacity: 0 }}
      >
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
        >
          <>
            <NextLink href="/" passHref>
              <ScIconLink forwardedAs="a">
                <Left aria-label="Gå til forsiden" />
                <Label>Tilbake til Verktøykassa</Label>
              </ScIconLink>
            </NextLink>
            <NextLink href="/designsystem" passHref>
              <ScLink
                data-active={router.asPath.startsWith(`/designsystem`)}
                forwardedAs="a"
              >
                <BodyShort>Designsystemet</BodyShort>
                <BodyShort size="small">
                  Informasjon omhandlende designsystemet
                </BodyShort>
              </ScLink>
            </NextLink>
          </>
        </ScPopover>
      </ScWrapper>
      <ScOverlay data-visible={open} />
    </>
  );
};
export default HeadingDropDown;
