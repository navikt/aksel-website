import { Print } from "@navikt/ds-icons";
import { BodyLong, Link } from "@navikt/ds-react";
import { SandboxComponentT } from "./types";

(Link as any).displayName = "Link";
Print.displayName = "Print";

const LinkSandbox: SandboxComponentT = (props: any) => {
  const linktext = props?.ikon ? (
    <>
      {"lenke til ny side"}
      <Print aria-label="Skriv ut dokument" />
    </>
  ) : (
    "lenke til ny side"
  );

  return (
    <BodyLong>
      Officia incididunt <Link href="#">{linktext}</Link> occaecat commodo id ad
      aliquip.
    </BodyLong>
  );
};

LinkSandbox.args = {
  props: {
    ikon: false,
  },
};

LinkSandbox.getCode = (props: any) => {
  const linktext = props?.ikon
    ? `lenke til ny side
    <Print aria-label="Skriv ut dokument" />`
    : "lenke til ny side";

  return `<BodyLong>
  Officia incididunt <Link href="#">${linktext}</Link> occaecat commodo id ad
  aliquip.
</BodyLong>`;
};

export default LinkSandbox;
