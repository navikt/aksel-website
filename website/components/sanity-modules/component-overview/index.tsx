import { Error, Success } from "@navikt/ds-icons";
import { BodyShort, Label, Link, Table, Tag, Tooltip } from "@navikt/ds-react";
import NextLink from "next/link";
import React from "react";
import { FigmaIcon, FigmaIconNoSync } from "../../..";
import { DsComponentOverview } from "@/lib";

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

const CodeCell = ({ comp }: { comp: any }) => {
  return (
    <>
      <SuccessIcon />
      {!comp.figma_sync && (
        <>
          <Tooltip content="Kodet komponent er ikke i synk med design i Figma">
            <BodyShort
              className="flex items-center focus:outline-2 focus:outline-focus"
              tabIndex={0}
              size="small"
              aria-label="Kodet komponent er ikke i synk med design i Figma"
            >
              <FigmaIconNoSync />
            </BodyShort>
          </Tooltip>
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
                className="text-left text-text-muted first-letter:capitalize"
                size="small"
              >
                <Tooltip
                  content={comp.linked_package?.title}
                  placement="bottom"
                >
                  <span
                    className="focus:outline-2 focus:outline-focus"
                    tabIndex={0}
                  >
                    {comp.linked_package?.scope}
                    <span className="navds-sr-only">
                      Pakkenavn: {comp.linked_package?.title}
                    </span>
                  </span>
                </Tooltip>
              </BodyShort>
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
      <div className="overflow-x-auto">
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
      </div>
    </div>
  );
};

export default ComponentOverview;
