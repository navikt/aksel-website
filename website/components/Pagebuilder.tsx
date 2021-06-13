import Code from "./code/Code";
import Block from "./Block";

const blocks = {
  code_example: (node) => <Code node={node} />,
  free_block: (node) => <Block node={node} />,
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
          return null;
        }
        const Comp = blocks[section._type];
        return <Comp key={section._key} {...section} />;
      })}
    </>
  );
};

export default PageBuilder;
