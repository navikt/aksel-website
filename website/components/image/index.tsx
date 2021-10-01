import { useNextSanityImage } from "next-sanity-image";
import NextImage from "next/image";
import React from "react";
import { sanityClient } from "../../lib/sanity.server";
import * as S from "./image.styles";

type ImageType = {
  node: {
    title: string;
    caption?: string;
  };
};

const Image = ({ node }: ImageType): JSX.Element => {
  const imageProps = useNextSanityImage(sanityClient, node);

  return (
    <S.Figure>
      <div>
        <NextImage
          {...imageProps}
          layout="responsive"
          sizes="(max-width: 636px) 100vw, 1000px"
          alt={node.title}
        />
      </div>
      {node.caption && (
        <S.Caption className="navds-body-long">{node.caption}</S.Caption>
      )}
    </S.Figure>
  );
};

export default Image;
