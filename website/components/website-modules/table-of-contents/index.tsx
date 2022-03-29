import { BodyShort, Heading, Link } from "@navikt/ds-react";
import cl from "classnames";
import { throttle } from "lodash";
import * as React from "react";
import { useEffect, useState } from "react";

function TableOfContents({ changedState }: { changedState: any }): JSX.Element {
  const [toc, setToc] = useState<{ heading: string; id: string }[]>([]);

  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    const time = setTimeout(() => {
      const main = document.getElementsByTagName("main")?.[0];
      const tags = main?.getElementsByTagName("h2");
      if (!tags) return;
      const toc = [];
      for (const item of tags) {
        item.id &&
          toc.push({ heading: item.textContent, id: decodeURI(item.id) });
      }
      setToc([...toc]);
    }, 150);

    return () => clearTimeout(time);
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
      ? window.history.replaceState(window.history.state, "", `#${activeId}`)
      : window.history.replaceState(window.history.state, "", " ");
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
    <div className="index-ignore sticky right-0 top-20 z-[1] order-1 my-16 hidden h-full w-72 flex-col items-start pl-4 toc:flex">
      <Heading size="small" as="p" id="toc-heading" className="mb-4">
        Innhold på siden
      </Heading>
      <div className="flex flex-col">
        <nav aria-labelledby="toc-heading">
          <ul>
            {toc.map((link) => (
              <BodyShort
                as="li"
                className={cl("border-l border-l-divider py-2 pl-4", {
                  "font-semibold shadow-[inset_1px_0_0_0_theme(colors.gray-900),-1px_0_0_0_theme(colors.gray-900)]":
                    link.id === activeId,
                })}
                key={link.id + link.heading}
              >
                <Link
                  href={`#${link.id}`}
                  onClick={() => handleFocus(`${link.id}`)}
                  className={cl(
                    "overflow-hidden overflow-ellipsis text-text no-underline hover:underline"
                  )}
                >
                  {link.heading}
                </Link>
              </BodyShort>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default TableOfContents;
