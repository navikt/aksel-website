import ButtonSandbox from "./button";
import kebabCase from "lodash.kebabcase";

export interface SandboxComponent {
  (props: any, variant?: string): string;
  args: {
    props: {
      [key: string]: string | string[] | boolean;
    };
    variants?: string[];
  };
}

const allSandboxes = {
  ButtonSandbox,
};

export const Sandboxes = Object.keys(allSandboxes).reduce((prev, y) => {
  return { ...prev, [kebabCase(y)]: allSandboxes[y] };
}, {});

export const SandboxeKeys = Object.keys(Sandboxes);

const getSandbox = (name: string): SandboxComponent | null => {
  if (!name || !(name in Sandboxes)) {
    return null;
  }

  return Sandboxes[name];
};

const s = getSandbox("button-sandbox");
console.log(s({}));
