import { useNextSanityImage } from "next-sanity-image";
import NextImage from "next/image";
import React from "react";
import styled from "styled-components";
import { sanityClient } from "../lib/sanity.server";

const Figure = styled.figure`
  display: flex;
  flex-direction: column;
  margin-bottom: var(--navds-spacing-8);
`;

const Caption = styled.figcaption`
  margin-top: var(--navds-spacing-4);
`;

type ImageType = {
  node: {
    title: string;
    caption?: string;
  };
};

const Image = ({ node }: ImageType): JSX.Element => {
  const imageProps = useNextSanityImage(sanityClient, node);

  return (
    <Figure>
      <div>
        <NextImage
          {...imageProps}
          layout="responsive"
          sizes="(max-width: 636px) 100vw, 1000px"
          alt={node.title}
        />
      </div>
      {node.caption && (
        <Caption className="navds-body-long">{node.caption}</Caption>
      )}
    </Figure>
  );
};

export default Image;
