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
  margin: 0 var(--navds-spacing-8);
  margin-top: var(--navds-spacing-4);
  border: 1px solid rgba(11, 11, 11, 0.1);
  border-radius: 1rem;
`;

const StyledAccordionMenu = styled(AccordionMenu)`
  --navds-color-text-link: var(--navds-color-darkgray);
`;

const SectionTitle = styled.div`
  display: flex;
  padding: var(--navds-spacing-3) var(--navds-spacing-4);
  margin-top: var(--navds-spacing-4);
  border-top: 1px solid rgba(11, 11, 11, 0.1);

  &[data-first="true"] {
    margin-top: 0;
    border: none;
  }
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

const mapToComponents = (node, path, index) => {
  const active =
    node._type === "dropdown" ? isActive(node.dropdown, path) : false;

  switch (node._type) {
    case "dropdown":
      return (
        <AccordionMenuCollapsable
          defaultOpen={active}
          key={node._key}
          title={node.title}
        >
          {node.dropdown.map((item) => mapToComponents(item, path, index))}
        </AccordionMenuCollapsable>
      );
    case "link":
      return <MenuLink key={node._key} {...node} />;
    case "title":
      return (
        <SectionTitle
          data-first={index === 0}
          className="navds-title navds-title--s"
          key={node._key}
        >
          {node.title}
        </SectionTitle>
      );
    default:
      return null;
  }
};

const Menu = ({ menu }) => {
  const { asPath } = useRouter();
  return (
    <StyledAccordionMenu
      aria-label="sidemeny for navigasjon"
      className="navds-label navds-label--s"
    >
      {menu.map((item, i) =>
        mapToComponents(item, parseUrl(asPath).pathname, i)
      )}
    </StyledAccordionMenu>
  );
};

export default Menu;
