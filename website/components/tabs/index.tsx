import Link from "next/link";
import { useRouter } from "next/router";
import React, { createRef, useContext, useState } from "react";
import { useKey } from "react-use";
import { LayoutContext, useOverflowX } from "..";
import * as S from "./tabs.styles";

export const Tabs = ({
  tabs,
  title,
}: {
  tabs: { name: string; path: string; active: boolean }[];
  title: string;
}): JSX.Element => {
  const context = useContext(LayoutContext);

  const router = useRouter();

  const [parentRef, setParentRef] = useState(null);
  const [innerRef, setInnerRef] = useState(null);

  const [overflowLeft, overflowRight] = useOverflowX(innerRef, parentRef);
  console.log({ left: overflowLeft, right: overflowRight });

  const tabWRefs = tabs.map((t) => ({
    ...t,
    ref: createRef<HTMLAnchorElement>(),
  }));

  useKey(
    "ArrowLeft",
    () => {
      const index = tabWRefs.findIndex(
        (x) => x.ref.current === document.activeElement
      );
      if (index === -1) return;
      index === 0
        ? tabWRefs[tabWRefs.length - 1].ref.current?.focus()
        : tabWRefs[index - 1].ref.current?.focus();
    },
    {},
    [tabs]
  );

  useKey(
    " ",
    (e) => {
      const index = tabWRefs.findIndex(
        (x) => x.ref.current === document.activeElement
      );
      if (index === -1) return;
      e.preventDefault();
      if (tabWRefs[index].active) return;
      router.push({
        pathname: tabWRefs[index].path,
        query: router.query.preview ? { preview: true } : {},
      });
    },
    {},
    [tabs]
  );

  useKey(
    "ArrowRight",
    () => {
      const index = tabWRefs.findIndex(
        (x) => x.ref.current === document.activeElement
      );
      if (index === -1) return;

      index === tabWRefs.length - 1
        ? tabWRefs[0].ref.current?.focus()
        : tabWRefs[index + 1].ref.current?.focus();
    },
    {},
    [tabs]
  );

  return (
    <S.Nav
      isTablet={context.isTablet}
      aria-label={`Om ${title}`}
      ref={setParentRef}
    >
      <S.Ul isTablet={context.isTablet} ref={setInnerRef}>
        {tabWRefs.map((tab) => (
          <li key={tab.name}>
            <Link
              href={{
                pathname: tab.path,
                query: router.query.preview ? { preview: true } : {},
              }}
              passHref
              shallow
            >
              <S.A ref={tab.ref} aria-selected={tab.active}>
                {tab.name}
              </S.A>
            </Link>
          </li>
        ))}
      </S.Ul>
    </S.Nav>
  );
};
