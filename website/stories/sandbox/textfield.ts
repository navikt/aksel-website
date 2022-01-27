import { SandboxComponent } from "./types";

const TextFieldSandbox: SandboxComponent = (props) => {
  const size = props?.size ? ` size="${props.size}"` : "";
  const description = props?.description
    ? ` description="Vi lagrer bare selve meldingen, ikke hvem som sendte den."`
    : "";
  const error = props?.error ? ` error="Tilbakemeldingen er for kort."` : "";
  const hideLabel = props?.hideLabel ? ` hideLabel` : "";
  const disabled = props?.disabled ? ` disabled` : "";

  return `
  <TextField
    label="Har du noen tilbakemeldinger?"
    ${size}${description}${hideLabel}${error}${disabled}
  />
  `;
};

TextFieldSandbox.args = {
  props: {
    size: ["medium", "small"],
    description: false,
    hideLabel: false,
    error: false,
    disabled: false,
  },
};

export default TextFieldSandbox;
