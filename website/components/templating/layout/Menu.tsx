import { useRouter } from "next/router";
import Link from "next/link";
import {
  AccordionMenu,
  AccordionMenuCollapsable,
  AccordionMenuItem,
} from "@navikt/ds-react";
import React from "react";
import parseUrl from "url-parse";
import styled from "styled-components";

const Hr = styled.hr`
  margin: var(--navds-spacing-2) var(--navds-spacing-10);
  border: 1px solid var(--navds-color-gray-20);
  border-radius: 1rem;
`;

const StyledAccordionMenu = styled(AccordionMenu)`
  --navds-color-text-link: var(--navds-color-darkgray);
`;

const MenuLink = (node) => {
  const { asPath } = useRouter();

  return (
    <Link href={node.pathName} passHref>
      <AccordionMenuItem active={parseUrl(asPath).pathname === node.pathName}>
        {node.title}
      </AccordionMenuItem>
    </Link>
  );
};

const isActive = (children, path) => {
  const active = children.find((child) => {
    return child.children
      ? isActive(child.children, path)
      : child.pathName === path;
  });
  return !!active;
};

const mapToComponents = (node, path) => {
  const active = node.children ? isActive(node.children, path) : false;

  return node.children ? (
    <AccordionMenuCollapsable
      defaultOpen={active}
      key={node.title}
      title={node.title}
    >
      {node.children.map((item) => mapToComponents(item, path))}
    </AccordionMenuCollapsable>
  ) : (
    <MenuLink key={node.title} {...node} />
  );
};

const Menu = ({ menu }) => {
  const { asPath } = useRouter();
  return (
    <StyledAccordionMenu className="navds-label navds-label--s">
      {menu.map((item, i) =>
        i % 3 === 0 && i !== 0 ? (
          <Hr />
        ) : (
          mapToComponents(item, parseUrl(asPath).pathname)
        )
      )}
    </StyledAccordionMenu>
  );
};

export default Menu;
