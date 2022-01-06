import { Heading, Link, TextField } from "@navikt/ds-react";
import React, { useState } from "react";
import styled from "styled-components";
import { SandboxKeys } from "../../stories/sandbox";

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

const InnerWrapper = styled.div`
  width: 100%;
  max-width: 700px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Page = () => {
  const [value, setValue] = useState("");
  return (
    <Wrapper>
      <InnerWrapper>
        <Heading level="1" size="medium" spacing>
          Alle sandbox-eksempler ({`${SandboxKeys.length}`})
        </Heading>
        <TextField
          label="Filtrer"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <ul>
          {SandboxKeys.sort()
            .filter((path) => {
              return value === "" ? true : path.indexOf(value) !== -1;
            })
            .map((path) => (
              <li key={path}>
                <Link href={`/sandboxes/${path}`}>{path}</Link>
              </li>
            ))}
        </ul>
      </InnerWrapper>
    </Wrapper>
  );
};
export default Page;
