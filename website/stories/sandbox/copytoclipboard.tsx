import { Print } from "@navikt/ds-icons";
import { BodyLong, Link } from "@navikt/ds-react";
import { CopyToClipboard } from "@navikt/ds-react-internal";
import { SandboxComponentT } from "./types";

const CopyToClipboardSandbox: SandboxComponentT = (props: any) => {
  return (
    <CopyToClipboard
      popoverText={props?.popoverText}
      copyText="3.14"
      iconPosition={props?.iconPosition}
      size={props?.size}
      popoverPlacement={props?.popoverPlacement}
    >
      {props?.text}
    </CopyToClipboard>
  );
};

CopyToClipboardSandbox.args = {
  props: {
    size: ["medium", "small"],
    text: "",
    popoverText: "Kopierte Pi!",
    iconPosition: ["left", "right"],
    popoverPlacement: [
      "bottom",
      "top",
      "right",
      "left",
      "top-start",
      "top-end",
      "bottom-start",
      "bottom-end",
      "right-start",
      "right-end",
      "left-start",
      "left-end",
    ],
  },
};

CopyToClipboardSandbox.getCode = (props: any) => {
  return `<CopyToClipboard
  popoverText="${props?.popoverText ? props?.popoverText : "Kopiert!"}"
  copyText="3.14"
  iconPosition="${props?.iconPosition}"
  size="${props?.size}"
  popoverPlacement="${props?.popoverPlacement}"
  ${props?.text ? `>\n${props?.text}\n</CopyToClipboard>` : `/>\n`}`;
};

export default CopyToClipboardSandbox;
