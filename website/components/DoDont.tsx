import React from "react";
import styled from "styled-components";
import { SanityBlockContent } from "./templating/SanityBlockContent";
import NextImage from "next/image";
import { useNextSanityImage } from "next-sanity-image";
import { sanityClient } from "../lib/sanity.server";
import { Label } from "@navikt/ds-react";

const Figure = styled.figure`
  display: flex;
  flex-direction: column;
  margin: 0;
  flex-basis: 300px;
  flex-shrink: 0;
  &[data-fullwidth="true"] {
    flex-basis: 100%;
    min-width: 300px;
  }

  img {
    border-radius: 4px 4px 0 0;
  }
`;

const Section = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const DivWithBorder = styled.div`
  border: 1px solid #c9c9c9;
  border-bottom: none;
  border-radius: 4px 4px 0 0;
`;

const Caption = styled.figcaption`
  border-top: var(--navds-spacing-3) solid;
  border-color: ${(props) => {
    switch (props["data-variant"]) {
      case "do":
        return "var(--navds-color-green-50)";
      case "dont":
        return "var(--navds-color-red-50)";
      case "warning":
        return "var(--navds-color-orange-50)";
      default:
    }
  }};

  *:first-child {
    margin-top: 1rem;
  }
`;

const Element = ({ block }: { block: DoDontBlockType }): JSX.Element => {
  const imageProps = useNextSanityImage(sanityClient, block.picture);

  return (
    <Figure data-fullwidth={block.fullwidth}>
      <DivWithBorder>
        <NextImage
          {...imageProps}
          layout="responsive"
          sizes="(max-width: 636px) 100vw, 1000px"
          alt={block.alt}
        />
      </DivWithBorder>

      <Caption data-variant={block.variant}>
        <Label spacing>
          {block.variant === "do"
            ? "Gjør dette"
            : block.variant === "warning"
            ? "Pass på dette"
            : "Ikke gjør dette"}
        </Label>
        <SanityBlockContent blocks={block.body} />
      </Caption>
    </Figure>
  );
};
type DoDontBlockType = {
  fullwidth: boolean;
  picture: any;
  alt: string;
  body?: any;
  variant: string;
  _key: string;
};

type DodontType = {
  node: {
    blocks: DoDontBlockType[];
  };
};

const DoDont = ({ node: { blocks } }: DodontType): JSX.Element => {
  if (!blocks || blocks.length === 0) return null;
  return (
    <Section>
      {blocks.map((x) => (
        <Element key={x._key} block={x} />
      ))}
    </Section>
  );
};

export default DoDont;
