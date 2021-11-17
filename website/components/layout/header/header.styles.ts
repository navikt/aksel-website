import { Popover, SearchField as DsSearchField } from "@navikt/ds-react";
import { Header as DsHeader } from "@navikt/ds-react-internal";
import styled, { css } from "styled-components";

export const Header = styled(DsHeader)`
  height: var(--header-height);
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
  min-width: var(--header-height);
  justify-content: center;
  align-items: center;
  padding-top: 4px;
  cursor: pointer;

  :focus {
    box-shadow: inset 0 0 0 1px
        var(--navds-semantic-color-canvas-background-inverted),
      inset 0 0 0 3px var(--navds-global-color-blue-200);
  }

  &[data-active="true"] {
    box-shadow: inset 0 0 0 1px
      var(--navds-semantic-color-canvas-background-inverted);
    background-color: white;
    color: var(--navds-semantic-color-text-default);

    :focus {
      box-shadow: inset 0 0 0 1px
          var(--navds-semantic-color-canvas-background-inverted),
        inset 0 0 0 2px white,
        inset 0 0 0 4px var(--navds-semantic-color-canvas-background-inverted);
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
  min-height: var(--header-height);
  min-width: var(--header-height);
  justify-content: center;

  > * {
    transition: box-shadow 75ms;
  }

  :hover {
    background-color: var(--navds-global-color-gray-800);
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
  color: var(--navds-semantic-color-text-default);
  border-radius: 2px;
  padding: 0.5rem 1rem;
  min-height: 5rem;
  width: 100%;
  display: flex;
  text-decoration: none;

  :hover {
    background-color: var(--navds-global-color-blue-200);
  }

  :focus {
    box-shadow: inset 0 0 0 2px var(--navds-semantic-color-text-link);
    z-index: 2;
    outline: none;
  }
`;

export const DropdownButton = styled.button`
  min-width: var(--header-height);
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
  height: calc(100vh - var(--header-height));
  width: 600px;
  max-width: 100%;
  box-shadow: none;
  border-radius: 0;
`;

export const MenuOverlay = styled.div<{ $open: boolean }>`
  top: var(--header-height);
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
