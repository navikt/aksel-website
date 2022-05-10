import { SanityT } from "@/lib";
import { BodyShort, Label, Table } from "@navikt/ds-react";
import { withErrorBoundary } from "../../ErrorBoundary";
import Color from "color";
import cl from "classnames";

const Token = ({ token }: { token: SanityT.Schema.ds_tokens }) => {
  switch (true) {
    case token.title.startsWith("semantic-color"): {
      return (
        <Table.ExpandableRow
          togglePlacement="right"
          content={
            <div className="flex flex-col gap-2">
              <div>
                <Label className="mb-1">Parent token:</Label>
                <code className="text-medium">{`${token.parent}`}</code>
              </div>
              <div>
                <Label className="mb-1">Fargeverdier</Label>
                <ul>
                  <li>
                    {`RGB: `}
                    <code className="text-medium">{`${Color(
                      token.raw
                    ).rgb()}`}</code>
                  </li>
                  <li>
                    {`HEX: `}
                    <code className="text-medium">{`${Color(
                      token.raw
                    ).hex()}`}</code>
                  </li>
                </ul>
              </div>
            </div>
          }
        >
          <Table.DataCell className="w-full py-2">
            <BodyShort className="mb-1">{token.beskrivelse}</BodyShort>
            <code className="text-medium">{`--navds-${token.title} / `}</code>
            <code className="text-medium">{`${Color(token.raw).hex()}`}</code>
          </Table.DataCell>
          <Table.DataCell className="px-2 py-2">
            <div
              className={cl(
                "flex h-16 w-16 items-center justify-center rounded-full py-4",
                {
                  "border border-border-muted":
                    Color(token.raw).luminosity() > 0.9,
                }
              )}
              style={{ background: token.color }}
            >
              <span className="navds-sr-only">
                Fargevisning for {token.title}
              </span>
            </div>
          </Table.DataCell>
        </Table.ExpandableRow>
      );
    }
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
  if (!tokenlist || tokenlist.length === 0) {
    return null;
  }

  return (
    <div className="mb-8 flex flex-col">
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell scope="col" className="text-text-muted">
              Bruk
            </Table.HeaderCell>
            <Table.HeaderCell scope="col" className="text-text-muted">
              Token
            </Table.HeaderCell>
            <Table.HeaderCell className="text-text-muted">
              Info
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
            .navds-table__expanded-row-content {
              padding: var(--navds-spacing-4) var(--navds-spacing-3);
            }
          `}
        </style>
      </Table>
    </div>
  );
};

export default withErrorBoundary(TokenBlock, "Tokens");
