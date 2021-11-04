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
          layout="fill"
          objectFit="contain"
          alt={node.title}
          quality="100"
          sizes="(max-width: 800px)"
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
            className="image"
            layout="fill"
            objectFit="contain"
            sizes="(max-width: 100vw)"
            alt={node.title}
          />
        )}
      </Lightbox>
    </S.Figure>
  );
};

export default Image;
