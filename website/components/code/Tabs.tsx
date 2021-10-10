import { NewTab } from "@navikt/ds-icons";
import React, { useContext } from "react";
import { CodeContext } from "./Example";
import * as S from "./code.styles";

const CodeTabs = (): JSX.Element => {
  const { node, tabs, showPreview, activeTab, setActiveTab, fullscreenLink } =
    useContext(CodeContext);

  return (
    <>
      <S.Tabs>
        <S.Ul role="tablist">
          {tabs.map((tab, i) => (
            <S.Li key={tab.content.toString()} role="presentation">
              <S.Button
                role="tab"
                className="navds-body-short navds-body--small"
                onClick={() =>
                  i === activeTab ? setActiveTab(-1) : setActiveTab(i)
                }
                aria-selected={i === activeTab}
              >
                {tab.name}
              </S.Button>
            </S.Li>
          ))}
        </S.Ul>

        <S.CopyWrapper>
          {showPreview && (
            <>
              {fullscreenLink && (
                <S.LinkButton
                  target="_blank"
                  href={fullscreenLink}
                  aria-label="Åpner eksempel i ny tab"
                >
                  <span className="sr-only">åpne eksempel i ny tab</span>
                  <NewTab role="presentation" />
                </S.LinkButton>
              )}
            </>
          )}
          {node.github && (
            <S.LinkButton
              className="navds-body-short navds-body--s"
              href={node.github}
            >
              Github
            </S.LinkButton>
          )}
        </S.CopyWrapper>
      </S.Tabs>
    </>
  );
};

export default CodeTabs;
