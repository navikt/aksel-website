import { SandboxComponentT } from "./types";
import { BgColors } from "../../lib/types/types";
import { Tabs } from "@navikt/ds-react";
import cl from "classnames";
import { Dialog, Email, Historic, Notes, Send } from "@navikt/ds-icons";

Dialog.displayName = "Dialog";
Email.displayName = "Email";
Historic.displayName = "Historic";
Notes.displayName = "Notes";
Send.displayName = "Send";
Tabs.displayName = "Tabs";
Tabs.Panel.displayName = "Tabs.Panel";
Tabs.List.displayName = "Tabs.List";
(Tabs.Tab as any).displayName = "Tabs.Tab";

const TabsSandbox: SandboxComponentT = (props: any) => {
  const iconPosition = {
    ...(props?.iconPosition ? { iconPosition: props?.iconPosition } : {}),
  };

  const hasIcon = props?.Komposisjon?.includes("Ikon") ?? true;
  const hasLabel = props?.Komposisjon?.includes("Label") ?? true;

  const newProps = {
    ...(props?.selectionFollowsFocus ? { selectionFollowsFocus: true } : {}),
  };

  return (
    <Tabs
      {...newProps}
      defaultValue="logg"
      size={props?.size}
      onChange={(x) => console.log(x)}
      className={cl("w-full", {
        "max-w-[200px]": props?.overflow && !hasLabel,
        "max-w-sm": props?.overflow && hasLabel,
      })}
    >
      <Tabs.List
        loop={props?.loop}
        className={cl({ "pl-8": !props?.overflow })}
      >
        <Tabs.Tab
          value="logg"
          {...iconPosition}
          {...(hasLabel ? { label: "Logg" } : {})}
          {...(hasIcon ? { icon: <Historic title="historielogg" /> } : {})}
        />
        <Tabs.Tab
          value="inbox"
          {...iconPosition}
          {...(hasLabel ? { label: "Inbox" } : {})}
          {...(hasIcon ? { icon: <Email title="inbox" /> } : {})}
        />
        <Tabs.Tab
          value="sendt"
          {...iconPosition}
          {...(hasLabel ? { label: "Sendt" } : {})}
          {...(hasIcon ? { icon: <Send title="sendt" /> } : {})}
        />
        {props?.overflow && (
          <>
            {" "}
            <Tabs.Tab
              value="dialog"
              {...iconPosition}
              {...(hasLabel ? { label: "Dialog" } : {})}
              {...(hasIcon ? { icon: <Dialog title="dialog" /> } : {})}
            />
            <Tabs.Tab
              value="notater"
              {...iconPosition}
              {...(hasLabel ? { label: "Notater" } : {})}
              {...(hasIcon ? { icon: <Notes title="notater" /> } : {})}
            />
          </>
        )}
      </Tabs.List>
      <Tabs.Panel value="logg" className="h-24 w-full bg-gray-50 p-8">
        TabPanel for Logg-tab
      </Tabs.Panel>
      <Tabs.Panel value="inbox" className="h-24 w-full bg-gray-50 p-8">
        TabPanel for Inbox-tab
      </Tabs.Panel>
      <Tabs.Panel value="sendt" className="h-24  w-full bg-gray-50 p-8">
        TabPanel for Sendt-tab
      </Tabs.Panel>
      {props?.overflow && (
        <>
          <Tabs.Panel value="dialog" className="h-24 w-full bg-gray-50 p-8">
            TabPanel for Dialoger-tab
          </Tabs.Panel>
          <Tabs.Panel value="notater" className="h-24 w-full bg-gray-50 p-8">
            TabPanel for Notater-tab
          </Tabs.Panel>
        </>
      )}
    </Tabs>
  );
};

TabsSandbox.args = {
  props: {
    size: ["medium", "small"],
    selectionFollowsFocus: false,
    loop: false,
    iconPosition: ["left", "top"],
    overflow: false,
    Komposisjon: ["Label og Ikon", "Label", "Ikon"],
  },
  background: BgColors.WHITE,
};

TabsSandbox.getCode = (props: any) => {
  const hasIcon = props?.Komposisjon?.includes("Ikon") ?? true;
  const hasLabel = props?.Komposisjon?.includes("Label") ?? true;

  return `<Tabs
  defaultValue="logg"
  size="${props?.size}"${
    props?.selectionFollowsFocus ? "\n  selectionFollowsFocus" : ""
  }
>
  <Tabs.List${props?.loop ? " loop={true}" : ""}>
    <Tabs.Tab
      value="logg"
      iconPosition="${props?.iconPosition}"${
    hasLabel ? `\n      label="Logg"` : ""
  }${hasIcon ? `\n      icon={<Historic title="historielogg" />}` : ""}
    />
    <Tabs.Tab
      value="inbox"
      iconPosition="${props?.iconPosition}"${
    hasLabel ? `\n      label="Inbox"` : ""
  }${hasIcon ? `\n      icon={<Email title="inbox" />}` : ""}
    />
    <Tabs.Tab
      value="sendt"
      iconPosition="${props?.iconPosition}"${
    hasLabel ? `\n      label="Sendt"` : ""
  }${hasIcon ? `\n      icon={<Send title="sendt" />}` : ""}
    />${
      props?.overflow
        ? `\n    <Tabs.Tab
      value="dialog"
      iconPosition="${props?.iconPosition}"${
            hasLabel ? `\n      label="Dialog"` : ""
          }${hasIcon ? `\n      icon={<Dialog title="dialog" />}` : ""}
    />
    <Tabs.Tab
      value="notater"
      iconPosition="${props?.iconPosition}"${
            hasLabel ? `\n      label="Notater"` : ""
          }${hasIcon ? `\n      icon={<Notes title="notater" />}` : ""}
    />`
        : ""
    }
  </Tabs.List>
  <Tabs.Panel value="logg" className="h-24 w-full bg-gray-50 p-8">
    TabPanel for Logg-tab
  </Tabs.Panel>
  <Tabs.Panel value="inbox" className="h-24 w-full bg-gray-50 p-8">
    TabPanel for Inbox-tab
  </Tabs.Panel>
  <Tabs.Panel value="sendt" className="h-24  w-full bg-gray-50 p-8">
    TabPanel for Sendt-tab
  </Tabs.Panel>${
    props?.overflow
      ? `\n  <Tabs.Panel value="dialog" className="h-24 w-full bg-gray-50 p-8">
    TabPanel for Dialoger-tab
  </Tabs.Panel>
  <Tabs.Panel value="notater" className="h-24 w-full bg-gray-50 p-8">
    TabPanel for Notater-tab
  </Tabs.Panel>`
      : ""
  }
</Tabs>`;
};

export default TabsSandbox;
