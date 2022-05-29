import AccordionSandbox from "./accordion";
import AlertSandbox from "./alert";
import ButtonSandbox from "./button";
import HeaderSandbox from "./header";
import TableSandbox from "./table";
import TableExpandAllSandbox from "./table-expand-all";
import LoaderSandbox from "./loader";
import TagSandbox from "./tag";
import PanelSandbox from "./panel";
import RadioSandbox from "./radio";
import SelectSandbox from "./select";
import TextareaSandbox from "./textarea";
import TextFieldSandox from "./textfield";
import CheckboxSandbox from "./checkbox";
import SwitchSandbox from "./switch";
import ToggleGroupSandbox from "./toggle-group";
import SearchSandbox from "./search";
import PaginationSandbox from "./pagination";
import TabsSandbox from "./tabs";
import TooltipSandbox from "./tooltip";
import DropdownSandbox from "./dropdown";
import DetailsSandbox from "./details";
import HelptextSandbox from "./helptext";
import { kebabCase } from "lodash";
import { SandboxComponentv2 } from "./types";

const allSandboxes = {
  AccordionSandbox,
  AlertSandbox,
  ButtonSandbox,
  HeaderSandbox,
  TagSandbox,
  TableSandbox,
  TableExpandAllSandbox,
  CheckboxSandbox,
  LoaderSandbox,
  PanelSandbox,
  RadioSandbox,
  SelectSandbox,
  TextareaSandbox,
  TextFieldSandox,
  SwitchSandbox,
  ToggleGroupSandbox,
  SearchSandbox,
  PaginationSandbox,
  TabsSandbox,
  TooltipSandbox,
  DropdownSandbox,
  DetailsSandbox,
  HelptextSandbox,
};

export const Sandboxes = Object.keys(allSandboxes).reduce((prev, y) => {
  return { ...prev, [kebabCase(y)]: allSandboxes[y] };
}, {});

export const SandboxKeys = Object.keys(Sandboxes);

const getSandbox = (name?: string): SandboxComponentv2 | null => {
  if (!name || !(name in Sandboxes)) {
    return null;
  }

  return Sandboxes[name];
};

export default getSandbox;
