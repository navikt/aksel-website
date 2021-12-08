import styled, { css } from "styled-components";

export const ButtonCss = css`
  border: none;
  color: var(--navds-semantic-color-text-muted);
  padding: 0.75rem 0.75rem;
  display: flex;
  align-items: center;
  column-gap: 0.5rem;
  background-color: transparent;
  min-width: 50px;
  justify-content: center;
  outline-offset: -2px;
  position: relative;

  :before {
    opacity: 0;
    width: 30%;
    transition: opacity 0.25s ease-in-out, width 0.1s ease-in-out;
    content: "";
    position: absolute;
  }

  :hover {
    color: var(--navds-semantic-color-text);

    :before {
      content: "";
      width: 60%;
      height: 2px;
      background-color: var(--navds-semantic-color-text);
      bottom: 0.75rem;
      position: absolute;
      opacity: 1;
    }
  }

  :focus {
    outline: 2px solid var(--navds-semantic-color-focus);
  }

  &[aria-selected="true"] {
    color: var(--navds-semantic-color-text);

    :before {
      content: "";
      width: 60%;
      height: 2px;
      background-color: var(--navds-semantic-color-text);
      bottom: 0.75rem;
      position: absolute;
      opacity: 1;
    }
  }
`;

/* Snippet/Block */
export const PreWrapper = styled.div<{ active: boolean }>`
  position: relative;
  background-color: var(--navds-semantic-color-component-background-inverted);
  display: ${(props) => (props.active ? "block" : "none")};
  margin-bottom: var(--navds-spacing-7);
`;

export const Pre = styled.pre`
  overflow-x: auto;
  align-items: center;
  display: flex;
  margin: 0;
  padding: 1rem 1rem 1rem 1rem;

  &[data-tabs="true"] {
    max-width: 100%;
  }
`;

export const Code = styled.code`
  color: var(--navds-semantic-color-text-inverted);
  font-size: 1rem;
`;
