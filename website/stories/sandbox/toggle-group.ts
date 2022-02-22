import { SandboxComponent } from "./types";

const ToggleGroupSandbox: SandboxComponent = (props) => {
  const label = props?.label ? ` label="Inbox"` : "";
  const size = props?.size ? ` size="${props.size}"` : "";

  const comp = `const ToggleDemo = () => {
    const [value, setValue] = React.useState("ulest");

    return (
      <ToggleGroup onChange={setValue} value={value}${size}${label}>
        <ToggleGroup.Item value="ulest">${
          props?.Komposisjon.includes("Ikon") ? "<Email />" : ""
        }${
    props?.Komposisjon.includes("Tekst") ? "Ulest" : ""
  }</ToggleGroup.Item>
        <ToggleGroup.Item value="lest">${
          props.Komposisjon.includes("Ikon") ? "<EmailOpen />" : ""
        }${
    props?.Komposisjon.includes("Tekst") ? "Leste" : ""
  }</ToggleGroup.Item>
        <ToggleGroup.Item value="sendt">${
          props.Komposisjon.includes("Ikon") ? "<Send />" : ""
        }${
    props.Komposisjon.includes("Tekst") ? "Sendte" : ""
  }</ToggleGroup.Item></ToggleGroup>
    );
  };

  render(<ToggleDemo />)`;

  return comp;
};

ToggleGroupSandbox.args = {
  props: {
    size: ["medium", "small"],
    label: false,
    Komposisjon: ["Tekst", "Ikon + Tekst", "Ikon"],
  },
};

export default ToggleGroupSandbox;
