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
      value={state[name] as string}
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
      value={state[name] as string}
      label={name}
      onChange={(e) => setState({ ...state, [name]: e.target.value })}
    />
  );
};

export const BooleanComp = ({ name }: { name: string }) => {
  const { state, setState } = useContext(SandboxContext);
  return (
    <Checkbox
      checked={state[name] as boolean}
      onChange={(e) => setState({ ...state, [name]: e.target.checked })}
    >
      {name}
    </Checkbox>
  );
};
