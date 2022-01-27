import { SandboxComponent } from "./types";

const SelectSandbox: SandboxComponent = (props) => {
  const size = props?.size ? ` size="${props.size}"` : "";
  const description = props?.description
    ? ` description="Velg det landet du tilbringer mest tid."`
    : "";
  const error = props?.error
    ? ` error="Adressen matcher ikke landet du har satt som bosted."`
    : "";
  const hideLabel = props?.hideLabel ? ` hideLabel` : "";
  const disabled = props?.disabled ? ` disabled` : "";

  return `<Select label="Velg hvilket land du bosted i."${size}${description}${hideLabel}${error}${disabled}>
    <option value="">Velg land</option>
    <option value="norge">Norge</option>
    <option value="sverige">Sverige</option>
    <option value="danmark">Danmark</option>
  </Select>
  `;
};

SelectSandbox.args = {
  props: {
    size: ["medium", "small"],
    description: false,
    hideLabel: false,
    error: false,
    disabled: false,
  },
};

export default SelectSandbox;
