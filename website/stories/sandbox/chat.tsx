import { Chat, GuideDefaultIllustration } from "@navikt/ds-react";
import { SandboxComponentT } from "./types";

const ChatSandbox: SandboxComponentT = (props: any) => {
  return (
    <div className="grid gap-10">
      <Chat
        avatar={props?.avatar ? <GuideDefaultIllustration /> : "ON"}
        name="Ola Normann"
        timestamp={props?.timestamp && "01.01.21 14:00"}
        avatarBgColor={props?.["overstyr-farger"] && "rgba(255, 236, 204, 1)"}
        backgroundColor={props?.["overstyr-farger"] && "rgba(255, 249, 240, 1)"}
      >
        <Chat.Bubble>
          Aute minim nisi sunt mollit duis sunt nulla minim non proident.
        </Chat.Bubble>
        <Chat.Bubble>Tempor fugiat amet eu sint in in ullamco.</Chat.Bubble>
        <Chat.Bubble>
          Adipisicing laborum est eu laborum est sit in commodo enim sint
          laboris labore nisi ut.
        </Chat.Bubble>
      </Chat>
      <Chat
        avatar="N"
        name="Nav Naversen"
        timestamp={props?.timestamp && "01.01.21 14:10"}
        position="right"
        avatarBgColor={props?.["overstyr-farger"] && "rgba(204, 225, 255, 1)"}
        backgroundColor={props?.["overstyr-farger"] && "rgba(230, 240, 255, 1)"}
      >
        <Chat.Bubble>Do eu dolor pariatur consectetur qui.</Chat.Bubble>
        <Chat.Bubble>
          Nisi velit officia excepteur reprehenderit amet qui qui velit cillum
          sint nostrud.
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
  avatar={${props?.avatar ? "<Illustrasjon />" : `"ON"`}}
    name="Ola Normann"${
      props?.timestamp ? `\ntimestamp="01.01.21 14:00"` : ""
    }${
    props?.["overstyr-farger"] ? `\navatarBgColor="rgba(255, 236, 204, 1)"` : ""
  }${
    props?.["overstyr-farger"]
      ? `\nbackgroundColor="rgba(255, 249, 240, 1)"`
      : ""
  }
  >
    <Chat.Bubble>
      Aute minim nisi sunt mollit duis sunt nulla minim non proident.
    </Chat.Bubble>
    <Chat.Bubble>Tempor fugiat amet eu sint in in ullamco.</Chat.Bubble>
    <Chat.Bubble>
      Adipisicing laborum est eu laborum est sit in commodo enim sint
      laboris labore nisi ut.
    </Chat.Bubble>
  </Chat>
  <Chat
    avatar="N"
    name="Nav Naversen"${props?.timestamp ? `\ntimestamp="01.01.21 14:00"` : ""}
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
    <Chat.Bubble>Do eu dolor pariatur consectetur qui.</Chat.Bubble>
    <Chat.Bubble>
      Nisi velit officia excepteur reprehenderit amet qui qui velit cillum
      sint nostrud.
    </Chat.Bubble>
  </Chat>
</div>`;
};

export default ChatSandbox;
