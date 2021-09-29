import React from "react";
import styled from "styled-components";
/* import { sanityClient } from "../lib/sanity.server";

const Figure = styled.figure`
  display: flex;
  flex-direction: column;
  margin-bottom: var(--navds-spacing-8);
`;

const Caption = styled.figcaption`
  margin-top: var(--navds-spacing-4);
`;

type ImageType = {
  node: {
    title: string;
    caption?: string;
  };
}; */

const Figma = ({ node }: any): JSX.Element => {
  /* const imageProps = useNextSanityImage(sanityClient, node); */
  console.log(node);
  const src = node.embed?.match(/src="(.+?)"/)?.[1];
  return (
    <iframe
      style={{ border: "none", width: "100%" }}
      src={src || ""}
      height="500px"
    />
  );
  {
    /* <Figure>
      <div>
        <NextImage
          {...imageProps}
          layout="responsive"
          sizes="(max-width: 636px) 100vw, 1000px"
          alt={node.title}
        />
      </div>
      {node.caption && (
        <Caption className="navds-body-long">{node.caption}</Caption>
      )}
    </Figure> */
  }
};

export default Figma;
