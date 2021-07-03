import Link from "next/link";
import * as React from "react";
import styled from "styled-components";

const Div = styled.div`
  position: absolute;
  top: var(--navds-spacing-8);
  right: 0;
  z-index: 1;
  width: 250px;
  align-items: start;
  display: flex;
  flex-direction: column;

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
  text-align: start;
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
      <div>
        <p className="navds-label">Innhold på siden</p>
        <nav>
          <Ul>
            {toc.map((link) => (
              <Li key={link.id}>
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
