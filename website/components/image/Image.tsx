import NextImage from "next/image";
import React, { useState } from "react";
import { useMeasure } from "react-use";
import { Lightbox } from "..";
import { useSanityImage } from "../../lib";
import { Picture as PictureT } from "../../lib/autogen-types";
import { withErrorBoundary } from "../error-boundary";
import * as S from "./image.styles";

const Image = ({ node }: { node: PictureT }): JSX.Element => {
  if (!node || !node.asset) {
    return null;
  }

  const [open, setOpen] = useState(false);

  const imageProps = useSanityImage(node);

  const [ref, { width }] = useMeasure();

  return (
    <S.Figure>
      <S.Image
        ref={ref}
        aria-label="Klikk for å åpne bildet i fullskjerm"
        tabIndex={0}
        onClick={() => setOpen(!open)}
      >
        <NextImage
          {...imageProps}
          alt={node.title}
          quality="100"
          layout="responsive"
          sizes={
            width !== undefined
              ? `${Math.round(width)}px`
              : "(max-width: 800px)"
          }
        />
      </S.Image>
      {node.caption && (
        <S.Caption className="navds-body-long navds-body-long--small">
          {node.caption}
        </S.Caption>
      )}
      <Lightbox open={open} onClose={() => setOpen(false)}>
        {open && (
          <NextImage {...imageProps} layout="responsive" alt={node.title} />
        )}
      </Lightbox>
    </S.Figure>
  );
};

export default withErrorBoundary(Image, "Image");
