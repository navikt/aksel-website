import { Heading, Link } from "@navikt/ds-react";
import styled from "styled-components";
import { ExampleKeys } from "../../component-examples";
import NextLink from "next/link";

const Wrapper = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;

  ul,
  ul > li {
    list-style: none;
    margin: 0;
    padding: 0;
  }
`;

const Page = () => {
  return (
    <Wrapper>
      <div>
        <Heading level="1" size="medium" spacing>
          Alle kode-eksempler
        </Heading>
        <ul>
          {ExampleKeys.map((path) => (
            <li key={path}>
              <NextLink href={`/examples/${path}`} passHref>
                <Link>{path}</Link>
              </NextLink>
            </li>
          ))}
        </ul>
      </div>
    </Wrapper>
  );
};
export default Page;
