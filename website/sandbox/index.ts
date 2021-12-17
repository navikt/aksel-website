import ButtonSandbox from "./button";
import PlainSandbox from "./plain";
import TableSandbox from "./table";
import kebabCase from "lodash.kebabcase";
import { SandboxComponent } from "./types";

const allSandboxes = {
  ButtonSandbox,
  PlainSandbox,
  TableSandbox,
};

export const Sandboxes = Object.keys(allSandboxes).reduce((prev, y) => {
  return { ...prev, [kebabCase(y)]: allSandboxes[y] };
}, {});

export const SandboxKeys = Object.keys(Sandboxes);

const getSandbox = (name?: string): SandboxComponent | null => {
  if (!name || !(name in Sandboxes)) {
    return null;
  }

  return Sandboxes[name];
};

export default getSandbox;
