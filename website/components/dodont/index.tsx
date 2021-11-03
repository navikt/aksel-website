import React, { useState } from "react";
import NextImage from "next/image";
import { BodyShort } from "@navikt/ds-react";
import { useSanityImage } from "../../lib/santiy";
import * as S from "./dodont.styles";
import { ErrorFilled, SuccessFilled, WarningFilled } from "@navikt/ds-icons";
import {
  DoDont as DoDontT,
  DoDontBlock as DoDontBlockT,
} from "../../lib/autogen-types";
import { Lightbox } from "..";

const Element = ({ block }: { block: DoDontBlockT }): JSX.Element => {
  const imageProps = useSanityImage(block.picture);
  const [open, setOpen] = useState(false);

  return (
    <S.Figure data-fullwidth={block.fullwidth}>
      <S.FigureBorder
        aria-label="Klikk for å åpne bildet i fullskjerm"
        tabIndex={0}
        onClick={() => setOpen(!open)}
      >
        <NextImage
          {...imageProps}
          layout="responsive"
          sizes="(max-width: 636px) 100vw, 1000px"
          alt={block.alt}
        />
      </S.FigureBorder>

      <S.Caption data-variant={block.variant}>
        {block.variant === "do" ? (
          <S.Icon variant={block.variant}>
            <SuccessFilled />
            {block.description && (
              <BodyShort size="small">{block.description}</BodyShort>
            )}
          </S.Icon>
        ) : block.variant === "warning" ? (
          <S.Icon variant={block.variant}>
            <WarningFilled />
            {block.description && (
              <BodyShort size="small">{block.description}</BodyShort>
            )}
          </S.Icon>
        ) : (
          <S.Icon variant={block.variant}>
            <ErrorFilled />
            {block.description && (
              <BodyShort size="small">{block.description}</BodyShort>
            )}
          </S.Icon>
        )}
      </S.Caption>
      <Lightbox open={open} onClose={() => setOpen(false)}>
        {open && (
          <NextImage
            {...imageProps}
            layout="intrinsic"
            sizes="(max-width: 100vw) 100vw, 1000px"
            alt={block.alt}
          />
        )}
      </Lightbox>
    </S.Figure>
  );
};

const DoDont = ({ node: { blocks } }: { node: DoDontT }): JSX.Element => {
  if (!blocks || blocks.length === 0) return null;
  return (
    <S.Section>
      {blocks.map((x) => (
        <Element key={x._key} block={x} />
      ))}
    </S.Section>
  );
};

export default DoDont;
