import React from "react";
import { SanityBlockContent } from "../SanityBlockContent";
import NextImage from "next/image";
import { Label } from "@navikt/ds-react";
import { useSanityImage } from "../../lib/santiy";
import * as S from "./dodont.styles";
import { ErrorFilled, SuccessFilled, WarningFilled } from "@navikt/ds-icons";
import {
  DoDont as DoDontT,
  DoDontBlock as DoDontBlockT,
} from "../../lib/autogen-types";

const Element = ({ block }: { block: DoDontBlockT }): JSX.Element => {
  const imageProps = useSanityImage(block.picture);

  return (
    <S.Figure data-fullwidth={block.fullwidth}>
      <S.FigureBorder>
        <NextImage
          {...imageProps}
          layout="responsive"
          sizes="(max-width: 636px) 100vw, 1000px"
          alt={block.alt}
        />
      </S.FigureBorder>

      <S.Caption data-variant={block.variant}>
        <Label spacing as="div">
          {block.variant === "do" ? (
            <S.Icon variant={block.variant}>
              <SuccessFilled />
              Gjør dette
            </S.Icon>
          ) : block.variant === "warning" ? (
            <S.Icon variant={block.variant}>
              <WarningFilled />
              Pass på dette
            </S.Icon>
          ) : (
            <S.Icon variant={block.variant}>
              <ErrorFilled />
              Ikke gjør dette
            </S.Icon>
          )}
        </Label>
        <SanityBlockContent blocks={block.body} />
      </S.Caption>
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
