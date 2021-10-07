import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useRef, useState } from "react";
import { LayoutContext } from "../templates/layout/Layout";
import throttle from "lodash.throttle";
import * as S from "./tabs.styles";

export const Tabs = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const context = useContext(LayoutContext);
  const tabRef = useRef<HTMLElement | null>(null);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!tabRef.current) return null;
      const top = tabRef.current.getBoundingClientRect().top;

      if (top === 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    const func = throttle(handleScroll, 50);

    window.addEventListener("scroll", func);
    return () => {
      window.removeEventListener("scroll", func);
    };
  }, []);

  return (
    <S.Nav
      ref={tabRef}
      isMobile={context.isMobile}
      aria-label="Tabmeny for sideinnhold"
      sticky={isSticky}
    >
      <S.Ul isMobile={context.isMobile} role="tablist" sticky={isSticky}>
        {children}
      </S.Ul>
    </S.Nav>
  );
};

export const Tab = ({
  children,
  path = "",
  active,
}: {
  children: React.ReactNode;
  path?: string;
  active?: boolean;
}): JSX.Element => {
  const {
    query: { preview },
    asPath,
  } = useRouter();

  return (
    <li role="presentation">
      <Link
        href={{
          pathname: path,
          query: preview ? { preview: true } : {},
        }}
        passHref
        shallow
      >
        <S.A
          role="tab"
          aria-selected={
            active
              ? active
              : path === new URL(asPath, "http://example.com").pathname
          }
        >
          {children}
        </S.A>
      </Link>
    </li>
  );
};
