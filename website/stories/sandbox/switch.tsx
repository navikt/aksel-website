import { SandboxComponent } from "./types";

const SwitchSandbox: SandboxComponent = (props) => {
  const propDisabled = props?.disabled ? ` disabled` : "";
  const propSize = props?.size ? ` size="${props.size}"` : "";
  const propDesc = props?.description ? ` description="Beskrivelse"` : "";
  const propTekstHideLabel = props?.hideLabel ? ` hideLabel` : "";
  const propLoading = props?.loading ? ` loading` : "";
  const propPosition = props?.position ? ` position="${props.position}"` : "";

  return `<Switch ${propTekstHideLabel}${propSize}${propLoading}${propPosition}${propSize}${propDisabled}${propDesc} >Slå på notifikasjoner</Switch>`;
};

SwitchSandbox.args = {
  props: {
    size: ["medium", "small"],
    position: ["left", "right"],
    hideLabel: false,
    description: false,
    loading: false,
    disabled: false,
  },
};

export default SwitchSandbox;
