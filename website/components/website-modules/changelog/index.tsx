import { Collapse, Expand } from "@navikt/ds-icons";
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
  max-width: 500px;

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
const ScLink = styled(Link)<{ open: boolean }>`
  background: none;
  border: none;
  margin: 0;
  padding: 0;
  margin-bottom: ${(props) => (props.open ? "1rem" : "2rem")};
`;

const Log = ({ log }: { log: ChangelogT }) => {
  const getPrText = (pr) => {
    const number = pr.split("/").pop();
    return isNaN(number) ? "PR" : `#${number}`;
  };

  return (
    <div>
      {log.change_date && (
        <BodyShort size="small" as="div">
          {`${moment(log.change_date).format("DD. MMM. YY")}`}
        </BodyShort>
      )}
      <Heading spacing size="small" level="3">
        {`${log.title}  `}
        {log?.pull_request && (
          <Link href={log.pull_request}>{getPrText(log.pull_request)}</Link>
        )}
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
    </div>
  );
};

const Changelog = ({ node }: { node: ChangelogListT }) => {
  const [pairs, setPairs] = useState<
    { name: string; version: string }[] | null
  >(null);
  const [open, setOpen] = useState(false);
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
      <ScLink open={open} onClick={() => setOpen(!open)} forwardedAs="button">
        Filter{" "}
        {open ? (
          <Collapse aria-label="Lukk filter" />
        ) : (
          <Expand aria-label="Åpne filter" />
        )}
      </ScLink>
      {pairs && open && (
        <ScFilter>
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

/* const [open, setOpen] = useState(false);

  const getPrText = (pr) => {
    const number = pr.split("/").pop();
    return isNaN(number) ? "PR" : `#${number}`;
  };

  const logInstance = (log: DsChangelog, prefix?: string) => (
    <div key={log._id + prefix}>
      <Heading level="3" size="small" spacing>
        {log.title}{" "}
        {log.pull_request && (
          <Link href={log.pull_request}>{getPrText(log.pull_request)}</Link>
        )}
      </Heading>
      <BodyShort size="small" spacing as="div">
        {`${moment(log.change_date).format("DD. MMM. YY")}`}
      </BodyShort>
      <SanityBlockContent blocks={log.body} />
    </div>
  );

  return (
    <S.Changelog>
      <div>
        <LevelTwoHeading>{["Changelog"]}</LevelTwoHeading>
        <S.ChangelogButton onClick={() => setOpen(true)} variant="tertiary">
          Vis changelog
        </S.ChangelogButton>
      </div>
      {relevantLogs.map((log, x) => {
        const c = x > 3 ? null : logInstance(log);
        return c;
      })}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Modal.Content style={{ minWidth: 340 }}>
          <Heading level="2" size="medium" spacing>
            Changelog
          </Heading>
          {relevantLogs.map((log) => logInstance(log, "modal"))}
        </Modal.Content>
      </Modal>
    </S.Changelog> */
