import { Link, Title } from "@navikt/ds-react";
/* import styled from "styled-components"; */
import { SanityBlockContent } from "./SanityBlockContent";

const Changelog = ({ node }) => {
  const changes = node.changes;
  return (
    <div>
      <Title spacing level={2} size="xl">
        Changelog
      </Title>
      {changes.map((change) => {
        return (
          <div key={change.title}>
            <Title level={3} size="l">
              {change.title}
            </Title>
            {change.pull_request && (
              <Link href={change.pull_request}>PullRequest (git)</Link>
            )}
            <SanityBlockContent blocks={change.body} />
          </div>
        );
      })}
    </div>
  );
};

export default Changelog;
