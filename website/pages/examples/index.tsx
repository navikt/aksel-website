import { Heading, Link } from "@navikt/ds-react";
import styled from "styled-components";
import { ExampleKeys } from "../../examples";
import NextLink from "next/link";
import { useEffect, useState } from "react";

const Wrapper = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;

  dl,
  dl > dd {
    list-style: none;
    margin: 0;
    padding: 0;
  }
`;

const Page = () => {
  const [groups, setGroups] = useState<string[]>([]);

  useEffect(() => {
    setGroups([...new Set(ExampleKeys.map((x) => x.split("-")[0]))]);
  }, []);

  return (
    <Wrapper>
      <div>
        <Heading level="1" size="medium" spacing>
          Alle kode-eksempler
        </Heading>
        <dl>
          {groups.map((head) => {
            return (
              <>
                <Heading level="2" size="small" spacing as="dt">
                  {head}
                </Heading>
                {ExampleKeys.filter((path) => path.startsWith(head)).map(
                  (path) => (
                    <dd key={path}>
                      <NextLink href={`/examples/${path}`} passHref>
                        <Link>{path.replace(`${head}-`, "")}</Link>
                      </NextLink>
                    </dd>
                  )
                )}
              </>
            );
          })}
        </dl>
      </div>
    </Wrapper>
  );
};
export default Page;
