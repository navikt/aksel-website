import { NewTab } from "@navikt/ds-icons";
import React, { useContext } from "react";
import { CodeContext } from "./Example";
import * as S from "../code.styles";
import styled from "styled-components";
import CopyButton from "../CopyButton";
import ColorPicker from "../../sandbox/ColorPicker";

export const ScTabs = styled.div`
  background-color: var(--navds-semantic-color-canvas-background-light);
  padding: 1px;
  min-height: 50px;

  display: flex;
  justify-content: space-between;
  border: 1px solid var(--navds-semantic-color-divider);

  ul,
  li {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
  }
`;

const ScFlex = styled.div`
  display: flex;

  svg {
    font-size: 1.5rem;
  }
`;

const ScLinkButton = styled.a`
  ${S.ButtonCss}
  text-decoration: none;
  color: var(--navds-semantic-color-text-muted);

  ::before {
    content: none;
  }

  :hover {
    background-color: var(
      --navds-semantic-color-interaction-primary-hover-subtle
    );
    ::before {
      content: none;
    }
  }

  :focus {
    text-decoration: underline;
  }
`;

export const ScButton = styled.button`
  ${S.ButtonCss}
`;

const CodeTabs = (): JSX.Element => {
  const {
    node,
    tabs,
    showPreview,
    activeTab,
    setActiveTab,
    fullscreenLink,
    previewBg,
    setPreviewBg,
  } = useContext(CodeContext);

  const exampleName = fullscreenLink.split("/")?.[2]?.split("-")?.join(" ");

  return (
    <>
      <ScTabs>
        <ul role="tablist">
          {showPreview && (
            <li role="presentation">
              <ScButton
                role="tab"
                className="navds-body-short navds-body--small"
                onClick={() => setActiveTab(-1)}
                aria-selected={activeTab === -1}
              >
                {"Preview"}
              </ScButton>
            </li>
          )}
          {tabs.map((tab, i) => (
            <li key={tab.content.toString()} role="presentation">
              <ScButton
                role="tab"
                className="navds-body-short navds-body--small"
                onClick={() =>
                  i === activeTab
                    ? setActiveTab(showPreview ? -1 : 0)
                    : setActiveTab(i)
                }
                aria-selected={i === activeTab}
              >
                {tab.name}
              </ScButton>
            </li>
          ))}
        </ul>

        <ScFlex>
          {activeTab !== -1 && (
            <CopyButton content={tabs[activeTab].content.toString()} inTabs />
          )}
          {showPreview && activeTab === -1 && (
            <ColorPicker
              defaultColor={previewBg}
              onChange={(c) => setPreviewBg(c)}
            />
          )}
          {showPreview && fullscreenLink && activeTab === -1 && (
            <ScLinkButton target="_blank" href={fullscreenLink}>
              <span className="sr-only">{`Åpne ${
                exampleName ?? " "
              } eksempel i ny tab`}</span>
              <NewTab
                aria-hidden
                aria-label="åpne i ny fane"
                focusable="false"
              />
            </ScLinkButton>
          )}
          {node.github && (
            <ScLinkButton
              className="navds-body-short navds-body--small"
              href={node.github}
            >
              Github
            </ScLinkButton>
          )}
        </ScFlex>
      </ScTabs>
    </>
  );
};

export default CodeTabs;
