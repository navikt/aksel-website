import { PeopleFilled, Service } from "@navikt/ds-icons";
import { Chat } from "@navikt/ds-react";
import { SandboxComponentT } from "./types";

const ChatSandbox: SandboxComponentT = (props: any) => {
  return (
    <div className="grid gap-10">
      <Chat
        avatar={props?.avatar ? <Service aria-hidden /> : "EVA"}
        name="Eva"
        timestamp={props?.timestamp && "01.01.21 14:00"}
        avatarBgColor={props?.["overstyr-farger"] && "rgba(255, 236, 204, 1)"}
        backgroundColor={props?.["overstyr-farger"] && "rgba(255, 249, 240, 1)"}
      >
        <Chat.Bubble>Hei! Mitt navn er Eva.</Chat.Bubble>
        <Chat.Bubble>Hva kan jeg hjelpe deg med?</Chat.Bubble>
      </Chat>
      <Chat
        avatar={props?.avatar ? <PeopleFilled aria-hidden /> : "NO"}
        name="Ola Normann"
        timestamp={props?.timestamp && "01.01.21 14:10"}
        position="right"
        avatarBgColor={props?.["overstyr-farger"] && "rgba(204, 225, 255, 1)"}
        backgroundColor={props?.["overstyr-farger"] && "rgba(230, 240, 255, 1)"}
      >
        <Chat.Bubble>Hei Eva.</Chat.Bubble>
        <Chat.Bubble>
          Hvor sjekker jeg statusen på foreldrepengersøknaden min?
        </Chat.Bubble>
      </Chat>
    </div>
  );
};

ChatSandbox.args = {
  props: {
    timestamp: true,
    avatar: false,
    ["overstyr-farger"]: false,
  },
};

ChatSandbox.getCode = (props: any) => {
  return `<div className="grid gap-10">
  <Chat
  avatar={${props?.avatar ? "<Service />" : `"EVA"`}}
    name="EVA"${props?.timestamp ? `\ntimestamp="01.01.21 14:00"` : ""}${
    props?.["overstyr-farger"] ? `\navatarBgColor="rgba(255, 236, 204, 1)"` : ""
  }${
    props?.["overstyr-farger"]
      ? `\nbackgroundColor="rgba(255, 249, 240, 1)"`
      : ""
  }
  >
   <Chat.Bubble>Hei! Mitt navn er Eva.</Chat.Bubble>
   <Chat.Bubble>Hva kan jeg hjelpe deg med?</Chat.Bubble>
  </Chat>
  <Chat
  avatar={${props?.avatar ? "<PeopleFilled />" : `"NO"`}}
    name="Ola Normann"${props?.timestamp ? `\ntimestamp="01.01.21 14:00"` : ""}
    position="right"${
      props?.["overstyr-farger"]
        ? `\navatarBgColor="rgba(204, 225, 255, 1)"`
        : ""
    }${
    props?.["overstyr-farger"]
      ? `\nbackgroundColor="rgba(230, 240, 255, 1)"`
      : ""
  }
  >
  <Chat.Bubble>Hei Eva.</Chat.Bubble>
  <Chat.Bubble>
    Hvor sjekker jeg statusen på foreldrepengersøknaden min?
  </Chat.Bubble>
  </Chat>
</div>`;
};

export default ChatSandbox;
