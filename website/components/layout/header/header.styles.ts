import { Popover, SearchField as DsSearchField } from "@navikt/ds-react";
import { Header as DsHeader } from "@navikt/ds-react-internal";
import styled, { css } from "styled-components";

export const Header = styled(DsHeader)`
  height: 64px;
  position: relative;
`;

export const Links = styled.div`
  display: flex;
  margin-right: auto;

  a.navdsi-header__title[data-active="true"]:hover {
    background-color: white;
  }
`;

export const Link = styled(DsHeader.Title)<{ $active: boolean }>`
  padding: 0 var(--navds-spacing-2);
  white-space: nowrap;
  border-right: none;
  min-width: 64px;
  justify-content: center;
  align-items: center;
  padding-top: 4px;
  cursor: pointer;

  :focus {
    box-shadow: inset 0 0 0 1px var(--navds-color-gray-90),
      inset 0 0 0 3px var(--navds-color-blue-20);
  }

  &[data-active="true"] {
    box-shadow: inset 0 0 0 1px var(--navds-color-gray-90);
    background-color: white;
    color: var(--navds-color-gray-90);

    :focus {
      box-shadow: inset 0 0 0 1px var(--navds-color-gray-90),
        inset 0 0 0 2px white, inset 0 0 0 4px var(--navds-color-gray-90);
    }

    > * {
      align-items: center;
      justify-content: center;
      display: flex;
      gap: 1rem;
    }
  }
`;

export const HeaderItem = css<{ $isTablet: boolean }>`
  height: 100%;
  display: flex;
  align-items: center;
  padding: ${(props) => (props.$isTablet ? "0 0.75rem" : "0 0.75rem")};
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

export const DropdownButton = styled.button`
  min-width: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  margin-left: auto;
`;

export const MobileMenu = styled(Popover)`
  padding: 1rem;
  border: none;
  overflow-y: scroll;
  height: calc(100vh - 64px);
  width: 600px;
  max-width: 100%;
  box-shadow: none;
  border-radius: 0;
`;

export const MenuOverlay = styled.div<{ $open: boolean }>`
  top: 64px;
  height: 100%;
  width: 100%;
  position: absolute;
  ${(props) => !props.$open && `display: none;`};
`;

/* HeaderSearchBar */
export const SearchButton = styled.button<{ $isTablet: boolean }>`
  ${HeaderItem}
  text-decoration: none;
  background: none;
  border: none;
`;

export const SearchField = styled(DsSearchField)<{
  $isTablet: boolean;
  open: boolean;
}>`
  display: ${(props) => (props.open ? "flex" : "none")};
  align-items: center;
  width: 350px;
  flex: 1 1;
  margin-left: 1rem;

  > .navds-search-field__input-wrapper {
    width: 100%;
  }

  > * input {
    border: none;
  }
`;
