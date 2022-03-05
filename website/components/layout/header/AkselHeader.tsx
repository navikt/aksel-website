import { Heading } from "@navikt/ds-react";
import NextLink from "next/link";
import React from "react";
import { Search } from "../..";
import cl from "classnames";

const AkselHeader = ({ className }: { className?: string }): JSX.Element => (
  <header
    className={cl(
      "flex justify-center border-b border-b-border-muted",
      className
    )}
  >
    <div className="flex h-header w-full max-w-aksel-max-w justify-between">
      <a className="skiplink" href="#hovedinnhold" tab-index={-1}>
        Hopp til innhold
      </a>
      <NextLink href="/" passHref>
        <Heading
          as="a"
          level="1"
          size="xlarge"
          className="flex h-full items-center px-6 hover:bg-gray-800/10 focus:shadow-focus-inset focus:outline-none"
        >
          Aksel
        </Heading>
      </NextLink>
      <Search inverted />
    </div>
  </header>
);

export default AkselHeader;
