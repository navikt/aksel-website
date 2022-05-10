import { SanityT } from "@/lib";
import { BodyShort, Label, Table } from "@navikt/ds-react";
import { withErrorBoundary } from "../../ErrorBoundary";
import Color from "color";
import cl from "classnames";

const Token = ({ token }: { token: SanityT.Schema.ds_tokens }) => {
  switch (true) {
    case token.title.startsWith("semantic-color"):
      return (
        <Table.ExpandableRow
          content={
            <div className="flex flex-col gap-2">
              <div>
                <Label>Parent:</Label>
                <div>{`${token.parent}`}</div>
              </div>
              <div>
                <Label>Fargeverdi:</Label>
                <div>{`${token.raw}`}</div>
              </div>
            </div>
          }
        >
          <Table.DataCell className="py-2">
            <Label>{token.beskrivelse}</Label>
            <BodyShort className="text-text-muted">{`--navds-${token.title}`}</BodyShort>
          </Table.DataCell>
          <Table.DataCell className="px-2 py-2">
            <div
              className={cl("h-12 w-full rounded-full py-4", {
                "border border-border-muted":
                  Color(token.raw).luminosity() > 0.9,
              })}
              style={{ background: token.color }}
            />
          </Table.DataCell>
        </Table.ExpandableRow>
      );
    default: {
      return (
        <Table.Row>
          <Table.DataCell className="px-2 py-2">X</Table.DataCell>
          <Table.DataCell className="px-2 py-2">
            Ikke laget støtte for denne token-typen enda:
            <code>{token.title}</code>. Ta kontakt med utivkler før publisering
          </Table.DataCell>
        </Table.Row>
      );
    }
  }
};

const TokenBlock = ({
  node: { tokenlist },
}: {
  node: { tokenlist: SanityT.Schema.ds_tokens[] };
}) => {
  if (!tokenlist || tokenlist.length === 0) return null;

  return (
    <div className="mb-8 flex flex-col">
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Mer info</Table.HeaderCell>
            <Table.HeaderCell scope="col">Bruk</Table.HeaderCell>
            <Table.HeaderCell scope="col" className="text-right">
              Token
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body className="token-row">
          {tokenlist.map((tok, i) => (
            <Token key={tok.title + i} token={tok} />
          ))}
        </Table.Body>
        <style jsx global>
          {`
            .token-row {
            }
          `}
        </style>
      </Table>
    </div>
  );
};

export default withErrorBoundary(TokenBlock, "Tokens");
