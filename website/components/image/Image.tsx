import NextImage from "next/image";
import React from "react";
import { useSanityImage } from "../../lib";
import { Picture as PictureT } from "../../lib/autogen-types";
import * as S from "./image.styles";

const Image = ({ node }: { node: PictureT }): JSX.Element => {
  if (!node || !node.asset) {
    return null;
  }

  const imageProps = useSanityImage(node);

  return (
    <S.Figure>
      <S.Image>
        <NextImage
          {...imageProps}
          layout="responsive"
          sizes="(max-width: 636px) 100vw, 1000px"
          alt={node.title}
        />
      </S.Image>
      {node.caption && (
        <S.Caption className="navds-body-long navds-body-long--small">
          {node.caption}
        </S.Caption>
      )}
    </S.Figure>
  );
};

export default Image;
