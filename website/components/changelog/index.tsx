import React from "react";
import { Link, Heading } from "@navikt/ds-react";
import { SanityBlockContent } from "../SanityBlockContent";
import { PreviewBox } from "../templates/TemplateStyles";
import * as S from "./changelog.styles";

const Changelog = ({ node }: { node: any }): JSX.Element => {
  return <PreviewBox>🚧 Changelog 🚧</PreviewBox>;
  const changes = node.changes;
  return (
    <S.Changelog2>
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
    </S.Changelog2>
  );
};

export default Changelog;
