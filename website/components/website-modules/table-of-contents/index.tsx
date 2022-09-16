import { BodyShort, Heading, Link } from "@navikt/ds-react";
import cl from "classnames";
import throttle from "lodash/throttle";
import * as React from "react";
import { useEffect, useState } from "react";

function TableOfContents({
  changedState,
  hideToc = true,
  aksel = false,
}: {
  changedState: any;
  hideToc?: boolean;
  aksel?: boolean;
}): JSX.Element {
  const [toc, setToc] = useState<{ heading: string; id: string }[]>([]);

  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    const time = setTimeout(() => {
      const main = document.getElementsByTagName("main")?.[0];
      const tags = main?.getElementsByTagName("h2");
      if (!tags) return;
      const filtered = Array.from(tags)?.filter(
        (x) =>
          !Array.from(
            main.getElementsByClassName("algolia-ignore-index")
          )?.some((y) => y.contains(x))
      );
      const toc = [];
      for (const item of filtered) {
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

  // TODO: Løse dette på en bedre måte
  useEffect(() => {
    setTimeout(() => {
      activeId
        ? window.history.replaceState(window.history.state, "", `#${activeId}`)
        : window.history.replaceState(window.history.state, "", " ");
    }, 100);
  }, [activeId]);

  const handleFocus = (id: string) => {
    const element = document.getElementById(id);
    element && element?.focus();
    element && element?.scrollIntoView();
  };

  if (toc.length <= 3 || hideToc) {
    return null;
  }

  return (
    <div className="algolia-ignore-index sticky right-0 top-20 z-[1] order-1 my-16 hidden h-full w-72 flex-col items-start pl-4 xl:flex">
      <Heading
        size="small"
        as="p"
        id="toc-heading"
        className={cl("mb-4", {
          "text-deepblue-700": aksel,
        })}
      >
        Innhold på siden
      </Heading>
      <div className="flex flex-col">
        <nav aria-labelledby="toc-heading">
          <ul>
            {toc.map((link) => (
              <BodyShort
                as="li"
                className={cl("border-l py-2 pl-4", {
                  "border-l-deepblue-700 font-semibold shadow-[inset_1px_0_0_0_theme(colors.deepblue-700),-1px_0_0_0_theme(colors.deepblue-700)]":
                    link.id === activeId && aksel,
                  "border-l-gray-900 font-semibold shadow-[inset_1px_0_0_0_theme(colors.gray-900),-1px_0_0_0_theme(colors.gray-900)]":
                    link.id === activeId && !aksel,
                  "border-l-divider": link.id !== activeId,
                })}
                key={link.id + link.heading}
              >
                <Link
                  href={`#${link.id}`}
                  onClick={() => handleFocus(`${link.id}`)}
                  className={cl(
                    "overflow-hidden overflow-ellipsis  no-underline hover:underline",
                    {
                      "text-deepblue-700": aksel && link.id === activeId,
                      "text-text-muted": aksel && link.id !== activeId,
                      "text-text": !aksel,
                    }
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
