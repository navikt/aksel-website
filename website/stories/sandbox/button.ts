/* eslint-disable @typescript-eslint/no-unused-vars */
import { SandboxComponent } from "./types";

const jsxArguments = (props, opts) =>
  Object.entries(opts)
    .filter(([key]) => props[key])
    .map(([_, value]) => value)
    .join(" ");

const ButtonSandbox: SandboxComponent = (props) =>
  `<Button ${jsxArguments(props, {
    variant: `variant="${props.variant}"`,
    size: `size="${props.size}"`,
    disabled: "disabled",
    loading: "loading",
  })}>${props.Komposisjon.includes("Ikon") ? "<Star />" : ""}${
    props.Komposisjon.includes("Tekst") ? "Button" : ""
  }</Button>`;

ButtonSandbox.args = {
  props: {
    variant: ["primary", "secondary", "tertiary", "danger"],
    size: ["medium", "small"],
    disabled: false,
    loading: false,
    Komposisjon: ["Tekst", "Ikon", "Tekst og Ikon"],
  },
};

export default ButtonSandbox;
