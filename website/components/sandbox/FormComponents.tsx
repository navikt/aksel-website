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

export const SelectComp = ({
  arg,
  name,
  type = "prop",
}: {
  arg: EnumT;
  name: string;
  type: "prop" | "variant";
}) => {
  const { state, setState } = useContext(SandboxContext);

  return (
    <>
      {arg.options.length > 5 ? (
        <Select
          hideLabel={type === "variant"}
          label={type === "variant" ? "Endre sandbox variant" : name}
          onChange={(e) =>
            type === "prop"
              ? setState({
                  ...state,
                  props: { ...state.props, [name]: e.target.value },
                })
              : setState({
                  ...state,
                  variants: e.target.value,
                })
          }
          value={
            (type === "prop" ? state.props[name] : state.variants) as string
          }
        >
          {arg.options.map((opt, i) => (
            <option key={opt + i} value={opt}>
              {opt}
            </option>
          ))}
        </Select>
      ) : (
        <RadioGroup
          legend={type === "variant" ? "Endre sandbox variant" : name}
          hideLegend={type === "variant"}
          onChange={(e) =>
            type === "prop"
              ? setState({
                  ...state,
                  props: { ...state.props, [name]: e },
                })
              : setState({
                  ...state,
                  variants: e,
                })
          }
          value={
            (type === "prop" ? state.props[name] : state.variants) as string
          }
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
      value={state.props[name] as string}
      label={name}
      onChange={(e) =>
        setState({
          ...state,
          props: { ...state.props, [name]: e.target.value },
        })
      }
    />
  );
};

export const BooleanComp = ({ name }: { name: string }) => {
  const { state, setState } = useContext(SandboxContext);
  return (
    <Checkbox
      checked={state.props[name] as boolean}
      onChange={(e) =>
        setState({
          ...state,
          props: { ...state.props, [name]: e.target.checked },
        })
      }
    >
      {name}
    </Checkbox>
  );
};
