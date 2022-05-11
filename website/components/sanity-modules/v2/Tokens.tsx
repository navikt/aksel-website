import { SanityT } from "@/lib";
import { BodyShort, Table } from "@navikt/ds-react";
import cl from "classnames";
import Color from "color";
import { withErrorBoundary } from "../../ErrorBoundary";
import CodeSnippet from "../code/Snippet";

const Token = ({ token }: { token: SanityT.Schema.ds_tokens }) => {
  if (token.title.startsWith("semantic-color")) {
    return <div style={{ background: token.raw }} className="h-24 w-24"></div>;
  }
  return (
    <div>
      Ikke laget støtte for denne token-typen enda:
      <code>{token.title}</code>. Ta kontakt med utivkler før publisering
    </div>
  );
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
    <div className="mb-8 flex gap-4">
      {tokenlist.map((tok, i) => (
        <Token key={tok.title + i} token={tok} />
      ))}
    </div>
  );
};

export default withErrorBoundary(TokenBlock, "Tokens");
