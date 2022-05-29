import { Checkbox, CheckboxGroup } from "@navikt/ds-react";
import { SandboxComponentT } from "./types";

CheckboxGroup.displayName = "CheckboxGroup";
Checkbox.displayName = "Checkbox";

const CheckboxSandbox: SandboxComponentT = (props: any) => {
  const propErrorGruppe = props?.error && props.error === "Gruppe";
  const propErrorEnkel = props?.error && props.error === "Enkel";

  return (
    <CheckboxGroup
      description={props?.description && "Beskrivelse"}
      disabled={props?.disabled}
      {...(propErrorGruppe ? { error: "Feilmelding" } : {})}
      legend="Hvor vil du sitte?"
      size={props?.size}
      hideLegend={props?.hideLegend}
    >
      <Checkbox
        {...(props?.hideLabel ? { hideLabel: true } : {})}
        value="Bakerst"
      >
        Bakerst
      </Checkbox>
      <Checkbox
        {...(propErrorEnkel ? { error: true } : {})}
        {...(props?.hideLabel ? { hideLabel: true } : {})}
        value="Midterst"
      >
        Midterst
      </Checkbox>
      <Checkbox
        {...(props?.hideLabel ? { hideLabel: true } : {})}
        value="Fremst"
      >
        Fremst
      </Checkbox>
    </CheckboxGroup>
  );
};

CheckboxSandbox.args = {
  props: {
    size: ["medium", "small"],
    error: ["", "Gruppe", "Enkel"],
    hideLegend: false,
    hideLabel: false,
    description: false,
    disabled: false,
  },
};

export default CheckboxSandbox;
