import { Email, EmailOpened, Send } from "@navikt/ds-icons";
import { ToggleGroup } from "@navikt/ds-react";
import React from "react";
import { SandboxComponentT } from "./types";

ToggleGroup.displayName = "ToggleGroup";
ToggleGroup.Item.displayName = "ToggleGroup.Item";
Email.displayName = "Email";
EmailOpened.displayName = "EmailOpened";
Send.displayName = "Send";

const ToggleGroupSandbox: SandboxComponentT = (props: any) => {
  const [value, setValue] = React.useState("ulest");

  return (
    <ToggleGroup
      onChange={(x) => setValue(x)}
      value={value}
      size={props?.size}
      {...(props?.label ? { label: "Inbox" } : {})}
    >
      <ToggleGroup.Item value="ulest">
        {props?.Komposisjon.includes("Ikon") && <Email />}
        {props?.Komposisjon.includes("Tekst") && "Ulest"}
      </ToggleGroup.Item>
      <ToggleGroup.Item value="lest">
        {props?.Komposisjon.includes("Ikon") && <EmailOpened />}
        {props?.Komposisjon.includes("Tekst") && "Leste"}
      </ToggleGroup.Item>
      <ToggleGroup.Item value="sendt">
        {props?.Komposisjon.includes("Ikon") && <Send />}
        {props?.Komposisjon.includes("Tekst") && "Sendte"}
      </ToggleGroup.Item>
    </ToggleGroup>
  );
};

ToggleGroupSandbox.args = {
  props: {
    size: ["medium", "small"],
    label: false,
    Komposisjon: ["Tekst", "Ikon + Tekst", "Ikon"],
  },
};

export default ToggleGroupSandbox;
