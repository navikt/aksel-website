import * as Icons from "@navikt/ds-icons";
import * as Tokens from "@navikt/ds-tokens/dist/tokens";

const Annotation = ({ mark }: { mark: { color?: string; name?: string } }) => {
  if (!mark.name) {
    return null;
  }

  const Ic = Icons?.[mark.name];
  const tokenColor = mark.color ? Tokens[mark.color] : "currentColor";

  return Ic ? (
    <Ic color={tokenColor} aria-hidden className="mx-1 inline-block" />
  ) : null;
};

export default Annotation;
