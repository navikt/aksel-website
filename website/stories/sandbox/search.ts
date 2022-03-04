import { SandboxComponent } from "./types";

const SearchSandbox: SandboxComponent = (props) => {
  const size = props?.size ? ` size="${props.size}"` : "";
  const variant = props?.variant ? ` variant="${props.variant}"` : "";
  const hideLabel = props?.hideLabel ? `` : " hideLabel={false}";
  const clearButton = props?.clearButton ? `` : " clearButton={false}";

  if (props?.Komposisjon === "Med egen knapp") {
    return `<Search
    label="Søk alle NAV sine sider"
    ${size}${variant}${hideLabel}${clearButton}
  ><Search.Button>Søk</Search.Button></Search>`;
  }
  return `
  <Search
    label="Søk alle NAV sine sider"
    ${size}${variant}${hideLabel}${clearButton}
  />
  `;
};

SearchSandbox.args = {
  props: {
    size: ["medium", "small"],
    variant: ["tertiary", "primary"],
    hideLabel: true,
    clearButton: true,
    Komposisjon: ["", "Med egen knapp"],
  },
};

export default SearchSandbox;
