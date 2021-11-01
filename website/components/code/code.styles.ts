import styled, { css } from "styled-components";

export const ButtonCss = css`
  border: none;
  color: var(--navds-color-gray-90);
  padding: 0.75rem 0.75rem;
  display: flex;
  align-items: center;
  column-gap: 0.5rem;
  background-color: transparent;
  min-width: 50px;
  justify-content: center;
  outline-offset: -2px;

  :hover {
    text-decoration: underline;
  }

  :focus {
    outline: 2px solid var(--navds-color-blue-80);
  }

  &[aria-selected="true"] {
    box-shadow: inset 0 -2px 0 0 var(--navds-color-gray-90);
  }
`;

/* Snippet/Block */
export const PreWrapper = styled.div<{ active: boolean }>`
  position: relative;
  background-color: var(--navds-color-gray-90);
  display: ${(props) => (props.active ? "block" : "none")};
  margin-bottom: var(--navds-spacing-8);
`;

export const Pre = styled.pre`
  overflow-x: auto;
  align-items: center;
  display: flex;
  /* background-color: var(--navds-color-darkgray); */
  margin: 0;
  padding: 1rem 1rem 1rem 1rem;

  &[data-tabs="true"] {
    max-width: 100%;
  }
`;

export const Code = styled.code`
  color: white;
  font-size: 1rem;
`;
