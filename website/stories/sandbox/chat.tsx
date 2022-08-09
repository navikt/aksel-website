import { PeopleFilled, ServiceFilled } from "@navikt/ds-icons";
import { SandboxComponentT } from "./types";
import { SpeechBubble, SpeechBubbleProps } from "@navikt/ds-react";

const gray100 = "var(--navds-global-color-gray-100)";
const blue100 = "var(--navds-global-color-blue-100)";

const ChatSandbox: SandboxComponentT = (props: SpeechBubbleProps) => {
  const evaPosition: "right" | "left" =
    props?.position === "left" ? "right" : "left";

  const evaProps = {
    topText: "Eva 31.05.2020",
    backgroundColor: gray100,
    position: evaPosition,
  };

  const olaProps = {
    ...props,
    backgroundColor: props?.backgroundColor === "default" ? "" : blue100,
    illustrationBgColor:
      props?.illustrationBgColor === "default" ? "" : blue100,
  };

  return (
    <div>
      <SpeechBubble
        {...evaProps}
        illustration={
          <ServiceFilled style={{ transform: "translateY(0.5rem)" }} />
        }
      >
        <SpeechBubble.Bubble>Hei! Mitt navn er Eva.</SpeechBubble.Bubble>
        <SpeechBubble.Bubble>Hva kan jeg hjelpe deg med?</SpeechBubble.Bubble>
      </SpeechBubble>
      <SpeechBubble
        className="mt-6"
        {...olaProps}
        illustration={
          <PeopleFilled style={{ transform: "translateY(0.5rem)" }} />
        }
      >
        <SpeechBubble.Bubble>Hei Eva.</SpeechBubble.Bubble>
        <SpeechBubble.Bubble>
          Hvor sjekker jeg statusen på foreldrepengersøknaden min?
        </SpeechBubble.Bubble>
      </SpeechBubble>
    </div>
  );
};

ChatSandbox.args = {
  props: {
    topText: "Ola Normann 31.01.21 14:00",
    backgroundColor: ["default", "blue-100"],
    illustrationBgColor: ["default", "blue-100"],
    position: ["right", "left"],
  },
};

ChatSandbox.getCode = (props: any) => {
  const newIllustrationBgColor =
    props?.illustrationBgColor === "default"
      ? ""
      : `illustrationBgColor="${blue100}"`;

  const newBackgroundColor =
    props?.backgroundColor === "default" ? "" : `backgroundColor="${blue100}"`;

  return `<SpeechBubble
    topText="${props?.topText}"
    illustration={<PeopleFilled />}
    position="${props?.position}"${newBackgroundColor}${newIllustrationBgColor}
>
    <SpeechBubble.Bubble>Hei Eva.</SpeechBubble.Bubble>
    <SpeechBubble.Bubble>
    Hvor sjekker jeg statusen på foreldrepengersøknaden min?
    </SpeechBubble.Bubble>
</SpeechBubble>`;
};

export default ChatSandbox;
