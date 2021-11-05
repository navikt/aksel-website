import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { LayoutContext } from "..";
import * as S from "./tabs.styles";

export const Tabs = ({
  tabs,
  activeTab,
}: {
  tabs: { name: string; path: string }[];
  activeTab: number;
}): JSX.Element => {
  const context = useContext(LayoutContext);

  const {
    query: { preview },
    asPath,
  } = useRouter();

  return (
    <S.Nav isTablet={context.isTablet} aria-label="Tabmeny for sideinnhold">
      <S.Ul isTablet={context.isTablet} role="tablist">
        {tabs.map((tab, i) => (
          <li key={tab.name} role="presentation">
            <Link
              href={{
                pathname: tab.path,
                query: preview ? { preview: true } : {},
              }}
              passHref
              shallow
            >
              <S.A
                role="tab"
                aria-selected={
                  activeTab === i
                    ? activeTab === i
                    : tab.path ===
                      new URL(asPath, "http://example.com").pathname
                }
              >
                {tab.name}
              </S.A>
            </Link>
          </li>
        ))}
      </S.Ul>
    </S.Nav>
  );
};
