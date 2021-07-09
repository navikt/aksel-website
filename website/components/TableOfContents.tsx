import Link from "next/link";
import { useRouter } from "next/router";
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

      :focus {
        color: white;
      }

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

function TableOfContents({ changedState }) {
  const [toc, setToc] = useState([]);

  /* Get current active anchor somehow (howto when heading doesnt scroll to top of page??) */
  const [activeId, setActiveId] = useState(null);

  React.useLayoutEffect(() => {
    const tags = document.getElementsByTagName("h2");
    if (!tags) return;
    const toc = [];
    for (const item of tags) {
      toc.push({ heading: item.textContent, id: item.id });
    }
    setToc([...toc]);
  }, [changedState]);

  return (
    <>
      {toc.length !== 0 ? (
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
      ) : null}
    </>
  );
}

export default TableOfContents;
