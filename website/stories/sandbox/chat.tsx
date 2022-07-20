import { Print } from "@navikt/ds-icons";
import { BodyLong, Link } from "@navikt/ds-react";
import { SandboxComponentT } from "./types";

const ChatSandbox: SandboxComponentT = (props: any) => {
  return <div>a</div>;
};

ChatSandbox.args = {
  props: {
    ikon: false,
  },
};

ChatSandbox.getCode = (props: any) => {
  return ``;
};

export default ChatSandbox;
