import Link from "next/link";
import * as React from "react";
import styled from "styled-components";

const Div = styled.div`
  position: absolute;
  top: var(--navds-spacing-22);
  right: var(--navds-spacing-16);

  @media (max-width: 1256px) {
    display: none;
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
                <a className="navds-link">{link.heading}</a>
              </Link>
            </Li>
          ))}
        </Ul>
      </nav>
    </Div>
  );
}

export default TableOfContents;
