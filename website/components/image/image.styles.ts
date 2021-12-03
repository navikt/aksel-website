import styled from "styled-components";

export const Figure = styled.figure`
  display: flex;
  flex-direction: column;
  margin: 0;
  margin-bottom: var(--navds-spacing-7);
`;

export const Image = styled.button`
  background-color: var(--navds-global-color-gray-50);
  border: 1px solid var(--navds-semantic-color-divider);
  padding: 0;

  :focus {
    outline: none;
    box-shadow: 0 0 0 3px var(--navds-semantic-color-focus);
  }
`;

export const Caption = styled.figcaption`
  margin-top: var(--navds-spacing-2);
  font-style: italic;
`;

export const TextImage = styled.div<{ placement: "right" | "left" }>`
  background-color: var(--navds-global-color-gray-50);
  border: 1px solid var(--navds-semantic-color-divider);
  width: 300px;

  ${({ placement }) =>
    placement === "left"
      ? `
      margin-right: 1.5rem;
      margin-bottom: 1.5rem;
      float: left;`
      : `
      float: right;
      margin-left: 1.5rem;
      margin-bottom: 1.5rem;`}

  @media (max-width: 564px) {
    float: none;
  }
`;
