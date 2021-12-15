import React, { useContext } from "react";
import styled from "styled-components";
import { SandboxContext } from ".";

const ScPreWrapper = styled.div`
  position: relative;

  &[data-fullscreen="true"] {
    height: 40%;

    > pre {
      height: 100%;
    }
  }

  > pre {
    max-height: 400px;
    overflow-y: auto;
    position: relative;
    background-color: var(--navds-semantic-color-component-background-inverted);
    margin: 0;
  }
`;

const ScPre = styled.pre`
  font-family: var(--font-family-code);
  padding: 1rem;
  padding-right: 5rem;
  overflow-x: auto;

  > div {
    overflow-x: auto;
    color: var(--navds-semantic-color-text-inverted);
    max-width: 100%;
    font-family: var(--font-family-code) !important;
  }

  textarea {
    :focus-visible {
      outline-color: 1px solid
        var(--navds-semantic-color-component-background-inverted);
    }
  }
`;

const ScDiv = styled.div<{ fullscreen: boolean; inlineProps: boolean }>`
  display: flex;
  width: 100%;
  background-color: var(--navds-semantic-color-canvas-background);
  border: 1px solid var(--navds-global-color-gray-200);
  border-top: none;
  overflow-x: auto;
  position: relative;
  height: 400px;

  ${(props) => props.inlineProps && `padding-right: 250px;`}

  ${(props) =>
    props.fullscreen &&
    `display: flex;
    flex-direction: column;
    flex-grow: 3;

    > * {
      flex-grow: 1;
    }`}
`;

const ScInnerDiv = styled.div<{ inlineProps: boolean }>`
  gap: 1rem;
  padding: ${({ inlineProps }) => (inlineProps ? "2rem" : "1rem")}};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;

  &[data-bg="white"] {
    background-color: var(--navds-semantic-color-canvas-background-light);
  }

  &[data-bg="default"] {
    background-color: var(--navds-semantic-color-canvas-background);
  }
  &[data-bg="inverted"] {
    background-color: var(--navds-semantic-color-canvas-background-inverted);
  }
`;

export const PreviewWrapper = ({ children }: { children: React.ReactNode }) => {
  const { sandboxState } = useContext(SandboxContext);
  const inlineProps = sandboxState.inlineSettings && !!sandboxState.args;
  return (
    <ScDiv fullscreen={sandboxState.fullscreen} inlineProps={inlineProps}>
      <ScInnerDiv inlineProps={inlineProps}>{children}</ScInnerDiv>
    </ScDiv>
  );
};

export const EditorWrapper = ({ children }: { children: React.ReactNode }) => {
  const { sandboxState } = useContext(SandboxContext);
  return (
    <ScPreWrapper data-fullscreen={sandboxState.fullscreen}>
      <ScPre>{children}</ScPre>
    </ScPreWrapper>
  );
};
