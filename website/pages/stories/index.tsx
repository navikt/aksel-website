import { Heading, Link } from "@navikt/ds-react";
import React from "react";
import { ExampleKeys } from "../../stories/examples";
import { SandboxKeys } from "../../stories/sandbox";

const Page = () => {
  return (
    <div className="flex w-screen flex-col items-center justify-center p-8">
      <div className="mx-auto px-4">
        <Heading level="1" size="medium" spacing>
          Alle stories
        </Heading>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div>
            <Heading level="2" size="small" spacing>
              Examples
            </Heading>
            <ul className="m-0 list-none p-0">
              {ExampleKeys.sort().map((path) => (
                <li key={path} className="m-0 list-none p-0">
                  <Link href={`/stories/${path}`}>{path}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Heading level="2" size="small" spacing>
              Sandboxes
            </Heading>
            <ul className="m-0 list-none p-0">
              {SandboxKeys.sort().map((path) => (
                <li key={path} className="m-0 list-none p-0">
                  <Link href={`/stories/${path}`}>{path}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  return {
    props: {
      slug: "/stories",
      preview: false,
    },
  };
}

export default Page;
