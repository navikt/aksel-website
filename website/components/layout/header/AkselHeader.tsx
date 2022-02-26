import { Heading } from "@navikt/ds-react";
import NextLink from "next/link";
import React from "react";
import { Search } from "../..";

const AkselHeader = (): JSX.Element => (
  <header className="flex h-header border-b border-b-border-muted">
    <a className="skiplink" href="#hovedinnhold" tab-index={-1}>
      Hopp til innhold
    </a>
    <NextLink href="/" passHref>
      <Heading
        as="a"
        level="1"
        size="xlarge"
        className="flex h-full items-center px-6 hover:bg-gray-100 focus:shadow-focus-inset focus:outline-none"
      >
        Aksel
      </Heading>
    </NextLink>
    <Search inverted />
  </header>
);

export default AkselHeader;
