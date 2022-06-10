import { TextField } from "@navikt/ds-react";
import { SandboxComponentT } from "./types";

const TextFieldSandbox: SandboxComponentT = (props: any) => {
  const newProps = {
    ...(props?.size ? { size: props?.size } : {}),
    ...(props?.error ? { error: "Tilbakemeldingen er for kort." } : {}),
    ...(props?.description
      ? {
          description:
            "Vi lagrer bare selve meldingen, ikke hvem som sendte den.",
        }
      : {}),
    ...(props?.hideLabel ? { hideLabel: true } : {}),
    ...(props?.disabled ? { disabled: true } : {}),
  };

  return <TextField label="Har du noen tilbakemeldinger?" {...newProps} />;
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

TextFieldSandbox.getCode = (props: any) => {
  const newProps = `${props?.hideLabel ? "\n  hideLabel" : ""}${
    props?.description
      ? `\n  description="Vi lagrer bare selve meldingen, ikke hvem som sendte den."`
      : ""
  }${props?.error ? `\n  error="Tilbakemeldingen er for kort."` : ""}${
    props?.disabled ? "\n  disabled" : ""
  }`;

  return `<TextField
  label="Har du noen tilbakemeldinger?"
  size="${props?.size}"${newProps}
/>`;
};

export default TextFieldSandbox;
