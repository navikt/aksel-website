import { Expand, Left } from "@navikt/ds-icons";
import { BodyShort } from "@navikt/ds-react";
import { Dropdown, Header } from "@navikt/ds-react-internal";
import { motion } from "framer-motion";
import NextLink from "next/link";
import * as React from "react";
import { useMedia } from "react-use";
import styled, { css } from "styled-components";
import { NavLogoWhite } from "../../..";

export const ScWrapper = styled.div`
  height: 100%;
  display: flex;
`;

export const ScMenu = styled(Dropdown.Menu)`
  padding: 0.5rem;
  border: none;
  width: 300px;
  z-index: 1003;
  box-shadow: 0 0 10px 0 rgba(24, 39, 75, 0.1), 0 0 6px 0 rgba(24, 39, 75, 0.12);
`;

export const ScLinkCss = css`
  color: var(--navds-color-gray-90);
  border-radius: 2px;
  padding: 0.5rem 1rem;
  min-height: 5rem;
  width: 100%;
  display: flex;
  text-decoration: none;

  :hover {
    background-color: var(--navds-color-blue-20);
  }

  :focus {
    box-shadow: inset 0 0 0 2px var(--navds-color-blue-50);
    z-index: 2;
    outline: none;
  }
`;

export const ScLink = styled(Dropdown.Menu.List.Item)`
  ${ScLinkCss}
  flex-direction: column;

  :hover > :first-child {
    color: var(--navds-color-blue-50);
  }

  > * {
    text-align: start;
  }
`;

export const ScIconLink = styled(Dropdown.Menu.List.Item)`
  ${ScLinkCss}
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const ScToggle = styled(Header.Button)`
  :focus {
    box-shadow: inset 0 0 0 1px var(--navds-color-gray-90),
      inset 0 0 0 3px var(--navds-color-blue-20);
  }
`;

const HeadingDropDown = ({ title }: { title: string }) => {
  const showLogo = useMedia("(min-width: 563px)");

  return (
    <ScWrapper
      as={motion.div}
      key="Portalmenu"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ type: "tween", duration: 0.2 }}
      exit={{ opacity: 0 }}
    >
      <Dropdown>
        <ScToggle forwardedAs={Dropdown.Toggle}>
          {showLogo && <NavLogoWhite focusable={false} />}
          {title}
          <Expand focusable={false} role="presentation" />
        </ScToggle>
        <ScMenu>
          <Dropdown.Menu.List>
            <NextLink href="/" passHref>
              <ScIconLink forwardedAs="a">
                <Left />
                <BodyShort>Tilbake til Verktøykassa</BodyShort>
              </ScIconLink>
            </NextLink>

            <NextLink href="/designsystem" passHref>
              <ScLink forwardedAs="a">
                <BodyShort>Designsystemet</BodyShort>
                <BodyShort size="small">
                  Informasjon omhandlende designsystemet
                </BodyShort>
              </ScLink>
            </NextLink>

            <NextLink href="/god-praksis" passHref>
              <ScLink forwardedAs="a">
                <BodyShort>God Praksis</BodyShort>
                <BodyShort spacing size="small">
                  Informasjon omhandlende God Praksis
                </BodyShort>
              </ScLink>
            </NextLink>
          </Dropdown.Menu.List>
        </ScMenu>
      </Dropdown>
    </ScWrapper>
  );
};
export default HeadingDropDown;
