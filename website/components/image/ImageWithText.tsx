import NextImage from "next/image";
import React from "react";
import { useSanityImage } from "../../lib";
import { PictureText as PictureTextT } from "../../lib/autogen-types";
import { SanityBlockContent } from "../SanityBlockContent";
import * as S from "./image.styles";

const Image = ({ node }: { node: PictureTextT }): JSX.Element => {
  if (!node || !node.asset || !node.body) {
    return null;
  }

  const imageProps = useSanityImage(node);

  return (
    <S.Wrapper>
      <S.TextImage placement={node.placement ?? "left"}>
        <NextImage
          {...imageProps}
          layout="responsive"
          sizes="(max-width: 260px) 100vw, 1000px"
          alt={node.title}
        />
      </S.TextImage>
      <S.TextWrapper>
        <SanityBlockContent blocks={node.body} />
      </S.TextWrapper>
    </S.Wrapper>
  );
};

export default Image;
