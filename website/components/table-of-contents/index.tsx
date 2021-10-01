import { Heading } from "@navikt/ds-react";
import Link from "next/link";
import * as React from "react";
import { useEffect, useState } from "react";
import * as S from "./toc.styles";

function TableOfContents({ changedState }: { changedState: any }): JSX.Element {
  const [toc, setToc] = useState<{ heading: string; id: string }[]>([]);

  /* Get current active anchor somehow (howto when heading doesnt scroll to top of page??) */
  const [activeId, setActiveId] = useState(null);

  React.useLayoutEffect(() => {
    const main = document.getElementsByTagName("main")?.[0];
    const tags = main.getElementsByTagName("h2");
    if (!tags) return;
    const toc = [];
    for (const item of tags) {
      toc.push({ heading: item.textContent, id: item.id });
    }
    setToc([...toc]);
  }, [changedState]);

  useEffect(() => {
    const inViewPort = (el: HTMLElement) => {
      if (!el) return false;
      const rect = el.getBoundingClientRect();
      const test = document.body.scrollHeight - window.scrollY;

      return (
        rect.top > 0 &&
        (rect.bottom <=
          (window.innerHeight || document.documentElement.clientHeight) / 2 ||
          (rect.top <= window.innerHeight && rect.top <= test))
      );
    };

    const handleScroll = () => {
      let active = null;
      for (const x of toc) {
        const el = document.getElementById(x.id);
        if (inViewPort(el)) {
          active = x.id;
        }
      }
      active && setActiveId(active);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [toc]);

  useEffect(() => {
    activeId && window.history.replaceState(null, null, `#${activeId}`);
  }, [activeId]);

  return (
    <>
      {toc.length !== 0 ? (
        <S.Wrapper>
          <Heading size="small" as="p">
            Innhold på siden
          </Heading>
          <S.Div>
            <nav aria-label="Liste over innhold på siden">
              <S.Ul>
                {toc.map((link) => (
                  <S.Li data-active={link.id === activeId} key={link.id}>
                    <Link href={`#${link.id}`} passHref>
                      <a className="navds-link navds-body-short navds-body--small">
                        {link.heading}
                      </a>
                    </Link>
                  </S.Li>
                ))}
              </S.Ul>
            </nav>
          </S.Div>
        </S.Wrapper>
      ) : null}
    </>
  );
}

export default TableOfContents;
