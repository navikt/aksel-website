import { Heading, Link, TextField } from "@navikt/ds-react";
import React, { useState } from "react";
import { SandboxKeys } from "../../../stories/sandbox";

const Page = () => {
  const [value, setValue] = useState("");
  return (
    <div className="w-screen flex flex-col justify-center items-center p-8">
      <div className="w-full, max-w-[700px] flex flex-col gap-6">
        <Heading level="1" size="medium" spacing>
          Alle sandbox-eksempler ({`${SandboxKeys.length}`})
        </Heading>
        <TextField
          label="Filtrer"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <ul className="list-none m-0 p-0">
          {SandboxKeys.sort()
            .filter((path) => {
              return value === "" ? true : path.indexOf(value) !== -1;
            })
            .map((path) => (
              <li key={path} className="list-none m-0 p-0">
                <Link href={`/designsystem/sandboxes/${path}`}>{path}</Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  return {
    props: {
      slug: "designsystem/sandboxes",
      isDraft: false,
      validPath: true,
      preview: false,
    },
  };
}

export default Page;
