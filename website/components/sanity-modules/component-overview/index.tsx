import { Error, Success } from "@navikt/ds-icons";
import { BodyShort, Label, Link, Table, Tag, useId } from "@navikt/ds-react";
import React from "react";
import ReactTooltip from "react-tooltip";
import { FigmaIcon, FigmaIconNoSync, OverflowDetector } from "../..";
import { DsComponentOverview } from "../../../lib";
import NextLink from "next/link";

const SuccessIcon = () => (
  <span className="flex items-center">
    <Success aria-label="lansert" className="text-2xl text-green-500" />
  </span>
);

const ErrorIcon = () => (
  <span className="flex items-center">
    <Error aria-label="ikke laget enda" className="text-2xl text-red-500" />
  </span>
);

const BetaTag = () => (
  <Tag
    size="small"
    variant="info"
    className="border-none bg-purple-400 text-text-inverted"
  >
    Beta
  </Tag>
);

const DesignCell = ({ comp }: { comp: any }) => {
  if (comp.figma_version === "beta") {
    return <BetaTag />;
  }
  return (
    <>
      <SuccessIcon />
      <BodyShort
        className="flex items-center focus:outline-2 focus:outline-focus"
        size="small"
      >
        <FigmaIcon />
        {comp.figma_version === "new" ? "v3.0" : "v2.5"}
      </BodyShort>
    </>
  );
};

// TODO: Replace react-tooltip with ds-react tooltip when possible
const CodeCell = ({ comp }: { comp: any }) => {
  const id = useId();
  return (
    <>
      <SuccessIcon />
      {!comp.figma_sync && (
        <>
          <BodyShort
            className="flex items-center focus:outline-2 focus:outline-focus"
            tabIndex={0}
            data-tip=""
            data-for={`tooltip-sync-${id}`}
            size="small"
            aria-label="Kodet komponent er ikke i synk med design i Figma"
          >
            <FigmaIconNoSync />
          </BodyShort>
          <ReactTooltip
            id={`tooltip-sync-${id}`}
            place="top"
            type="dark"
            effect="solid"
          >
            Kodet komponent er ikke i synk med design i Figma
          </ReactTooltip>
        </>
      )}
    </>
  );
};

const ComponentOverview = ({
  node,
}: {
  node: DsComponentOverview;
}): JSX.Element => {
  if (!node || !node.components) {
    return null;
  }

  const TableRow = ({ comp }: { comp: any }) => {
    const id = useId();
    return (
      <Table.Row>
        <Table.HeaderCell>
          {comp.doc_link ? (
            <NextLink href={`/${comp.doc_link}`} passHref>
              <Link href={`/${comp.doc_link}`}>{comp.title}</Link>
            </NextLink>
          ) : (
            <BodyShort>{comp.title}</BodyShort>
          )}

          {comp.linked_package?.scope && (
            <>
              <BodyShort
                className="text-text-muted first-letter:capitalize"
                size="small"
              >
                <span
                  className="focus:outline-2 focus:outline-focus"
                  tabIndex={0}
                  data-tip=""
                  data-for={`${comp.linked_package?.title}-${id}`}
                >
                  {comp.linked_package?.scope}
                  <span className="navds-sr-only">
                    Pakkenavn: {comp.linked_package?.title}
                  </span>
                </span>
              </BodyShort>
              <ReactTooltip
                id={`${comp.linked_package?.title}-${id}`}
                place="top"
                type="dark"
                effect="solid"
              >
                {comp.linked_package?.title}
              </ReactTooltip>
            </>
          )}
        </Table.HeaderCell>
        <Table.DataCell>
          <span className="flex items-center gap-2">
            {comp.in_design ? <DesignCell comp={comp} /> : <ErrorIcon />}
          </span>
        </Table.DataCell>
        <Table.DataCell>
          <span className="flex items-center gap-2">
            {comp.in_code ? <CodeCell comp={comp} /> : <ErrorIcon />}
          </span>
        </Table.DataCell>
        <Table.DataCell>
          <span className="flex items-center gap-2">
            {comp.in_doc ? <SuccessIcon /> : <ErrorIcon />}
          </span>
        </Table.DataCell>
      </Table.Row>
    );
  };

  return (
    <div>
      <Label spacing className="mt-12">
        Tegnforklaring
      </Label>
      <ul className="mb-8 flex flex-col gap-3">
        <li className="flex items-center gap-2 px-2">
          <FigmaIcon /> v#.# - Figma-versjon av designsystemet
        </li>
        <li className="flex items-center gap-2 px-2">
          <FigmaIconNoSync /> - Kode ikke i synk med Figma
        </li>
        <li className="flex items-center gap-2 px-2">
          <BetaTag /> - Finnes som testversjon i Figma v3.0
        </li>
        <li className="flex items-center gap-2 px-2">
          <ErrorIcon /> - Ikke tilgjengelig
        </li>
        <li className="flex items-center gap-2 px-2">
          <SuccessIcon /> - Lansert 🎉
        </li>
      </ul>
      <OverflowDetector>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell className="text-text-muted">
                Komponent
              </Table.HeaderCell>
              <Table.HeaderCell className="text-text-muted">
                Design
              </Table.HeaderCell>
              <Table.HeaderCell className="text-text-muted">
                Kode
              </Table.HeaderCell>
              <Table.HeaderCell className="text-text-muted">
                Dok
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {node.components
              .sort((x, y) => x.title.localeCompare(y.title))
              .map((c, i) => (
                <TableRow key={c.title + i} comp={c} />
              ))}
          </Table.Body>
        </Table>
      </OverflowDetector>
    </div>
  );
};

export default ComponentOverview;
