import {
  Checkbox,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@navikt/ds-react";
import React, { useContext } from "react";
import { SandboxContext } from ".";
import { EnumT } from "./generateState";

export const SelectComp = ({ arg, name }: { arg: EnumT; name: string }) => {
  const { state, setState } = useContext(SandboxContext);

  return (
    <>
      {arg.options.length > 5 ? (
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
      ) : (
        <RadioGroup
          legend={name}
          onChange={(e) => setState({ ...state, [name]: e })}
          value={state[name] as string}
        >
          {arg.options.map((opt, i) => (
            <Radio key={opt + i} value={opt}>
              {opt || "Ingen"}
            </Radio>
          ))}
        </RadioGroup>
      )}
    </>
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
