import styled from "styled-components";

export const Icon = styled.div<{ variant: string }>`
  display: flex;
  gap: 0.5rem;
  font-style: italic;

  > svg {
    vertical-align: top;
    flex-shrink: 0;
    font-size: 1.25rem;
    color: ${(props) => {
      switch (props.variant) {
        case "do":
          return `var(--navds-semantic-color-feedback-success-icon)`;
        case "warning":
          return `var(--navds-semantic-color-feedback-warning-icon)`;
        default:
          return `var(--navds-semantic-color-feedback-danger-icon)`;
      }
    }};
    ${(props) =>
      props.variant === "warning" &&
      `background: radial-gradient( circle, var(--navds-semantic-color-component-background-inverted) 50%, 0, transparent );`}
  }
`;

export const Figure = styled.figure`
  display: flex;
  flex-direction: column;
  margin: 0;
  width: 300px;
  max-width: 400px;
  flex-grow: 1;
  min-width: 300px;

  &[data-fullwidth="true"] {
    flex-basis: 100%;
    max-width: 100%;
  }

  img {
    border-radius: 4px 4px 0 0;
  }
`;

export const Section = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 2rem;
  row-gap: 2rem;
  margin-bottom: 2rem;
`;

export const FigureBorder = styled.button`
  box-shadow: 0 0 0 1px var(--navds-semantic-color-divider) inset;
  box-sizing: box-content;
  border-radius: 4px 4px 0 0;
  background: var(--navds-global-color-gray-50);
  padding: 0;

  :focus {
    outline: none;
    box-shadow: 0 0 0 3px var(--navds-semantic-color-focus);
    z-index: 1;
  }
`;

export const Caption = styled.figcaption`
  border-top: var(--navds-spacing-2) solid;
  border-color: ${(props) => {
    switch (props["data-variant"]) {
      case "do":
        return "var(--navds-semantic-color-feedback-success-icon)";
      case "dont":
        return "var(--navds-semantic-color-feedback-danger-icon)";
      case "warning":
        return "var(--navds-semantic-color-feedback-warning-icon)";
      default:
    }
  }};

  > *:first-child {
    margin-top: 1rem;
  }
`;
