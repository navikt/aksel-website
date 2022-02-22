import { SandboxComponent } from "./types";

const ToggleGroupSandbox: SandboxComponent = (props) => {
  const label = props?.label ? ` label="Inbox"` : "";
  const size = props?.size ? ` size="${props.size}"` : "";

  const comp = `const ToggleDemo = () => {
    const [value, setValue] = React.useState("ulest");

    return (
      <ToggleGroup onChange={setValue} value={value}${size}${label}>
        <ToggleGroup.Item value="ulest">${
          props.ikoner ? "<Email/>Uleste" : "Uleste"
        }</ToggleGroup.Item>
        <ToggleGroup.Item value="lest">${
          props.ikoner ? "<EmailOpen/>Leste" : "Leste"
        }</ToggleGroup.Item>
        <ToggleGroup.Item value="sendt">${
          props.ikoner ? "<Send/>Sendte" : "Sendte"
        }</ToggleGroup.Item>
      </ToggleGroup>
    );
  };

  render(<ToggleDemo />)`;

  return comp;
};

ToggleGroupSandbox.args = {
  props: {
    size: ["medium", "small"],
    label: false,
    ikoner: false,
  },
};

export default ToggleGroupSandbox;
