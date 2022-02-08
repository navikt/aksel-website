import { Heading } from "@navikt/ds-react";
import { throttle } from "lodash";
import * as React from "react";
import { useEffect, useState } from "react";
import { useIsomorphicLayoutEffect } from "react-use";
import * as S from "./toc.styles";

function TableOfContents({ changedState }: { changedState: any }): JSX.Element {
  const [toc, setToc] = useState<{ heading: string; id: string }[]>([]);

  const [activeId, setActiveId] = useState(null);

  useIsomorphicLayoutEffect(() => {
    const main = document.getElementsByTagName("main")?.[0];
    const tags = main?.getElementsByTagName("h2");
    if (!tags) return;
    const toc = [];
    for (const item of tags) {
      item.id &&
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
    <S.Wrapper className="index-ignore">
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
                <a
                  href={`#${link.id}`}
                  onClick={() => handleFocus(`${link.id}`)}
                  className="navds-link navds-body-short navds-body--small"
                >
                  {link.heading}
                </a>
              </S.Li>
            ))}
          </S.Ul>
        </nav>
      </S.Div>
    </S.Wrapper>
  );
}

export default TableOfContents;
