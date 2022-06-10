import { Email, EmailOpened, Send } from "@navikt/ds-icons";
import { ToggleGroup } from "@navikt/ds-react";
import React from "react";
import { SandboxComponentT } from "./types";

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
        {props?.Komposisjon?.includes("Ikon") && <Email />}
        {props?.Komposisjon?.includes("Tekst") && "Ulest"}
      </ToggleGroup.Item>
      <ToggleGroup.Item value="lest">
        {props?.Komposisjon?.includes("Ikon") && <EmailOpened />}
        {props?.Komposisjon?.includes("Tekst") && "Leste"}
      </ToggleGroup.Item>
      <ToggleGroup.Item value="sendt">
        {props?.Komposisjon?.includes("Ikon") && <Send />}
        {props?.Komposisjon?.includes("Tekst") && "Sendt"}
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

ToggleGroupSandbox.getCode = (props: any) => {
  return `<ToggleGroup
  onChange={(x) => setValue(x)}
  value={value}
  size="${props?.size}"${props?.label ? `\n  label="Inbox"` : ""}
>
  <ToggleGroup.Item value="ulest">${
    props?.Komposisjon?.includes("Ikon")
      ? `\n    <Email ${
          props?.Komposisjon?.includes("Tekst")
            ? "aria-hidden"
            : `title="Uleste mail"`
        } />`
      : ""
  }${props?.Komposisjon?.includes("Tekst") ? `\n    Ulest` : ""}
  </ToggleGroup.Item>
  <ToggleGroup.Item value="lest">${
    props?.Komposisjon?.includes("Ikon")
      ? `\n    <EmailOpened ${
          props?.Komposisjon?.includes("Tekst")
            ? "aria-hidden"
            : `title="Leste mail"`
        } />`
      : ""
  }${props?.Komposisjon?.includes("Tekst") ? `\n    Leste` : ""}
  </ToggleGroup.Item>
  <ToggleGroup.Item value="sendt">${
    props?.Komposisjon?.includes("Ikon")
      ? `\n    <Send ${
          props?.Komposisjon?.includes("Tekst")
            ? "aria-hidden"
            : `title="Sendte mail"`
        } />`
      : ""
  }${props?.Komposisjon?.includes("Tekst") ? `\n    Sendt` : ""}
  </ToggleGroup.Item>
</ToggleGroup>`;
};

export default ToggleGroupSandbox;
