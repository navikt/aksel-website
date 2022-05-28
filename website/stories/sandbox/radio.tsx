import { RadioGroup, Radio } from "@navikt/ds-react";
import { SandboxComponentv2 } from "./types";

RadioGroup.displayName = "RadioGroup";
Radio.displayName = "RadioGroup";

const RadioSandbox: SandboxComponentv2 = (props: any) => {
  const newProps = {
    ...(props?.disabled ? { disabled: true } : {}),
    ...(props?.error
      ? { error: "Vi fant ingen resultater på din aldersgruppe." }
      : {}),
    ...(props?.description
      ? {
          description: "Informasjonen blir brukt for å gi deg bedre søketreff.",
        }
      : {}),
    ...(props?.hideLegend ? { hideLegend: true } : {}),
  };
  return (
    <RadioGroup
      {...newProps}
      legend="Velg din aldersgruppe."
      size={props?.size}
    >
      <Radio value="10">10-20 år</Radio>
      <Radio value="20">21-45 år</Radio>
      <Radio value="40">46-80 år</Radio>
    </RadioGroup>
  );
};

RadioSandbox.args = {
  props: {
    size: ["medium", "small"],
    description: false,
    hideLegend: false,
    error: false,
    disabled: false,
  },
};

export default RadioSandbox;
