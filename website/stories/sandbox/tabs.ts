import { SandboxComponent } from "./types";
import { BgColors } from "lib/types/types";

const Panel = `<Tabs.Panel
value="logg"
className="w-full h-24 p-8 bg-gray-50"
>
TabPanel for Logg-tab
</Tabs.Panel>
<Tabs.Panel
value="inbox"
className="w-full h-24 p-8 bg-gray-50"
>
TabPanel for Inbox-tab
</Tabs.Panel>
<Tabs.Panel
value="sendt"
className="w-full  h-24 p-8 bg-gray-50"
>
TabPanel for Sendt-tab
</Tabs.Panel>`;

const TabsSandbox: SandboxComponent = (props) => {
  const size = props?.size ? ` size="${props.size}"` : "";
  const selectionFollowsFocus = props?.selectionFollowsFocus
    ? ` selectionFollowsFocus`
    : "";

  const iconPosition = props?.iconPosition
    ? ` iconPosition="${props?.iconPosition}"`
    : "";

  const loop = props?.loop ? ` loop` : "";

  const hasIcon = props?.Komposisjon?.includes("Ikon");
  const hasLabel = props?.Komposisjon?.includes("Label");

  return `<Tabs defaultValue="logg"${size}${selectionFollowsFocus} onChange={console.log} className="w-full ${
    props.overflow ? (!hasLabel ? "max-w-[200px]" : "max-w-sm") : ""
  }">
  <Tabs.List${loop} className="${props.overflow ? "" : "pl-8"}">
    <Tabs.Tab value="logg"${iconPosition} ${hasLabel ? `label="Logg"` : ""}
    ${hasIcon ? `icon={<Historic title="historielogg" />}` : ""}
     />
    <Tabs.Tab
      value="inbox"${iconPosition}
      ${hasLabel ? `label="Inbox"` : ""}
      ${hasIcon ? `icon={<Email title="inbox" />}` : ""}
    />
    <Tabs.Tab value="sendt"${iconPosition} ${
    hasIcon ? `icon={<Send title="sendt" />}` : ""
  } ${hasLabel ? `label="Sendt"` : ""} />
  ${
    props.overflow
      ? `<Tabs.Tab value="dialog"${iconPosition} ${
          hasIcon ? `icon={<Dialog title="dialog" />}` : ""
        } ${
          hasLabel ? `label="Dialog"` : ""
        } /><Tabs.Tab value="notater"${iconPosition} ${
          hasIcon ? `icon={<Notes title="notater" />}` : ""
        } ${hasLabel ? `label="Notater"` : ""} />`
      : ""
  }
    </Tabs.List>
    ${Panel}
    ${
      props.overflow
        ? `<Tabs.Panel
    value="dialog"
    className="w-full h-24 p-8 bg-gray-50"
    >
    TabPanel for Dialoger-tab
    </Tabs.Panel>
    <Tabs.Panel
    value="notater"
    className="w-full h-24 p-8 bg-gray-50"
    >
    TabPanel for Notater-tab
    </Tabs.Panel>`
        : ""
    }
</Tabs>
  `;
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

export default TabsSandbox;
