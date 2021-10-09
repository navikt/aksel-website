import React from "react";
import { Left } from "@navikt/ds-icons";
import { BodyShort } from "@navikt/ds-react";
import NextLink from "next/link";
import styled from "styled-components";

const IconLink = styled.a`
  color: var(--navds-color-gray-90);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  text-decoration: none;
  gap: 1rem;
  margin: 0 1rem 1.5rem 1rem;
  border-bottom: 1px solid var(--navds-color-gray-20);

  :hover {
    text-decoration: underline;
  }

  :focus {
    outline: none;
    box-shadow: inset 0 0 0 3px var(--navds-color-blue-80);
  }
`;

const MobileSidebar = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <div>
      <NextLink href="/" passHref>
        <IconLink role="menuitem">
          <Left />
          <BodyShort>Tilbake til Verktøykassa</BodyShort>
        </IconLink>
      </NextLink>
      {children}
    </div>
  );
};

export default MobileSidebar;
