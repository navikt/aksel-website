import Code from "./code/Code";
import Block from "./Block";
import PropTable from "./Proptable";
import Changelog from "./Changelog";
import styled from "styled-components";
import React from "react";
import { SanityBlockContent } from "./SanityBlockContent";

const Div = styled.div`
  margin-bottom: var(--navds-spacing-12);
`;

const PlaceHolder = styled.div`
  width: 100%;
  height: 300px;
  background-color: #f1f1f1;
  margin-bottom: var(--navds-spacing-12);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5;
`;

const blocks = {
  code_example: (node) => <Code node={node} />,
  free_block: (node) => <Block node={node} />,
  prop_table: (node) => <PropTable node={node} />,
  changelog: (node) => <Changelog node={node} />,
  portable_block: (node) => <SanityBlockContent blocks={node.body} />,
};

const PageBuilder = ({ sections }) => {
  if (!sections || sections.length === 0) {
    return null;
  }

  return (
    <>
      {sections.map((section) => {
        if (!Object.keys(blocks).includes(section._type)) {
          console.log(`${section._type} not a valid page builder section`);
          return <PlaceHolder key={section._key}>{section._type}</PlaceHolder>;
        }
        const Comp = blocks[section._type];
        return (
          <Div key={section._key}>
            <Comp {...section} />
          </Div>
        );
      })}
    </>
  );
};

export default PageBuilder;
