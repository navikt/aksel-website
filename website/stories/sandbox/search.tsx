import { BgColors } from "@/lib";
import { Search } from "@navikt/ds-react";
import { SandboxComponentv2 } from "./types";

Search.displayName = "Search";
Search.Button.displayName = "Search.Button";

const SearchSandbox: SandboxComponentv2 = (props: any) => {
  const newProps = {
    size: props?.size,
    variant: props?.variant,
    hideLabel: props?.hideLabel,
    clearButton: props?.clearButton,
  };

  let comp = (
    <div
      className="w-full max-w-lg"
      {...(props?.darkmode ? { ["data-theme"]: "dark" } : {})}
    >
      <Search label="Søk alle NAV sine sider" {...newProps} />
    </div>
  );

  if (props?.Komposisjon === "Med egen knapp") {
    comp = (
      <div
        className="w-full max-w-lg"
        {...(props?.darkmode ? { ["data-theme"]: "dark" } : {})}
      >
        <Search label="Søk alle NAV sine sider" {...newProps}>
          <Search.Button onClick={(e) => console.log(e)} />
        </Search>
      </div>
    );
  }

  return props?.darkmode ? { comp, bg: BgColors.INVERTEDGRADIENT } : comp;
};

SearchSandbox.args = {
  props: {
    size: ["medium", "small"],
    variant: ["secondary", "primary", "simple"],
    hideLabel: true,
    clearButton: true,
    darkmode: false,
    Komposisjon: ["", "Med egen knapp"],
  },
};

export default SearchSandbox;
