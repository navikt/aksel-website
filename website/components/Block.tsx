import { SanityBlockContent } from "./SanityBlockContent";

const Block = ({ node }) => {
  return (
    <>
      <SanityBlockContent blocks={node.body} />
    </>
  );
};

export default Block;
