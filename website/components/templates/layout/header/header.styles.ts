import { Popover as DsPopover } from "@navikt/ds-react";
import styled, { css } from "styled-components";
import { LayoutContextProps } from "../Layout";
import { SearchField as DsSearchField } from "@navikt/ds-react";

export const Header = styled.header<{ context: LayoutContextProps }>`
  height: ${(props) =>
    props.context.isMobile ? "fit-content" : "var(--header-height)"};
  flex-direction: ${(props) => (props.context.isMobile ? "column" : "row")};
  width: 100vw;
  z-index: 99;
  background-color: var(--navds-color-darkgray);
  grid-area: header / header / header;
  display: flex;
  align-items: center;
  top: 0;
  overflow-x: auto;
  padding: 0 1rem;
  padding: ${(props) => (props.context.isMobile ? "0" : "0 1rem")};
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

export const DropDownButton = styled.button`
  ${HeaderItem}
  background: none;
  border: none;
  /* border-right: 1px solid var(--navds-color-gray-60); */
`;

export const Link = styled.a<{ isMobile: boolean }>`
  ${HeaderItem}
  text-decoration: none;

  &[data-active] {
    box-shadow: inset 0 -3px 0 0 white;
  }
`;

export const Grow = styled.div`
  flex: 1 1;
`;

export const LinkRow = styled.div<{ context: LayoutContextProps }>`
  display: ${(props) => (props.context.isMobile ? "grid" : "flex")};
  height: 100%;
  width: 100%;
  grid-template-columns: repeat(4, 1fr);

  @media screen and (max-width: 550px) {
    grid-template-columns: repeat(2, 1fr);
  }

  > * {
    flex: ${(props) => (props.context.isMobile ? "1 1" : "")};
  }
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const Ul = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  margin: 0;
  width: 275px;
  gap: 0.5rem;

  li {
    list-style: none;
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

export const Popover = styled(DsPopover)`
  border: none;
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
