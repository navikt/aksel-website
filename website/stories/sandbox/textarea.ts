import { SandboxComponent } from "./types";

const TextareaSandbox: SandboxComponent = (props) => {
  const size = props?.size ? ` size="${props.size}"` : "";
  const description = props?.description
    ? ` description="Vi lagrer bare selve meldingen, ikke hvem som sendte den."`
    : "";
  const error = props?.error ? ` error="Tilbakemeldingen er for kort."` : "";
  const hideLabel = props?.hideLabel ? ` hideLabel` : "";
  const disabled = props?.disabled ? ` disabled` : "";
  const teller = props?.teller ? ` maxLength={40}` : "";
  const maxRows = props?.maxRows ? ` maxRows={4}` : "";
  const minRows = props?.minRows ? ` minRows={3}` : "";

  return `
  const TextareaDemo = () => {

    const [value, setValue] = React.useState("");

    return <Textarea
            label="Har du noen tilbakemeldinger?"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            ${teller}${minRows}${maxRows}${size}${description}${hideLabel}${error}${disabled}
          />
  }

  render(<TextareaDemo/>)

  `;
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
