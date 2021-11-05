import Link from "next/link";
import { useRouter } from "next/router";
import React, { createRef, useContext, useRef } from "react";
import { LayoutContext } from "..";
import * as S from "./tabs.styles";

export const Tabs = ({
  tabs,
}: {
  tabs: { name: string; path: string; active: boolean }[];
}): JSX.Element => {
  const context = useContext(LayoutContext);

  const {
    query: { preview },
  } = useRouter();

  const tabWRefs = tabs.map((t) => ({ ...t, ref: createRef() }));

  return (
    <S.Nav isTablet={context.isTablet} aria-label="Tabmeny for sideinnhold">
      <S.Ul isTablet={context.isTablet} role="tablist">
        {tabWRefs.map((tab, i) => (
          <li key={tab.name} role="presentation">
            <Link
              href={{
                pathname: tab.path,
                query: preview ? { preview: true } : {},
              }}
              passHref
              shallow
            >
              <S.A role="tab" aria-selected={tab.active}>
                {tab.name}
              </S.A>
            </Link>
          </li>
        ))}
      </S.Ul>
    </S.Nav>
  );
};
