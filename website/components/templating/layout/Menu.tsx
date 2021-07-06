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
  const { asPath, query } = useRouter();

  const url = `/${node.link_ref.slug.current}`;
  const urlWPreview = query.preview ? url + "?preview=true" : url;

  const active = parseUrl(asPath).pathname.startsWith(url);

  return (
    <Link href={urlWPreview} passHref>
      <AccordionMenuItem active={active}>{node.title}</AccordionMenuItem>
    </Link>
  );
};

const isActive = (children, path) => {
  const active = children.find((child) => {
    const url = !child.dropdown && `/${child.link_ref.slug.current}`;
    return child.dropdown
      ? isActive(child.dropdown, path)
      : path.startsWith(url);
  });
  return !!active;
};

const mapToComponents = (node, path) => {
  const active =
    node._type === "dropdown" ? isActive(node.dropdown, path) : false;

  return node._type === "dropdown" ? (
    <AccordionMenuCollapsable
      defaultOpen={active}
      key={node._key}
      title={node.title}
    >
      {node.dropdown.map((item) => mapToComponents(item, path))}
    </AccordionMenuCollapsable>
  ) : (
    <MenuLink key={node._key} {...node} />
  );
};

const Menu = ({ menu }) => {
  const { asPath } = useRouter();
  return (
    <StyledAccordionMenu
      aria-label="sidemeny for navigasjon"
      className="navds-label navds-label--s"
    >
      {menu.map((item, i) => mapToComponents(item, parseUrl(asPath).pathname))}
    </StyledAccordionMenu>
  );
};

export default Menu;
