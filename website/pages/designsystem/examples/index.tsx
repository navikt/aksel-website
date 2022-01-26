import { Heading, Link, TextField } from "@navikt/ds-react";
import React, { useState } from "react";
import { ExampleKeys } from "../../../stories/examples";

const Page = () => {
  const [value, setValue] = useState("");
  return (
    <div className="w-screen flex flex-col justify-center items-center p-8">
      <div className="w-full, max-w-[700px] flex flex-col gap-6">
        <Heading level="1" size="medium" spacing>
          Alle kode-eksempler ({`${ExampleKeys.length}`})
        </Heading>
        <TextField
          label="Filtrer"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <ul className="list-none p-0 m-0">
          {ExampleKeys.sort()
            .filter((path) => {
              return value === "" ? true : path.indexOf(value) !== -1;
            })
            .map((path) => (
              <li key={path} className="list-none p-0 m-0">
                <Link href={`/designsystem/examples/${path}`}>{path}</Link>
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
      slug: "designsystem/examples",
      isDraft: false,
      validPath: true,
      preview: false,
    },
  };
}

export default Page;
