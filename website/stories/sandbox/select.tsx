import { Select } from "@navikt/ds-react";
import { SandboxComponentv2 } from "./types";

Select.displayName = "Select";
const SelectSandbox: SandboxComponentv2 = (props: any) => {
  const newProps = {
    ...(props?.disabled ? { disabled: true } : {}),
    ...(props?.error
      ? { error: "Adressen matcher ikke landet du har satt som bosted." }
      : {}),
    ...(props?.description
      ? {
          description: "Velg det landet du tilbringer mest tid.",
        }
      : {}),
    ...(props?.hideLabel ? { hideLabel: true } : {}),
  };

  return (
    <Select
      {...newProps}
      label="Velg hvilket land du bosted i."
      size={props?.size}
    >
      <option value="">Velg land</option>
      <option value="norge">Norge</option>
      <option value="sverige">Sverige</option>
      <option value="danmark">Danmark</option>
    </Select>
  );
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
