import { Heading } from "@navikt/ds-react";
import Link from "next/link";
import * as React from "react";
import { useEffect, useState } from "react";
import throttle from "lodash.throttle";
import * as S from "./toc.styles";
import { useIsomorphicLayoutEffect } from "react-use";

function TableOfContents({ changedState }: { changedState: any }): JSX.Element {
  const [toc, setToc] = useState<{ heading: string; id: string }[]>([]);

  const [activeId, setActiveId] = useState(null);

  useIsomorphicLayoutEffect(() => {
    const main = document.getElementsByTagName("main")?.[0];
    const tags = main?.getElementsByTagName("h2");
    if (!tags) return;
    const toc = [];
    for (const item of tags) {
      toc.push({ heading: item.textContent, id: decodeURI(item.id) });
    }
    setToc([...toc]);
  }, [changedState]);

  useEffect(() => {
    const validPick = (el: HTMLElement) => {
      if (!el) return false;
      const rect = el.getBoundingClientRect();
      return rect.top < 120;
    };

    const handleScroll = () => {
      let active = null;
      for (const x of toc) {
        const el = document.getElementById(x.id);
        if (validPick(el)) {
          active = x.id;
        }
      }
      if (toc && !active) {
        setActiveId(null);
      }

      active && setActiveId(active);
    };
    const func = throttle(handleScroll, 50);

    window.addEventListener("scroll", func);
    return () => {
      window.removeEventListener("scroll", func);
    };
  }, [toc]);

  useEffect(() => {
    activeId
      ? window.history.replaceState(null, null, `#${activeId}`)
      : window.history.replaceState(null, null, " ");
  }, [activeId]);

  const handleFocus = (id: string) => {
    const element = document.getElementById(id);
    element && element?.focus();
    element && element?.scrollIntoView();
  };

  if (toc.length === 0) {
    return null;
  }

  return (
    <S.Wrapper>
      <Heading size="small" as="p" id="toc-heading">
        Innhold på siden
      </Heading>
      <S.Div>
        <nav aria-labelledby="toc-heading">
          <S.Ul>
            {toc.map((link) => (
              <S.Li
                data-active={link.id === activeId}
                key={link.id + link.heading}
              >
                <Link href={`#${link.id}`} passHref>
                  <a
                    onClick={() => handleFocus(`${link.id}`)}
                    className="navds-link navds-body-short navds-body--small"
                  >
                    {link.heading}
                  </a>
                </Link>
              </S.Li>
            ))}
          </S.Ul>
        </nav>
      </S.Div>
    </S.Wrapper>
  );
}

export default TableOfContents;
