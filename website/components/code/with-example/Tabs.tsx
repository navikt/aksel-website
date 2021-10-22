import { NewTab } from "@navikt/ds-icons";
import React, { useContext } from "react";
import { CodeContext } from "./Example";
import * as S from "../code.styles";
import styled from "styled-components";

export const ScTabs = styled.div`
  background-color: #f7f7f7;
  padding: 1px;
  min-height: 50px;

  display: flex;
  justify-content: space-between;
  border: 1px solid var(--navds-color-gray-20);

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
            <ScLinkButton target="_blank" href={fullscreenLink}>
              <span className="sr-only">Åpne eksempel i ny tab</span>
              <NewTab focusable="false" role="presentation" />
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
