import { SandboxComponent } from "./types";

const CheckboxSandbox: SandboxComponent = (props) => {
  const propDisabled = props?.disabled ? ` disabled` : "";
  const propSize = props?.size ? ` size="${props.size}"` : "";
  const propDesc = props?.description ? ` description="Beskrivelse"` : "";
  const propErrorGruppe =
    props?.error && props.error === "Gruppe" ? ` error="Feilmelding"` : "";
  const propErrorEnkel =
    props?.error && props.error === "Enkel" ? ` error` : "";
  const propTekstHideLegend = props?.hideLegend ? ` hideLegend` : "";
  const propTekstHideLabel = props?.hideLabel ? ` hideLabel` : "";

  return `<CheckboxGroup${propTekstHideLegend}${propErrorGruppe}${propSize}${propDisabled}${propDesc} legend="Hvor vil du sitte?">
<Checkbox${propTekstHideLabel} value="Bakerst">Bakerst</Checkbox>
<Checkbox${propTekstHideLabel}${propDesc}${propErrorEnkel} value="Midterst">Midterst</Checkbox>
<Checkbox${propTekstHideLabel} value="Fremst">Fremst</Checkbox>
</CheckboxGroup>`;
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
