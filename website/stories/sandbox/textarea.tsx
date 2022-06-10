import { Textarea } from "@navikt/ds-react";
import React from "react";
import { SandboxComponentT } from "./types";

const TextareaSandbox: SandboxComponentT = (props: any) => {
  const [value, setValue] = React.useState("");

  const newProps = {
    ...(props?.size ? { size: props?.size } : {}),
    ...(props?.maxLength ? { maxLength: 40 } : {}),
    ...(props?.error ? { error: "Tilbakemeldingen er for kort." } : {}),
    ...(props?.description
      ? {
          description:
            "Vi lagrer bare selve meldingen, ikke hvem som sendte den.",
        }
      : {}),
    ...(props?.hideLabel ? { hideLabel: true } : {}),
    ...(props?.disabled ? { disabled: true } : {}),
    ...(props?.maxRows ? { maxRows: 4 } : {}),
    ...(props?.minRows ? { minRows: 2 } : {}),
  };

  return (
    <Textarea
      label="Har du noen tilbakemeldinger?"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      {...newProps}
    />
  );
};

TextareaSandbox.args = {
  props: {
    size: ["medium", "small"],
    description: false,
    hideLabel: false,
    error: false,
    disabled: false,
    maxLength: false,
    minRows: false,
    maxRows: false,
  },
};

TextareaSandbox.getCode = (props: any) => {
  const newProps = `${props?.hideLabel ? "\n  hideLabel" : ""}${
    props?.description
      ? `\n  description="Vi lagrer bare selve meldingen, ikke hvem som sendte den."`
      : ""
  }${props?.error ? `\n  error="Tilbakemeldingen er for kort."` : ""}${
    props?.disabled ? "\n  disabled" : ""
  }${props?.maxLength ? "\n  maxLength={40}" : ""}${
    props?.minRows ? "\n  minRows={4}" : ""
  }${props?.maxRows ? "\n  maxRows={2}" : ""}`;

  return `<Textarea
  label="Har du noen tilbakemeldinger?"
  value={value}
  onChange={(e) => setValue(e.target.value)}
  size="${props?.size}"${newProps}
/>`;
};

export default TextareaSandbox;
