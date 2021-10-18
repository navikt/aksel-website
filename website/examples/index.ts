import kebabCase from "lodash.kebabcase";

import * as Button from "./button";
import * as Alert from "./alert";
import * as AccordionMenu from "./accordion-menu";
import * as Accordion from "./accordion";
import * as Checkbox from "./checkbox";
import * as Radio from "./radio";
import * as ErrorSummary from "./error-summary";
import * as ConfirmationPanel from "./confirmation-panel";
import * as Select from "./select";
import * as Textarea from "./textarea";
import * as TextField from "./textfield";
import * as Fieldset from "./fieldset";

const T = {
  ...Button,
  ...Alert,
  ...AccordionMenu,
  ...Accordion,
  ...Checkbox,
  ...Radio,
  ...ErrorSummary,
  ...ConfirmationPanel,
  ...Select,
  ...Textarea,
  ...TextField,
  ...Fieldset,
};

// TODO: implement such that one can infer the code in preview with dynamic imports
// TODO: is dynamic imports needed?
export const Examples = Object.keys(T).reduce((prev, y) => {
  return { ...prev, [kebabCase(y)]: T[y] };
}, {});

export const ExampleKeys = Object.keys(Examples);
