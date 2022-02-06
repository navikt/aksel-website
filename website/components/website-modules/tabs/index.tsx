import { Back, Next } from "@navikt/ds-icons";
import cl from "classnames";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { createRef, useState } from "react";
import { useEvent, useKey } from "react-use";
import { useOverflowTabsX } from "../..";

export const Tabs = ({
  tabs,
  title,
}: {
  tabs: { name: string; path: string; active: boolean }[];
  title: string;
}) => {
  const router = useRouter();

  const [parentRef, setParentRef] = useState<HTMLElement>(null);
  const [innerRef, setInnerRef] = useState<HTMLUListElement>(null);
  const [lastItemRef, setLastItemRef] = useState<HTMLLIElement>(null);
  const [isSticky, setIsSticky] = useState(false);

  const [overflowLeft, overflowRight] = useOverflowTabsX(
    innerRef,
    parentRef,
    lastItemRef
  );

  const tabWRefs = tabs.map((t) => ({
    ...t,
    ref: createRef<HTMLAnchorElement>(),
  }));

  useEvent("scroll", () => {
    parentRef && setIsSticky(parentRef.getBoundingClientRect().top === 0);
  });

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

  const scrollLeft = () => {
    if (parentRef) {
      parentRef.scrollLeft = 0;
    }
  };

  const scrollRight = () => {
    if (parentRef) {
      parentRef.scrollLeft = parentRef.offsetWidth;
    }
  };

  return (
    <div className="sticky top-0 z-[1001]">
      <nav
        ref={setParentRef}
        aria-label={`Om ${title}`}
        className={cl(
          "no-scrollbar overflow-x-auto border-b border-b-divider bg-canvas-background-light px-2 lg:px-0",
          { "shadow-tabs": isSticky }
        )}
      >
        <ul
          className="m-0 mx-0 mt-2 flex max-w-none items-end gap-1 p-0 lg:mx-12 lg:max-w-[800px]"
          ref={setInnerRef}
        >
          {tabWRefs.map((tab, i) => (
            <li
              key={tab.name + i}
              ref={setLastItemRef}
              className="relative flex min-w-fit max-w-[200px] flex-1 list-none items-center justify-center"
            >
              <NextLink href={tab.path} passHref>
                <a
                  className={cl(
                    "vk-tab_link rounded-none border-b-[3px] border-b-transparent text-gray-800",
                    "flex h-12 flex-1 items-center justify-center overflow-hidden whitespace-nowrap py-2 px-4",
                    "hover:border-b-canvas-background-inverted hover:text-text focus:outline focus:outline-[3px] focus:outline-offset-[-3px] focus:outline-focus",
                    "index-tabs",
                    {
                      "index-tabs--active": tab.active,
                      "border-b-canvas-background-inverted font-bold text-text":
                        tab.active,
                    }
                  )}
                  ref={tab.ref}
                  data-selected={tab.active}
                  onClick={() => window && window.scrollTo(0, 0)}
                >
                  {tab.name}
                </a>
              </NextLink>
            </li>
          ))}
        </ul>
      </nav>
      {overflowLeft && (
        <button
          className="absolute left-0 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center bg-gradient-to-r from-white via-white/70 focus:shadow-[0_0_0_2px] focus:shadow-focus"
          aria-hidden="true"
          tabIndex={-1}
          onClick={() => scrollLeft()}
        >
          <Back className="h-6 w-6" aria-label="scroll meny til venstre" />
        </button>
      )}
      {overflowRight && (
        <button
          className="absolute right-0 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center bg-gradient-to-l from-white via-white/70 focus:shadow-[0_0_0_2px] focus:shadow-focus"
          aria-hidden="true"
          tabIndex={-1}
          onClick={() => scrollRight()}
        >
          <Next className="h-6 w-6" aria-label="scroll meny til høyre" />
        </button>
      )}
    </div>
  );
};
