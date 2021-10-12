import styled from "styled-components";

export const Figure = styled.figure`
  display: flex;
  flex-direction: column;
  margin: 0;
  margin-bottom: var(--navds-spacing-12);
`;

export const Image = styled.div`
  background-color: #f7f7f7;
  border: 1px solid var(--navds-color-gray-20);
`;

export const Caption = styled.figcaption`
  margin-top: var(--navds-spacing-2);
  align-self: center;
  font-style: italic;
`;
