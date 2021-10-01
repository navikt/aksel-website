import NextImage from "next/image";
import React from "react";
import { useSanityImage } from "../../lib/santiy";
import * as S from "./image.styles";

type ImageType = {
  node: {
    title: string;
    caption?: string;
  };
};

const Image = ({ node }: ImageType): JSX.Element => {
  const imageProps = useSanityImage(node);

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
