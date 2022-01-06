import { SandboxComponent } from "./types";

const RadioSandbox: SandboxComponent = (props) => {
  const size = props?.size ? ` size="${props.size}"` : "";
  const description = props?.description
    ? ` description="Informasjonen blir brukt for å gi deg bedre søketreff."`
    : "";
  const error = props?.error
    ? ` error="Vi fant ingen resultater på din aldersgruppe."`
    : "";
  const hideLegend = props?.hideLegend ? ` hideLegend` : "";
  const disabled = props?.disabled ? ` disabled` : "";

  return `<RadioGroup legend="Velg din aldersgruppe."${size}${description}${hideLegend}${error}${disabled}>
  <Radio value="10">10-20 år</Radio>
  <Radio value="20">21-45 år</Radio>
  <Radio value="40">46-80 år</Radio>
</RadioGroup>`;
};

RadioSandbox.args = {
  props: {
    size: ["", "medium", "small"],
    description: false,
    hideLegend: false,
    error: false,
    disabled: false,
  },
};

export default RadioSandbox;
