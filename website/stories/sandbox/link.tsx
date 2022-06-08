import { Print } from "@navikt/ds-icons";
import { BodyLong, Link } from "@navikt/ds-react";
import { SandboxComponentT } from "./types";

(Link as any).displayName = "Link";
Print.displayName = "Print";

const LinkSandbox: SandboxComponentT = (props: any) => {
  const linktext =
    props?.Komposisjon === "Ikon" ? (
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
    Komposisjon: ["ingen", "Ikon"],
  },
};

export default LinkSandbox;
