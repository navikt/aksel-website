import { NewTab } from "@navikt/ds-icons";
import React, { useContext } from "react";
import { CodeContext } from "./Example";
import * as S from "../code.styles";
import styled from "styled-components";
import CopyButton from "../CopyButton";
import { CanvasIcon } from "../../..";

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
  color: var(--navds-semantic-color-text);

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

const ScCanvasButton = styled.button`
  background-color: transparent;
  border: none;
  color: var(--navds-semantic-color-text-muted);
  padding: 0.75rem 0.75rem;
  display: flex;
  align-items: center;
  min-width: 50px;
  justify-content: center;

  :hover {
    background-color: var(
      --navds-semantic-color-interaction-primary-hover-subtle
    );
  }

  :focus {
    outline: 2px solid var(--navds-semantic-color-focus);
    outline-offset: -2px;
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

  const updateBg = () => {
    switch (previewBg) {
      case "default":
        setPreviewBg("white");
        break;
      case "white":
        setPreviewBg("inverted");
        break;
      case "inverted":
        setPreviewBg("default");
        break;
      default:
        break;
    }
  };

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
            <ScCanvasButton
              className="navds-body-short navds-body--small"
              onClick={() => updateBg()}
            >
              <span className="sr-only">
                Endre bakgrunnsfarge på komponent preview
              </span>
              <CanvasIcon aria-hidden aria-label="Endre bakgrunnsfarge" />
            </ScCanvasButton>
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
              className="navds-body-short navds-body--s"
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
