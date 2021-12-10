import { Checkbox, Select, TextField } from "@navikt/ds-react";
import { useContext } from "react";
import { SandboxContext } from ".";
import { EnumT } from "./generateState";

export const SelectComp = ({ arg, name }: { arg: EnumT; name: string }) => {
  const { state, setState } = useContext(SandboxContext);

  return (
    <Select
      label={name}
      onChange={(e) => setState({ ...state, [name]: e.target.value })}
    >
      {arg.options.map((opt, i) => (
        <option key={opt + i} value={opt}>
          {opt}
        </option>
      ))}
    </Select>
  );
};

export const StringComp = ({ name }: { name: string }) => {
  const { state, setState } = useContext(SandboxContext);
  return (
    <TextField
      label={name}
      onChange={(e) => setState({ ...state, [name]: e.target.value })}
    />
  );
};

export const BooleanComp = ({ name }: { name: string }) => {
  const { state, setState } = useContext(SandboxContext);
  return (
    <Checkbox
      onChange={(e) => setState({ ...state, [name]: e.target.checked })}
    >
      {name}
    </Checkbox>
  );
};

/* <Fieldset legend="Props" size="small">
        <Select label="variant">
          <option value=""></option>
          <option value="medium">Primary</option>
          <option value="medium">Secondary</option>
          <option value="medium">Tertiary</option>
          <option value="medium">Danger</option>
        </Select>
        <Select label="size">
          <option value=""></option>
          <option value="medium">Ikon</option>
          <option value="small">Loader</option>
        </Select>
        <Checkbox>Disabled</Checkbox>
      </Fieldset>
      <Fieldset legend="Varianter" size="small">
        <Select label="Velg varianter" hideLabel>
          <option value=""></option>
          <option value="norge">Ikon</option>
          <option value="sverige">Loader</option>
        </Select>
      </Fieldset> */
