import Link from "next/link";
import * as React from "react";
import { useCallback, useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";

const Div = styled.div`
  position: sticky;
  right: 0;
  top: 5rem;
  margin-top: 4rem;
  z-index: 1;
  width: 250px;
  align-items: start;
  display: flex;
  flex-direction: column;
  border-left: 1px solid var(--navds-color-gray-20);
  padding-left: 2rem;
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
      color: var(--navds-color-blue-50);
      &:before {
        content: "";
        width: 3px;
        height: 1.75rem;
        margin-top: -0.25rem;
        margin-left: -2px;
        background-color: var(--navds-color-blue-50);
        position: absolute;
        left: 0;
      }
    }
  }
`;

function TableOfContents({ toc }) {
  if (toc.length === 0) return null;
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [toc]);

  const handleScroll = useCallback(() => {
    const offset = toc.reduce((prev, link) => {
      const el = document.getElementById(link.id);
      if (!el) {
        return {
          ...prev,
        };
      }
      return {
        ...prev,
        [link.id]: el.getBoundingClientRect().top - 84 + window.scrollY,
      };
    }, {});

    const scrollDistance = window.scrollY;
    let prevId = "";

    Object.entries(offset).forEach(([id, offset]) => {
      if (offset < scrollDistance) {
        prevId = id;
      } else {
        setActiveId(prevId);
        return;
      }
    });
  }, [toc]);

  return (
    <Div>
      <div>
        <p className="navds-label">Innhold på siden</p>
        <nav aria-label="Liste over innhold på siden">
          <Ul>
            {toc.map((link) => (
              <Li data-active={link.id === activeId} key={link.id}>
                <Link href={`#${link.id}`} passHref>
                  <a className="navds-link navds-body-short navds-body--s">
                    {link.heading}
                  </a>
                </Link>
              </Li>
            ))}
          </Ul>
        </nav>
      </div>
    </Div>
  );
}

export default TableOfContents;
