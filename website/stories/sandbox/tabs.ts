import { BgColors, SandboxComponent } from "./types";

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

  return `<Tabs defaultValue="logg"${size}${selectionFollowsFocus} onChange={console.log} className="w-full">
  <Tabs.List${loop} className="pl-8">
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
    </Tabs.List>
    ${Panel}
</Tabs>
  `;
};

TabsSandbox.args = {
  props: {
    size: ["medium", "small"],
    selectionFollowsFocus: false,
    loop: false,
    iconPosition: ["left", "top"],
    Komposisjon: ["Label og Ikon", "Label", "Ikon"],
  },
  background: BgColors.WHITE,
};

export default TabsSandbox;
