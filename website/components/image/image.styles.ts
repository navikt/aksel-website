import styled from "styled-components";

export const Figure = styled.figure`
  display: flex;
  flex-direction: column;
  margin: 0;
  margin-bottom: var(--navds-spacing-12);
`;

export const Image = styled.button`
  background-color: #f7f7f7;
  border: 1px solid var(--navds-color-gray-20);

  :focus {
    outline: none;
    box-shadow: 0 0 0 3px var(--navds-color-blue-80);
  }

  /* width: 100%; */

  > div {
    /*  position: unset !important; */
  }

  img {
    /* object-fit: contain;
    width: 100% !important;
    position: relative !important;
    height: unset !important; */
  }
`;

export const Caption = styled.figcaption`
  margin-top: var(--navds-spacing-2);
  align-self: center;
  font-style: italic;
`;

/* With text */

export const Wrapper = styled.div`
  /* display: flex;
  flex-wrap: wrap; */
`;

export const TextWrapper = styled.div``;

export const TextImage = styled.div<{ placement: "right" | "left" }>`
  background-color: #f7f7f7;
  border: 1px solid var(--navds-color-gray-20);
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
