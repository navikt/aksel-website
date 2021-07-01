import Link from "next/link";
import * as React from "react";
import styled from "styled-components";

const Div = styled.div`
  /* position: absolute;
  top: var(--navds-spacing-24);
  right: var(--navds-spacing-8);
  right: var(--navds-spacing-4); */
  z-index: 1;
  width: 250px;
  padding-top: var(--navds-spacing-12);

  @media (max-width: 1300px) {
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
  a {
    word-wrap: break-word;
    text-decoration: none;
    :hover {
      text-decoration: underline;
    }
  }
`;

function TableOfContents({ toc }) {
  if (toc.length === 0) return null;

  return (
    <Div>
      <p className="navds-label">Innhold på siden</p>
      <nav>
        <Ul>
          {toc.map((link) => (
            <Li>
              <Link key={link.id} href={`#${link.id}`} passHref>
                <a className="navds-link navds-body-short navds-body--s">
                  {link.heading}
                </a>
              </Link>
            </Li>
          ))}
        </Ul>
      </nav>
    </Div>
  );
}

export default TableOfContents;
