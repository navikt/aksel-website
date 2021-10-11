import styled from "styled-components";
import { ExampleKeys, Examples } from "../../examples";

const CodePreview = (key) => {
  if (!key || !(key in Examples)) {
    return null;
  }

  const Comp = Examples[key];
  return <Comp />;
};

const ExampleWrapper = styled.div`
  display: flex;
  padding: 1rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Page = ({ compkey }: { compkey: string }) => {
  return <ExampleWrapper>{CodePreview(compkey)}</ExampleWrapper>;
};

export default Page;

export async function getStaticProps({ params: { slug } }) {
  return {
    props: {
      compkey: slug,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [
      ...ExampleKeys.map((path) => ({
        params: { slug: [path] },
      })),
    ],
    fallback: false,
  };
}
