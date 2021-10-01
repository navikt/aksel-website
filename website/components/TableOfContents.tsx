import { Heading } from "@navikt/ds-react";
import Link from "next/link";
import * as React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Div = styled.div`
  position: sticky;
  right: 0;
  top: 5rem;
  margin-top: 1rem;
  z-index: 1;
  width: 250px;
  align-items: start;
  display: flex;
  flex-direction: column;
  padding-left: 2rem;
  order: 1;
  float: right;

  &:before {
    content: "";
    background-color: var(--navds-color-gray-40);
    width: 1px;
    height: calc(100% - 1px);
    margin-top: 0.5rem;
    position: absolute;
    left: -1px;
  }

  @media (max-width: 1332px) {
    display: none;
    width: 0;
  }
`;

const Wrapper = styled.div`
  position: sticky;
  right: 0;
  top: 5rem;
  margin-top: 4rem;
  z-index: 1;
  width: 250px;
  align-items: start;
  display: flex;
  flex-direction: column;
  order: 1;
  float: right;

  @media (max-width: 1332px) {
    display: none;
    width: 0;
  }
`;

const Ul = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const Li = styled.li`
  list-style: none;
  margin-top: var(--navds-spacing-4);
  text-align: start;
  a {
    text-decoration: none;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: var(--navds-color-darkgray);

    :hover {
      text-decoration: underline;
    }
  }

  &[data-active="true"] {
    a {
      font-weight: bold;
      color: var(--navds-color-gray-90);

      :focus {
        color: white;
      }

      &:before {
        content: "";
        width: 3px;
        height: 2.5rem;
        margin-top: 0;
        margin-left: -2px;
        background-color: var(--navds-color-gray-90);
        position: absolute;
        left: 0;
      }
    }
  }
`;

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
        <Wrapper>
          <Heading size="small" as="p">
            Innhold på siden
          </Heading>
          <Div>
            <nav aria-label="Liste over innhold på siden">
              <Ul>
                {toc.map((link) => (
                  <Li data-active={link.id === activeId} key={link.id}>
                    <Link href={`#${link.id}`} passHref>
                      <a className="navds-link navds-body-short navds-body--small">
                        {link.heading}
                      </a>
                    </Link>
                  </Li>
                ))}
              </Ul>
            </nav>
          </Div>
        </Wrapper>
      ) : null}
    </>
  );
}

export default TableOfContents;
