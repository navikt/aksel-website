import NextImage from "next/image";
import React from "react";
import { useSanityImage } from "../../../lib";
import { PictureText as PictureTextT } from "../../../lib/autogen-types";
import { SanityBlockContent } from "../../SanityBlockContent";
import { withErrorBoundary } from "../../website-features/error-boundary";
import * as S from "./image.styles";
import styled from "styled-components";

const ScSection = styled.div`
  display: flow-root;
`;

const Image = ({ node }: { node: PictureTextT }): JSX.Element => {
  if (!node || !node.asset || !node.body) {
    return null;
  }

  const imageProps = useSanityImage(node);

  return (
    <ScSection>
      <S.TextImage placement={node.placement ?? "left"}>
        <NextImage
          {...imageProps}
          layout="responsive"
          sizes="(max-width: 260px) 100vw, 1000px"
          alt={node.title}
        />
      </S.TextImage>
      <div>
        <SanityBlockContent blocks={node.body} />
      </div>
    </ScSection>
  );
};

export default withErrorBoundary(Image, "ImageWithText");