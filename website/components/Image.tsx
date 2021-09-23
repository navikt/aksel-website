import "nav-frontend-tabell-style/dist/main.css";
import React from "react";
import styled from "styled-components";
import { urlFor } from "../lib/santiy";

const Div = styled.div`
  margin-bottom: var(--navds-spacing-8);
`;

const Figure = styled.figure`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0;
  img {
    max-width: 100%;
  }
`;

const Caption = styled.caption`
  margin-top: var(--navds-spacing-4);
`;

const Image = ({ node }: { node: any }): JSX.Element => {
  return (
    <Div>
      <Figure>
        <img
          alt={node.picture_caption}
          src={urlFor(node.picture_image).format("jpg").quality(80).url() || ""}
        />
        <Caption className="navds-body-long">{node.picture_caption}</Caption>
      </Figure>
    </Div>
  );
};

export default Image;
