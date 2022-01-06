import { SandboxComponent } from "./types";

const PanelSandbox: SandboxComponent = (props) => {
  const border = props?.border ? ` border` : "";

  return `<Panel${border}>Eu quis exercitation voluptate ex. Aute irure esse occaecat minim cupidatat velit minim duis sint culpa anim laboris. Consectetur nulla eu commodo ea culpa velit commodo incididunt sunt ipsum.</Panel>`;
};

PanelSandbox.args = {
  props: {
    border: false,
  },
};

export default PanelSandbox;
