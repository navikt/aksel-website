import { NewTab } from "@navikt/ds-icons";
import { BodyShort } from "@navikt/ds-react";
import React, { useContext } from "react";
import CopyButton from "../CopyButton";
import { CodeContext } from "./Example";
import cl from "classnames";

const CodeTabs = (): JSX.Element => {
  const { tabs, showPreview, activeTab, setActiveTab, fullscreenLink } =
    useContext(CodeContext);

  const exampleName = fullscreenLink.split("/")?.[2]?.split("-")?.join(" ");

  return (
    <>
      <div className="flex min-h-[50px] justify-between overflow-x-auto border border-divider border-b-transparent bg-white p-[1px]">
        <BodyShort as="ul" role="tablist" className="flex">
          {showPreview && (
            <li role="presentation">
              <button
                role="tab"
                className={cl(
                  "flex min-h-[50px] items-center p-3 transition-all hover:bg-blue-50 hover:text-text hover:shadow-[0_-3px_0_0_theme(colors.gray-900)_inset] focus:text-text focus:shadow-[inset_0_0_0_2px_theme(colors.focus)] focus:outline-none",
                  {
                    "text-text shadow-[0_-3px_0_0_theme(colors.gray-900)_inset]":
                      activeTab === -1,
                    "text-text-muted": activeTab !== -1,
                  }
                )}
                onClick={() => setActiveTab(-1)}
                aria-selected={activeTab === -1}
              >
                {"Preview"}
              </button>
            </li>
          )}
          {tabs.map((tab, i) => (
            <li key={tab.content.toString()} role="presentation">
              <button
                role="tab"
                className={cl(
                  "flex min-h-[50px] items-center p-3 hover:bg-blue-50 hover:text-text hover:shadow-[0_-3px_0_0_theme(colors.gray-900)_inset] focus:text-text focus:shadow-[inset_0_0_0_2px_theme(colors.focus)] focus:outline-none",
                  {
                    "text-text shadow-[0_-3px_0_0_theme(colors.gray-900)_inset]":
                      i === activeTab,
                    "text-text-muted": i !== activeTab,
                  }
                )}
                onClick={() =>
                  i === activeTab
                    ? setActiveTab(showPreview ? -1 : 0)
                    : setActiveTab(i)
                }
                aria-selected={i === activeTab}
              >
                {tab.name}
              </button>
            </li>
          ))}
        </BodyShort>
        <div className="flex">
          {activeTab !== -1 && (
            <CopyButton content={tabs[activeTab].content.toString()} inTabs />
          )}
          {showPreview && fullscreenLink && activeTab === -1 && (
            <a
              target="_blank"
              rel="noreferrer"
              href={fullscreenLink}
              className="flex items-center rounded-none p-3 text-text-muted hover:bg-blue-50 hover:text-text focus:text-text focus:shadow-[inset_0_0_0_2px_theme(colors.focus)] focus:outline-none"
            >
              <span className="sr-only">{`Åpne ${
                exampleName ?? " "
              } eksempel i ny tab`}</span>
              <NewTab
                aria-hidden
                title="åpne i ny fane"
                focusable="false"
                className="text-[1.5rem]"
              />
            </a>
          )}
        </div>
      </div>
    </>
  );
};

export default CodeTabs;
