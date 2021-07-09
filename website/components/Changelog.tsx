import { Link, Title } from "@navikt/ds-react";
/* import styled from "styled-components"; */
import { SanityBlockContent } from "./templating/SanityBlockContent";

const Changelog = ({ node }: { node: any }): JSX.Element => {
  const changes = node.changes;
  return (
    <div>
      {changes.map((change) => {
        return (
          <div key={change.title}>
            <Title level={3} size="l" spacing>
              {change.title}{" "}
              {change.pull_request && (
                <Link href={change.pull_request}>PR</Link>
              )}
            </Title>
            <SanityBlockContent blocks={change.body} />
          </div>
        );
      })}
    </div>
  );
};

export default Changelog;
