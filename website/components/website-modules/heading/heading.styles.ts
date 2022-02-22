import styled from "styled-components";

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
  margin-top: -4px;

  > * {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  :focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--navds-semantic-color-focus);
  }

  :hover,
  :focus {
    background-color: var(
      --navds-semantic-color-component-background-alternate
    );
    opacity: 1;
  }

  :active {
    background-color: var(--navds-global-color-blue-50);
  }

  @media (max-width: 564px) {
    margin: 0;
  }
`;
