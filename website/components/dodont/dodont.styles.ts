import styled from "styled-components";

export const Figure = styled.figure`
  display: flex;
  flex-direction: column;
  margin: 0;
  flex-basis: 300px;
  flex-shrink: 0;

  &[data-fullwidth="true"] {
    flex-basis: 100%;
    min-width: 300px;
  }

  img {
    border-radius: 4px 4px 0 0;
  }
`;

export const Section = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 2rem;
`;

export const FigureBorder = styled.div`
  border: 1px solid #c9c9c9;
  border-bottom: none;
  border-radius: 4px 4px 0 0;
`;

export const Caption = styled.figcaption`
  border-top: var(--navds-spacing-3) solid;
  border-color: ${(props) => {
    switch (props["data-variant"]) {
      case "do":
        return "var(--navds-color-green-50)";
      case "dont":
        return "var(--navds-color-red-50)";
      case "warning":
        return "var(--navds-color-orange-50)";
      default:
    }
  }};

  *:first-child {
    margin-top: 1rem;
  }
`;
