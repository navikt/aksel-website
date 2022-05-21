import { dateStr } from "@/utils";
import { BodyShort, Heading, Link, Select, Tag } from "@navikt/ds-react";
import React, { useEffect, useState } from "react";
import Semver from "semver";
import { ChangelogListT, ChangelogT } from "@/lib";
import { withErrorBoundary } from "@/error-boundary";
import { SanityBlockContent } from "@/sanity-block";

const Log = ({ log }: { log: ChangelogT }) => {
  const getPrText = (pr) => {
    const number = pr.split("/").pop();
    return isNaN(number) ? "PR" : `#${number}`;
  };

  const getChange = (s: string) => {
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
    <div className="my-2 mx-0 py-4">
      <BodyShort as="span" className="flex gap-2" size="small">
        {log.change_date && <span>{`${dateStr(log.change_date)}`}</span>}
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
      <div className="mb-3 flex flex-wrap gap-2">
        {log.packages.map((p) => (
          <Tag size="small" key={p._key} variant="info">
            {`${p?.pack?.title.replace("@navikt/", "")} ${p.version}`}
          </Tag>
        ))}
        {log.tags &&
          log.tags.map((t, x) => (
            <Tag
              size="small"
              key={t + x}
              variant="info"
              className="border-border-muted bg-gray-100"
            >
              {t}
            </Tag>
          ))}
      </div>
      <SanityBlockContent blocks={log.body} />
    </div>
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
          <div className="mb-12 flex max-w-lg flex-wrap gap-4">
            <Select
              className="min-w-[200px] flex-1 basis-28"
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
              className="min-w-[200px] max-w-[250px] flex-1 basis-3"
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
          </div>
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
