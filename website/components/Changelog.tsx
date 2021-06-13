import { Link, Title } from "@navikt/ds-react";
/* import styled from "styled-components"; */
import { SanityBlockContent } from "./SanityBlockContent";

const Changelog = ({ node }) => {
  console.log(node);
  const changes = node.changes;
  return (
    <div>
      <Title spacing level={3} size="m">
        Changelog
      </Title>
      {changes.map((change) => {
        return (
          <>
            <Title level={4} size="s">
              {change.title}
            </Title>
            {change.pull_request && (
              <Link href={change.pull_request}>PullRequest (git)</Link>
            )}
            <SanityBlockContent blocks={change.body} />
          </>
        );
      })}
    </div>
  );
};

export default Changelog;
