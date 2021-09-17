import { useRouter } from "next/router";
import Link from "next/link";
import { AccordionMenu } from "@navikt/ds-react";
import React from "react";
import parseUrl from "url-parse";
import styled from "styled-components";

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

function MenuLink(node) {
  const { asPath, query } = useRouter();

  const url = `/${node.link_ref.slug.current}`;
  const urlWPreview = query.preview ? url + "?preview=true" : url;

  const active = parseUrl(asPath).pathname.startsWith(url);

  return (
    <Link href={urlWPreview} passHref>
      <AccordionMenu.Item active={active}>{node.title}</AccordionMenu.Item>
    </Link>
  );
}

const isActive = (children, path) => {
  const active = children.find((child) => {
    const url = !child.dropdown && `/${child.link_ref.slug.current}`;
    return child.dropdown
      ? isActive(child.dropdown, path)
      : path.startsWith(url);
  });
  return !!active;
};

const mapToComponents = (node, path, index, depth) => {
  const active =
    node._type === "dropdown" ? isActive(node.dropdown, path) : false;

  switch (node._type) {
    case "dropdown":
      return (
        <AccordionMenu.Collapsable
          defaultOpen={active}
          key={node._key}
          title={node.title}
        >
          {node.dropdown.map((item) =>
            mapToComponents(item, path, index, depth + 1)
          )}
        </AccordionMenu.Collapsable>
      );
    case "link":
      return <MenuLink key={node._key} depth={depth} {...node} />;
    case "title":
      return (
        <SectionTitle
          data-first={index === 0}
          className="navds-title navds-heading--small"
          key={node._key}
        >
          {node.title}
        </SectionTitle>
      );
    default:
      return null;
  }
};

const Menu = ({ menu }: { menu: any }): JSX.Element => {
  const { asPath } = useRouter();
  return (
    <StyledAccordionMenu
      aria-label="sidemeny for navigasjon"
      className="navds-label navds-label--small"
    >
      {menu.map((item, i) =>
        mapToComponents(item, parseUrl(asPath).pathname, i, 0)
      )}
    </StyledAccordionMenu>
  );
};

export default Menu;
