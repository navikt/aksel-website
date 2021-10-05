import { Heading } from "@navikt/ds-react";
import styled from "styled-components";

export const TitleWithScrollMargin = styled(Heading)`
  scroll-margin-top: 5rem;
  display: inline-flex;
  align-items: center;
`;

export const Divider = styled.div<{ divider?: boolean }>`
  padding: 0 6rem;
  margin-left: auto;
  margin-right: auto;
  margin-top: 3rem;
  margin-bottom: 3rem;

  ${(props) =>
    props.divider
      ? ``
      : `:first-child {
  display: none;
}`}
`;

export const Hr = styled.hr`
  border: 1px solid rgb(201, 201, 201, 0.4);
  margin: 0;
`;

export const Anchor = styled.button`
  background-color: transparent;
  border: none;
  display: inline-block;
  margin-left: 0.5rem;
  font-size: 1.25rem;
  height: 44px;
  width: 44px;
  padding: 0.5rem;
  outline: none;
  border-radius: 50%;
  opacity: 0.5;
  transition: opacity 100ms;

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
