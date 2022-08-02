import { SpeechBubble } from "@navikt/ds-react";
import { SandboxComponentT } from "./types";

const ChatSandbox: SandboxComponentT = (props: any) => {
  return <SpeechBubble {...props}>Slå på notifikasjoner</SpeechBubble>;
};

ChatSandbox.args = {
  props: {
    topText: "Toppteksten",
    illustration: "",
    backgroundColor: "",
    illustrationBgColor: "",
    position: ["left", "right"],
  },
};

ChatSandbox.getCode = (props: any) => {
  return `<SpeechBubble
    position="${props?.position}"
    topText="${props?.topText}"
    illustration="${props?.illustration}"
    backgroundColor="${props?.backgroundColor}"
    illustrationBgColor="${props?.illustrationBgColor}"
>
  Hei! Mitt navn er Aksel!
</SpeechBubble>`;
};

export default ChatSandbox;
