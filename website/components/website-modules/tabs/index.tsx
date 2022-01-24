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
}): JSX.Element => {
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
          "overflow-x-auto bg-canvas-background-light no-scrollbar px-2 lg:px-0 border-b border-b-divider",
          { "shadow-tabs": isSticky }
        )}
      >
        <ul
          className="p-0 m-0 max-w-none lg:max-w-[800px] flex items-end mt-2 mx-0 lg:mx-12 gap-1"
          ref={setInnerRef}
        >
          {tabWRefs.map((tab) => (
            <li
              key={tab.name}
              ref={setLastItemRef}
              className="list-none flex-1 flex justify-center items-center relative"
            >
              <NextLink href={tab.path} passHref>
                <a
                  className={cl(
                    "vk-tab_link border-b-[3px] rounded-none border-b-transparent text-gray-800",
                    "flex flex-1 justify-center items-center py-2 px-4 h-12 overflow-hidden whitespace-nowrap",
                    "hover:text-text hover:border-b-canvas-background-inverted focus:outline-[3px] focus:outline-offset-[-3px] focus:outline focus:outline-focus",
                    {
                      "border-b-canvas-background-inverted text-text font-bold":
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
          className="absolute left-0 w-12 h-12 top-1/2 -translate-y-1/2 flex items-center justify-center focus:shadow-[0_0_0_2px] focus:shadow-focus bg-gradient-to-r from-white via-white/70"
          aria-hidden="true"
          tabIndex={-1}
          onClick={() => scrollLeft()}
        >
          <Back className="h-6 w-6" aria-label="scroll meny til venstre" />
        </button>
      )}
      {overflowRight && (
        <button
          className="absolute right-0 w-12 h-12 top-1/2 -translate-y-1/2 flex items-center justify-center focus:shadow-[0_0_0_2px] focus:shadow-focus bg-gradient-to-l from-white via-white/70"
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
