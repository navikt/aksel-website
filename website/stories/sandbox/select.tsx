import { Select } from "@navikt/ds-react";
import { SandboxComponentT } from "./types";

const SelectSandbox: SandboxComponentT = (props: any) => {
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
      label="Hvilket land har du bosted i."
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

SelectSandbox.getCode = (props: any) => {
  const newProps = `${props?.hideLabel ? "\n  hideLabel" : ""}${
    props?.description
      ? `\n  description="Velg det landet du tilbringer mest tid."`
      : ""
  }${
    props?.error
      ? `\n  error="Adressen matcher ikke landet du har satt som bosted."`
      : ""
  }${props?.disabled ? "\n  disabled" : ""}`;

  return `<Select
  label="Hvilket land har du bosted i."
  size="${props?.size}"${newProps}
>
  <option value="">Velg land</option>
  <option value="norge">Norge</option>
  <option value="sverige">Sverige</option>
  <option value="danmark">Danmark</option>
</Select>`;
};

export default SelectSandbox;
