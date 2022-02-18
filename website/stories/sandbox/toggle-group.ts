import { SandboxComponent } from "./types";

const ToggleGroupSandbox: SandboxComponent = (props) => {
  const label = props?.label ? ` label="Velg periode"` : "";
  const size = props?.size ? ` size="${props.size}"` : "";

  return `const ToggleDemo = () => {
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
};

ToggleGroupSandbox.args = {
  props: {
    size: ["medium", "small"],
    label: false,
    ikoner: false,
  },
};

export default ToggleGroupSandbox;
