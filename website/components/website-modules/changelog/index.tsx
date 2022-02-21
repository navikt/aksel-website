import { BodyShort, Heading, Link, Select, Tag } from "@navikt/ds-react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Semver from "semver";
import styled from "styled-components";
import { ChangelogListT, ChangelogT } from "../../../lib";
import { withErrorBoundary } from "../../ErrorBoundary";
import { SanityBlockContent } from "../../SanityBlockContent";

const ScNeutralTag = styled(Tag)`
  background-color: var(--navds-semantic-color-canvas-background);
  border-color: var(--navds-semantic-color-border-muted);
`;

const ScTagWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 0.75rem;
`;

const ScFilter = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 3rem;

  > * {
    min-width: 200px;
  }

  > *:first-child {
    flex: 1 1 100px;
  }

  > *:last-child {
    flex: 1 1 10px;
    max-width: 250px;
  }
`;

const ScDiv = styled.div`
  margin: 0.5rem 0 0.5rem 0;
  padding: 1rem 0;
`;

const Log = ({ log }: { log: ChangelogT }) => {
  const getPrText = (pr) => {
    const number = pr.split("/").pop();
    return isNaN(number) ? "PR" : `#${number}`;
  };

  const getChange = (s: string) => {
    console.log(s);
    switch (s) {
      case "breaking":
        return "💥";
      case "new":
        return "✨";
      case "bug":
        return "🐞";
      case "fix":
        return "🔨";
      case "uu":
        return "♿️";
      default:
        return "";
    }
  };

  return (
    <ScDiv>
      <BodyShort as="span" className="flex gap-2" size="small">
        {log.change_date && (
          <span>{`${moment(log.change_date).format("DD. MMM. YY")}`}</span>
        )}
        {log?.pull_request && (
          <Link href={log.pull_request} className="text-text">
            {getPrText(log.pull_request)}
          </Link>
        )}
        {log.change && <span>{getChange(log.change)}</span>}
      </BodyShort>
      <Heading spacing size="small" level="3">
        {`${log.title}  `}
      </Heading>
      <ScTagWrapper>
        {log.packages.map((p) => (
          <Tag size="small" key={p._key} variant="info">
            {`${p?.pack?.title.replace("@navikt/", "")} ${p.version}`}
          </Tag>
        ))}
        {log.tags &&
          log.tags.map((t, x) => (
            <ScNeutralTag size="small" key={t + x} variant="info">
              {t}
            </ScNeutralTag>
          ))}
      </ScTagWrapper>
      <SanityBlockContent blocks={log.body} />
    </ScDiv>
  );
};

const Changelog = ({ node }: { node: ChangelogListT }) => {
  const [pairs, setPairs] = useState<
    { name: string; version: string }[] | null
  >(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedVersion, setSelectedVersion] = useState(null);

  useEffect(() => {
    const allPacks = () =>
      node?.logs?.reduce(
        (prev, c) => [
          ...prev,
          ...c.packages.map((p) => ({
            name: p.pack?.title,
            version: p.version,
          })),
        ],
        []
      );

    node?.logs && setPairs([...allPacks()]);
  }, [node]);

  useEffect(() => {
    !selectedPackage && setSelectedVersion(null);
  }, [selectedPackage]);

  if (!node || !node.logs?.length) {
    return null;
  }

  const filteredLogs = () => {
    let logs = node.logs;
    if (!selectedPackage) {
      return logs;
    }
    logs = logs.filter((x) =>
      x.packages.find((p) => p?.pack?.title === selectedPackage)
    );
    if (selectedVersion) {
      logs = logs.filter((x) =>
        x.packages.find(
          (p) =>
            p.pack.title === selectedPackage &&
            Semver.satisfies(p.version, `>=${selectedVersion}`)
        )
      );
    }
    return logs;
  };

  if (!filteredLogs()) {
    return null;
  }

  return (
    <div>
      {pairs && (
        <details>
          <Heading
            size="small"
            as="summary"
            className="mb-2 max-w-lg cursor-pointer py-2 hover:bg-interaction-primary-hover-subtle focus:shadow-focus focus:outline-none"
          >
            Filter
          </Heading>
          <ScFilter className="max-w-lg">
            <Select
              label="Pakke"
              onChange={(e) =>
                setSelectedPackage(e.target.value ? e.target.value : null)
              }
            >
              <option value={""} />
              {[...new Set(pairs.map((x) => x.name))].map((name: string, i) => (
                <option key={name + i} value={name}>
                  {name}
                </option>
              ))}
            </Select>
            <Select
              label="Versjon >="
              disabled={!selectedPackage}
              onChange={(e) =>
                setSelectedVersion(e.target.value ? e.target.value : null)
              }
            >
              <option value=""></option>
              {selectedPackage &&
                [
                  ...new Set(
                    pairs
                      .filter((x) => x.name === selectedPackage)
                      .map((x) => x.version)
                  ),
                ].map((version: string, i) => (
                  <option key={version + i} value={version}>
                    {version}
                  </option>
                ))}
            </Select>
          </ScFilter>
        </details>
      )}
      {filteredLogs()
        .sort(
          (a, b) =>
            new Date(b.change_date).getTime() -
            new Date(a.change_date).getTime()
        )
        .map((l) => (
          <Log key={l._id} log={l} />
        ))}
    </div>
  );
};

export default withErrorBoundary(Changelog, "Changelog");
