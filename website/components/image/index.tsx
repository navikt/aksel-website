import NextImage from "next/image";
import React from "react";
import { ImageType, useSanityImage } from "../../lib";
import * as S from "./image.styles";

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
