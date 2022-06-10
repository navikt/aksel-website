import { Popover, Search } from "@navikt/ds-react";
import { useRef, useState } from "react";
import { BgColors } from "../../lib/types/types";
import { SandboxComponentT } from "./types";

Search.displayName = "Search";
Search.Button.displayName = "Search.Button";

const SearchSandbox: SandboxComponentT = (props: any) => {
  const newProps = {
    size: props?.size,
    variant: props?.variant,
    hideLabel: props?.hideLabel,
    clearButton: props?.clearButton,
  };

  const [content, setContent] = useState("");

  const searchRef = useRef(null);

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
  if (props?.Komposisjon === "Med Søketreff") {
    comp = (
      <div
        className="relative w-full max-w-lg"
        {...(props?.darkmode ? { ["data-theme"]: "dark" } : {})}
      >
        <Search
          ref={searchRef}
          label="Søk alle NAV sine sider"
          onChange={(e) => setContent(e)}
          onClear={() => setContent("")}
          {...newProps}
        />
        <Popover
          anchorEl={searchRef.current}
          placement="bottom-start"
          open={content !== ""}
          onClose={() => null}
          arrow={false}
          className="w-full"
          offset={8}
        >
          <Popover.Content>{`Søketreff for ${content}`}</Popover.Content>
        </Popover>
      </div>
    );
  }

  return comp;
};

SearchSandbox.getBg = (props: any) =>
  props?.darkmode ? BgColors.INVERTEDGRADIENT : undefined;

SearchSandbox.args = {
  props: {
    size: ["medium", "small"],
    variant: ["secondary", "primary", "simple"],
    hideLabel: true,
    clearButton: true,
    darkmode: false,
    Komposisjon: ["", "Med egen knapp", "Med Søketreff"],
  },
};

SearchSandbox.getCode = (props: any) => {
  const newProps = `\n    size="${props?.size}"\n    variant="${
    props?.variant
  }"${!props?.hideLabel ? "\n    hideLabel={false}" : ""}${
    !props?.clearButton ? "\n    clearButton={false}" : ""
  }`;

  if (props?.Komposisjon === "Med Søketreff") {
    return `// Eksempel på løsning for Search med søketreff
<div
  className="relative"${props?.darkmode ? `\n  data-theme="dark"` : ""}
>
  <Search
    ref={searchRef}
    label="Søk alle NAV sine sider"
    onChange={(e) => setContent(e)}
    onClear={() => setContent("")}${newProps}
  />
  <Popover
    anchorEl={searchRef.current}
    placement="bottom-start"
    open={content !== ""}
    onClose={() => null}
    arrow={false}
    className="w-full"
    offset={8}
  >
    <Popover.Content>Søketreff</Popover.Content>
  </Popover>
  </div>`;
  }

  if (props?.Komposisjon === "Med egen knapp") {
    return `<div${props?.darkmode ? ` data-theme="dark"` : ""}>
  <Search
    label="Søk alle NAV sine sider"${newProps}
  >
    <Search.Button onClick={(e) => console.log(e)} />
  </Search>
</div>`;
  }

  if (props?.Komposisjon === "") {
    return `<div${props?.darkmode ? ` data-theme="dark"` : ""}>
  <Search
    label="Søk alle NAV sine sider"${newProps}
  />
</div>`;
  }
};

export default SearchSandbox;
