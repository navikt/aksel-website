import { Heading } from "@navikt/ds-react";
import styled from "styled-components";

export const TitleWithScrollMargin = styled(Heading)`
  scroll-margin-top: 5rem;
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
`;

export const Anchor = styled.button`
  background-color: transparent;
  border: none;
  display: inline-block;
  margin-left: 0.5rem;
  font-size: 1.25rem;
  height: 44px;
  min-width: 44px;
  padding: 0.5rem;
  outline: none;
  border-radius: 50%;
  opacity: 0.5;
  transition: opacity 100ms;
  align-self: flex-start;

  > * {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  :focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--navds-color-blue-80);
  }

  :hover,
  :focus {
    background-color: var(--navds-color-gray-10);
    opacity: 1;
  }

  :active {
    background-color: var(--navds-color-blue-10);
  }
`;
