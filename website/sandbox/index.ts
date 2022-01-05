import AlertSandbox from "./alert";
import ButtonSandbox from "./button";
import PlainSandbox from "./plain";
import HeaderSandbox from "./header";
import TableSandbox from "./table";
import LoaderSandbox from "./loader";
import TagSandbox from "./tag";
import PanelSandbox from "./panel";
import RadioSandbox from "./radio";
import SelectSandbox from "./select";
import TextareaSandbox from "./textarea";
import CheckboxSandbox from "./checkbox";
import kebabCase from "lodash.kebabcase";
import { SandboxComponent } from "./types";

const allSandboxes = {
  AlertSandbox,
  ButtonSandbox,
  HeaderSandbox,
  PlainSandbox,
  TagSandbox,
  TableSandbox,
  CheckboxSandbox,
  LoaderSandbox,
  PanelSandbox,
  RadioSandbox,
  SelectSandbox,
  TextareaSandbox,
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
