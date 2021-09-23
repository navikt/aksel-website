import { Link, Heading } from "@navikt/ds-react";
import React from "react";
/* import styled from "styled-components"; */
import { SanityBlockContent } from "./templating/SanityBlockContent";
import { PreviewBox } from "./templating/TemplateStyles";

const Changelog = ({ node }: { node: any }): JSX.Element => {
  return <PreviewBox>🚧 Changelog 🚧</PreviewBox>;
  const changes = node.changes;
  return (
    <div>
      {changes.map((change) => {
        return (
          <div key={change.title}>
            <Heading level="3" size="large" spacing>
              {change.title}{" "}
              {change.pull_request && (
                <Link href={change.pull_request}>PR</Link>
              )}
            </Heading>
            <SanityBlockContent blocks={change.body} />
          </div>
        );
      })}
    </div>
  );
};

export default Changelog;
