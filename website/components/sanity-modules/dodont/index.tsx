import React, { useState } from "react";
import NextImage from "next/image";
import { BodyShort } from "@navikt/ds-react";
import { useSanityImage } from "../../../lib/santiy";
import * as S from "./dodont.styles";
import { ErrorFilled, SuccessFilled, WarningFilled } from "@navikt/ds-icons";
import { DoDont as DoDontT, DoDontBlock as DoDontBlockT } from "../../../lib";
import { Lightbox } from "../..";
import { withErrorBoundary } from "../../website-features/error-boundary";

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
          sizes="(max-width: 800px)"
          alt={block.alt}
          quality="100"
        />
      </S.FigureBorder>

      <S.Caption data-variant={block.variant}>
        {block.variant === "do" ? (
          <S.Icon variant={block.variant}>
            <SuccessFilled aria-hidden />
            {block.description && (
              <BodyShort size="small" as="span">
                {block.description}
              </BodyShort>
            )}
          </S.Icon>
        ) : block.variant === "warning" ? (
          <S.Icon variant={block.variant}>
            <WarningFilled aria-hidden />
            {block.description && (
              <BodyShort size="small" as="span">
                {block.description}
              </BodyShort>
            )}
          </S.Icon>
        ) : (
          <S.Icon variant={block.variant}>
            <ErrorFilled aria-hidden />
            {block.description && (
              <BodyShort size="small" as="span">
                {block.description}
              </BodyShort>
            )}
          </S.Icon>
        )}
      </S.Caption>
      <Lightbox open={open} onClose={() => setOpen(false)}>
        {open && <NextImage {...imageProps} layout="fill" alt={block.alt} />}
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

export default withErrorBoundary(DoDont, "DoDont");
