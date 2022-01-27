import { SandboxComponent } from "./types";

const jsxArguments = (props, opts) =>
  Object.entries(opts)
    .filter(([key]) => props[key])
    .map(([key, value]) => value)
    .join(" ");

const ButtonSandbox: SandboxComponent = (props) =>
  `<Button ${jsxArguments(props, {
    variant: `variant="${props.variant}"`,
    size: `size="${props.size}"`,
    disabled: "disabled",
    loading: "loading",
  })}>${props.content.includes("icon") ? "<Star />" : ""}${
    props.content.includes("text") ? "Button" : ""
  }</Button>`;

ButtonSandbox.args = {
  props: {
    variant: ["", "primary", "secondary", "tertiary", "danger"],
    size: ["", "medium", "small"],
    disabled: false,
    loading: false,
    content: ["text", "icon", "text and icon"],
  },
};

export default ButtonSandbox;
