import { Button } from "@navikt/ds-react";
import Error from "next/error";
import React from "react";
import styled from "styled-components";
import { isDevelopment } from "../../components";

const ScDiv = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 4rem;
`;

const Page = ({ notFound }: { notFound: boolean }) => {
  if (notFound) {
    return <Error statusCode={404} />;
  }

  const handleIndexer = () => {
    fetch("/api/searchHook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ids: {
          updated: [],
          created: ["6ae41ac9-0f4b-420f-8417-5ebc0a24df23"],
          deleted: [],
        },
      }),
    }).then(console.log);
  };

  return (
    <ScDiv>
      <Button onClick={() => handleIndexer()}>Oppdater søk-index</Button>
    </ScDiv>
  );
};

/* Render page only when ran locally */
export function getStaticProps() {
  return {
    props: {
      notFound: process.env.NODE_ENV === "production" || !isDevelopment(),
    },
  };
}

export default Page;
