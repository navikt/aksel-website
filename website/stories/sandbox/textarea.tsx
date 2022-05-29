import { Textarea } from "@navikt/ds-react";
import React from "react";
import { SandboxComponentT } from "./types";

Textarea.displayName = "Textarea";

const TextareaSandbox: SandboxComponentT = (props: any) => {
  const [value, setValue] = React.useState("");

  const newProps = {
    ...(props?.size ? { size: props?.size } : {}),
    ...(props?.teller ? { maxLength: 40 } : {}),
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
    ...(props?.minRows ? { minRows: 3 } : {}),
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
    teller: false,
    minRows: false,
    maxRows: false,
  },
};

export default TextareaSandbox;
