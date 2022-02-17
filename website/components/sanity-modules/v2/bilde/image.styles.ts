import styled from "styled-components";

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
    margin: 0;
    margin-bottom: 1.5rem;
    float: none;
  }

  @media (max-width: 400px) {
    width: 100%;
  }
`;
