import { Checkbox, Select, TextField } from "@navikt/ds-react";
import React, { useContext } from "react";
import { SandboxContext } from "../Sandbox";
import { EnumT } from "./generateState";

export const SelectComp = ({
  arg,
  name,
  type = "prop",
}: {
  arg: EnumT;
  name: string;
  type: "prop" | "variant";
}) => {
  const { sandboxState, setSandboxState } = useContext(SandboxContext);
  const { propsState } = sandboxState;

  return (
    <Select
      hideLabel={type === "variant"}
      label={type === "variant" ? "Endre sandbox variant" : name}
      onChange={(e) =>
        setSandboxState({
          ...sandboxState,
          propsState: {
            ...propsState,
            props: { ...propsState.props, [name]: e.target.value },
          },
        })
      }
      value={propsState.props[name] as string}
    >
      {arg.options.map((opt, i) => (
        <option key={opt + i} value={opt}>
          {opt ? opt : ""}
        </option>
      ))}
    </Select>
  );
};

export const StringComp = ({ name }: { name: string }) => {
  const { sandboxState, setSandboxState } = useContext(SandboxContext);
  return (
    <TextField
      value={sandboxState.propsState.props[name] as string}
      label={name}
      onChange={(e) =>
        setSandboxState({
          ...sandboxState,
          propsState: {
            ...sandboxState.propsState,
            props: { ...sandboxState.propsState.props, [name]: e.target.value },
          },
        })
      }
    />
  );
};

export const BooleanComp = ({ name }: { name: string }) => {
  const { sandboxState, setSandboxState } = useContext(SandboxContext);
  return (
    <Checkbox
      checked={sandboxState.propsState.props[name] as boolean}
      onChange={(e) =>
        setSandboxState({
          ...sandboxState,
          propsState: {
            ...sandboxState.propsState,
            props: {
              ...sandboxState.propsState.props,
              [name]: e.target.checked,
            },
          },
        })
      }
    >
      {name}
    </Checkbox>
  );
};
