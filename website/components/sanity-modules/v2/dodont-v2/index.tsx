import { BodyShort, Heading } from "@navikt/ds-react";
import NextImage from "next/image";
import React, { useState } from "react";
import { Lightbox } from "../../..";
import {
  DoDontBlock,
  DoDontV2,
  SanityKeyed,
  useSanityImage,
} from "../../../../lib";
import { withErrorBoundary } from "../../../ErrorBoundary";
import { SanityBlockContent } from "../../../SanityBlockContent";
import * as S from "./dodont.styles";

const Element = ({
  block,
}: {
  block: SanityKeyed<DoDontBlock>;
}): JSX.Element => {
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
        <S.Icon variant={block.variant}>
          {block.description && (
            <BodyShort size="small" as="span">
              {block.description}
            </BodyShort>
          )}
        </S.Icon>
        {/* {block.variant === "do" ? (
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
        )} */}
      </S.Caption>
      <Lightbox open={open} onClose={() => setOpen(false)}>
        {open && (
          <NextImage
            {...imageProps}
            quality="100"
            layout="fill"
            alt={block.alt}
          />
        )}
      </Lightbox>
    </S.Figure>
  );
};

const DoDont = ({ node }: { node: DoDontV2 }) => {
  if (!node || !node.title || node?.blokker.length === 0) return null;

  return (
    <div className="my-16">
      <Heading level="3" className="index-lvl3 mt-11" size="medium">
        {node.title}
      </Heading>
      <SanityBlockContent blocks={node.forklaring} />
      <div className="mb-8 flex flex-wrap justify-between gap-8">
        {node.blokker.map((x) => (
          <Element key={x._key} block={x} />
        ))}
      </div>
    </div>
  );
};

export default withErrorBoundary(DoDont, "DoDont");
