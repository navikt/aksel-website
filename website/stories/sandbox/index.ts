import AccordionSandbox from "./accordion";
import AlertSandbox from "./alert";
import ButtonSandbox from "./button";
import HeaderSandbox from "./header";
import TableSandbox from "./table";
import LoaderSandbox from "./loader";
import TagSandbox from "./tag";
import PanelSandbox from "./panel";
import RadioSandbox from "./radio";
import SelectSandbox from "./select";
import TextareaSandbox from "./textarea";
import TextFieldSandbox from "./textfield";
import CheckboxSandbox from "./checkbox";
import SwitchSandbox from "./switch";
import ToggleGroupSandbox from "./toggle-group";
import SearchSandbox from "./search";
import PaginationSandbox from "./pagination";
import TabsSandbox from "./tabs";
import TooltipSandbox from "./tooltip";
import DropdownSandbox from "./dropdown";
import ReadMoreSandbox from "./read-more";
import HelptextSandbox from "./helptext";
import ConfirmationSandbox from "./confirmation-panel";
import ModalSandbox from "./modal";
import LinkSandbox from "./link";
import ChatSandbox from "./chat";
import CopyToClipboardSandbox from "./copytoclipboard";
import GuidePanelSandbox from "./guidepanel";
import ErrorSummarySandbox from "./error-summary";
import LinkPanelSandbox from "./link-panel";
import PopoverSandbox from "./popover";
import HeadingSandbox from "./typography/Heading";
import BodyLongSandbox from "./typography/BodyLong";
import BodyShortSandbox from "./typography/BodyShort";
import LabelSandbox from "./typography/Label";
import DetailSandbox from "./typography/Detail";
import IngressSandbox from "./typography/Ingress";
import ErrorMessageSandbox from "./typography/ErrorMessage";
import StepperSandbox from "./stepper";
import kebabCase from "lodash/kebabCase";
import { SandboxComponentT } from "./types";

const allSandboxes = {
  AccordionSandbox,
  AlertSandbox,
  ButtonSandbox,
  HeaderSandbox,
  TagSandbox,
  TableSandbox,
  ChatSandbox,
  CopyToClipboardSandbox,
  CheckboxSandbox,
  LoaderSandbox,
  PanelSandbox,
  RadioSandbox,
  SelectSandbox,
  TextareaSandbox,
  TextFieldSandbox,
  SwitchSandbox,
  ToggleGroupSandbox,
  SearchSandbox,
  PaginationSandbox,
  TabsSandbox,
  TooltipSandbox,
  DropdownSandbox,
  ReadMoreSandbox,
  HelptextSandbox,
  ConfirmationSandbox,
  ModalSandbox,
  LinkSandbox,
  GuidePanelSandbox,
  ErrorSummarySandbox,
  LinkPanelSandbox,
  PopoverSandbox,
  HeadingSandbox,
  BodyLongSandbox,
  BodyShortSandbox,
  IngressSandbox,
  DetailSandbox,
  LabelSandbox,
  ErrorMessageSandbox,
  StepperSandbox,
};

export const Sandboxes = Object.keys(allSandboxes).reduce((prev, y) => {
  return { ...prev, [kebabCase(y)]: allSandboxes[y] };
}, {});

export const SandboxKeys = Object.keys(Sandboxes);

const getSandbox = (name?: string): SandboxComponentT | null => {
  if (!name || !(name in Sandboxes)) {
    return null;
  }

  return Sandboxes[name];
};

export default getSandbox;
