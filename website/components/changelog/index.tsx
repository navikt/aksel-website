import React, { useEffect, useState } from "react";
import { Link, Heading, BodyShort, Modal } from "@navikt/ds-react";
import { SanityBlockContent } from "../SanityBlockContent";
import * as S from "./changelog.styles";
import { withErrorBoundary } from "../error-boundary";
import { ChangelogT } from "../../lib";
import { LevelTwoHeading } from "..";
import moment from "moment";

const Changelog = ({
  changelogs,
  id,
}: {
  changelogs: ChangelogT[];
  id: string;
}): JSX.Element => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    Modal.setAppElement("#__next");
  }, []);
  const relevantLogs = changelogs
    .filter((x) => {
      return (
        x.dependents === "all" ||
        x.spesific_component.find((y) => id.includes(y._ref))
      );
    })
    .sort((a, b) => {
      return (
        new Date(b.change_date).getTime() - new Date(a.change_date).getTime()
      );
    });

  if (relevantLogs.length === 0) {
    return null;
  }

  const getPrText = (pr) => {
    const number = pr.split("/").pop();
    return isNaN(number) ? "PR" : `#${number}`;
  };

  const logInstance = (log: ChangelogT, prefix?: string) => (
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
        <LevelTwoHeading divider>Changelog</LevelTwoHeading>
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
    </S.Changelog>
  );
};

export default withErrorBoundary(Changelog, "Changelog");
