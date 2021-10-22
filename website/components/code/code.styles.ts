import styled, { css } from "styled-components";

/* Example */
export const Wrapper = styled.div`
  width: 100%;
  margin-bottom: var(--navds-spacing-12);
  display: flex;
  flex-direction: column;
`;

export const Example = styled.div`
  background-color: #f7f7f7;
  display: flex;
  justify-content: center;
  padding: 0;
  position: relative;
  border: 1px solid var(--navds-color-gray-20);
  border-bottom: none;

  :only-child {
    border-bottom: 1px solid var(--navds-color-gray-20);
  }
`;

export const ButtonCss = css`
  border: none;
  color: rgba(255, 255, 255, 0.85);
  padding: 0.75rem 0.75rem;
  display: flex;
  align-items: center;
  column-gap: 0.5rem;
  background-color: transparent;
  min-width: 50px;
  justify-content: center;

  :hover {
    background-color: var(--navds-color-gray-80);
  }

  :focus {
    outline: 2px solid white;
    outline-offset: -2px;
  }

  &[aria-selected="true"] {
    box-shadow: inset 0 -2px 0 0 white;
    color: white;
  }
`;

export const CopyButton = styled.button`
  ${ButtonCss}
  position: absolute;
  top: 3px;
  right: 8px;
  border-radius: 4px;
  background-color: var(--navds-color-darkgray);
  height: 48px;
  width: 4rem;

  display: flex;
  align-items: center;
  justify-content: center;

  > svg {
    font-size: 1.5rem;
  }
`;

/* Snippet/Block */
export const PreWrapper = styled.div<{ active: boolean }>`
  position: relative;
  background-color: var(--navds-color-darkgray);
  display: ${(props) => (props.active ? "block" : "none")};
  margin-bottom: var(--navds-spacing-8);
`;

export const Pre = styled.pre`
  overflow-x: auto;
  align-items: center;
  display: flex;
  background-color: var(--navds-color-darkgray);
  margin: 0;
  padding: 1rem 1rem 1rem 1rem;
`;

export const Code = styled.code`
  color: white;
  font-size: 1rem;
`;
