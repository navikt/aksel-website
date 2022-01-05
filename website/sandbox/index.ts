import AlertSandbox from "./alert";
import ButtonSandbox from "./button";
import PlainSandbox from "./plain";
import HeaderSandbox from "./header";
import TableSandbox from "./table";
import LoaderSandbox from "./loader";
import CheckboxSandbox from "./checkbox";
import kebabCase from "lodash.kebabcase";
import { SandboxComponent } from "./types";

const allSandboxes = {
  AlertSandbox,
  ButtonSandbox,
  HeaderSandbox,
  PlainSandbox,
  TableSandbox,
  CheckboxSandbox,
  LoaderSandbox,
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
