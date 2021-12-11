import React from "react";
import styled from "styled-components";

const ScPreWrapper = styled.div`
  position: relative;
  max-height: 400px;

  > pre {
    position: relative;
    background-color: var(--navds-semantic-color-component-background-inverted);
    margin: 0;
    margin-bottom: var(--navds-spacing-7);
  }
`;

const ScPre = styled.pre`
  font-family: var(--font-family-code);
  padding: 1rem;
  padding-right: 5rem;

  > div {
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

const ScDiv = styled.div`
  display: flex;
  width: 100%;
  background-color: var(--navds-semantic-color-canvas-background);
  border: 1px solid var(--navds-global-color-gray-200);
  border-top: none;
  overflow-x: auto;
  position: relative;
  min-height: 300px;
`;

const ScInnerDiv = styled.div`
  gap: 1rem;
  padding: 2rem;
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

export const PreviewWrapper = ({ children }: { children: React.ReactNode }) => (
  <ScDiv>
    <ScInnerDiv>{children}</ScInnerDiv>
  </ScDiv>
);

export const EditorWrapper = ({ children }: { children: React.ReactNode }) => (
  <ScPreWrapper>
    <ScPre>{children}</ScPre>
  </ScPreWrapper>
);
