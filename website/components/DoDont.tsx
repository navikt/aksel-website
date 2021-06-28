import { Label } from "@navikt/ds-react";
import styled from "styled-components";
import { urlFor } from "../lib/santiy";
import { SanityBlockContent } from "./templating/SanityBlockContent";

const Img = styled.img`
  max-width: 100%;
  line-height: 0;
  object-fit: cover;
`;

const Figure = styled.figure`
  display: inline-flex;
  flex-direction: column;
  margin: 0;
`;

const Section = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  word-wrap: break-word;
  margin-bottom: 2rem;
  column-gap: var(--navds-spacing-8);

  figure {
    width: 330px;
  }

  img {
    height: 330px;
    width: 100%;
    box-shadow: 0 0 0 1px rgba(41, 41, 41, 0.15);
    object-fit: contain;
  }
`;

const Div = styled.div`
  word-wrap: break-word;
  margin-bottom: 2rem;

  figure {
    width: 100%;
  }

  img {
    max-width: 100%;
    border: 1px solid rgba(41, 41, 41, 0.15);
    object-fit: contain;
  }
`;

const Caption = styled.figcaption`
  margin-top: var(--navds-spacing-4);
  border-top: var(--navds-spacing-4) solid;
  border-color: ${(props) => {
    switch (props["data-variant"]) {
      case "do":
        return "green";
      case "dont":
        return "red";
      case "warning":
        return "orange";
      default:
    }
  }};
`;

const Do = styled(Label)`
  margin-top: var(--navds-spacing-3);
  color: green;
`;

const Dont = styled(Label)`
  margin-top: var(--navds-spacing-3);
  color: red;
`;

const Warning = styled(Label)`
  margin-top: var(--navds-spacing-3);
  color: orange;
`;

const Element = ({ block, multiple = false }) => {
  return (
    <Figure>
      {multiple ? (
        <img
          alt={block.do_dont_alt}
          src={
            urlFor(block.do_dont_img)
              .fit("clip")
              .maxWidth(330)
              .maxHeight(330)
              .format("jpg")
              .quality(80)
              .url() || ""
          }
        />
      ) : (
        <img
          alt={block.do_dont_alt}
          src={urlFor(block.do_dont_img).format("jpg").quality(80).url() || ""}
        />
      )}

      <Caption data-variant={block.do_dont_variant}>
        {block.do_dont_variant === "do" ? (
          <Do spacing>Do</Do>
        ) : block.do_dont_variant === "warning" ? (
          <Warning spacing>Warning</Warning>
        ) : (
          <Dont spacing>Don't</Dont>
        )}
        <SanityBlockContent blocks={block.do_dont_body} />
      </Caption>
    </Figure>
  );
};

const DoDont = ({ node }) => {
  const multiple = node.do_dont_block.length > 1;
  return (
    <>
      {multiple ? (
        <Section>
          {node.do_dont_block.map((el) => {
            return (
              <Element key={el._key} multiple={multiple} block={el}></Element>
            );
          })}
        </Section>
      ) : (
        <Div>
          <Element block={node.do_dont_block[0]}></Element>
        </Div>
      )}
    </>
  );
};

export default DoDont;
