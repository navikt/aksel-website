import { Header as DsHeader } from "@navikt/ds-react-internal";
import styled, { css } from "styled-components";
import { SearchField as DsSearchField } from "@navikt/ds-react";

export const Links = styled.div`
  display: flex;
  margin-left: auto;
  margin-right: auto;
`;

export const Link = styled(DsHeader.Title)`
  padding: 0 var(--navds-spacing-2);
  white-space: nowrap;
  border-right: none;
  min-width: 64px;
  justify-content: center;
  align-items: center;
`;

export const HeaderItem = css<{ isMobile: boolean }>`
  height: 100%;
  display: flex;
  align-items: center;
  padding: ${(props) => (props.isMobile ? "0 0.75rem" : "0 0.75rem")};
  color: white;
  column-gap: 0.5rem;
  height: 100%;
  min-height: 64px;
  min-width: 64px;
  justify-content: center;

  > * {
    transition: box-shadow 75ms;
  }

  :hover {
    background-color: var(--navds-color-gray-80);
  }

  :focus {
    outline: 2px solid white;
    outline-offset: -2px;
  }

  svg {
    flex-shrink: 0;
  }
`;

export const LinkCss = css`
  color: var(--navds-color-gray-90);
  border-radius: 2px;
  padding: 0.5rem 1rem;
  height: 5rem;
  width: 100%;
  display: flex;
  text-decoration: none;

  :hover {
    background-color: var(--navds-color-blue-10);
  }

  :focus {
    box-shadow: inset 0 0 0 2px var(--navds-color-blue-50);
    z-index: 2;
    outline: none;
  }
`;

export const DropDownLink = styled.a`
  ${LinkCss}
  flex-direction: column;

  :hover > :first-child {
    color: var(--navds-color-blue-50);
  }

  > * {
    text-align: start;
  }
`;

export const DropDownIconLink = styled.a`
  ${LinkCss}
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

export const Menu = styled(DsHeader.Dropdown.Menu)`
  padding: 0.5rem;
`;

/* HeaderSearchBar */
export const SearchButton = styled.button<{ isMobile: boolean }>`
  ${HeaderItem}
  text-decoration: none;
  background: none;
  border: none;
`;

export const SearchField = styled(DsSearchField)<{ isMobile: boolean }>`
  display: flex;
  align-items: center;
  width: 350px;

  > .navds-search-field__input-wrapper {
    width: 100%;
  }

  > * input {
    border: none;
  }
`;
