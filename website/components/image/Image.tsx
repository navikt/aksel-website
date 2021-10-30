import NextImage from "next/image";
import React, { useState } from "react";
import { Lightbox } from "..";
import { useSanityImage } from "../../lib";
import { Picture as PictureT } from "../../lib/autogen-types";
import * as S from "./image.styles";

const Image = ({ node }: { node: PictureT }): JSX.Element => {
  if (!node || !node.asset) {
    return null;
  }

  const [open, setOpen] = useState(false);

  const imageProps = useSanityImage(node);

  return (
    <S.Figure>
      <S.Image
        aria-label="Klikk for å åpne bildet i fullskjerm"
        tabIndex={0}
        onClick={() => setOpen(!open)}
      >
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
      <Lightbox open={open} onClose={() => setOpen(false)}>
        {open && (
          <NextImage
            {...imageProps}
            layout="fixed"
            sizes="(max-width: 100vw) 100vw, 1000px"
            alt={node.title}
          />
        )}
      </Lightbox>
    </S.Figure>
  );
};

export default Image;
