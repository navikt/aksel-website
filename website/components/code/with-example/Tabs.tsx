import { NewTab } from "@navikt/ds-icons";
import React, { useContext } from "react";
import { CodeContext } from "./Example";
import * as S from "../code.styles";
import styled from "styled-components";

export const ScTabs = styled.div`
  border-bottom: 1px solid var(--navds-color-gray-60);
  background-color: var(--navds-color-darkgray);
  padding: 1px;
  min-height: 50px;
  padding-bottom: 0;
  display: flex;
  justify-content: space-between;

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
`;

export const ScLinkButton = styled.a`
  ${S.ButtonCss}
  text-decoration: none;

  :hover {
    text-decoration: underline;
  }

  :focus {
    text-decoration: underline;
  }
`;

export const ScButton = styled.button`
  ${S.ButtonCss}
`;

const CodeTabs = (): JSX.Element => {
  const { node, tabs, showPreview, activeTab, setActiveTab, fullscreenLink } =
    useContext(CodeContext);

  return (
    <>
      <ScTabs>
        <ul role="tablist">
          {tabs.map((tab, i) => (
            <li key={tab.content.toString()} role="presentation">
              <ScButton
                role="tab"
                className="navds-body-short navds-body--small"
                onClick={() =>
                  i === activeTab ? setActiveTab(-1) : setActiveTab(i)
                }
                aria-selected={i === activeTab}
              >
                {tab.name}
              </ScButton>
            </li>
          ))}
        </ul>

        <ScFlex>
          {showPreview && fullscreenLink && (
            <ScLinkButton
              target="_blank"
              href={fullscreenLink}
              aria-label="Åpner eksempel i ny tab"
            >
              <span className="sr-only">åpne eksempel i ny tab</span>
              <NewTab role="presentation" />
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
