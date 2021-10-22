import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { LayoutContext } from "../templates/layout/Layout";
import * as S from "./tabs.styles";

export const Tabs = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const context = useContext(LayoutContext);

  return (
    <S.Nav isMobile={context.isMobile} aria-label="Tabmeny for sideinnhold">
      <S.Ul isMobile={context.isMobile} role="tablist">
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
