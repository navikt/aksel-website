import { Select, Switch, TextField, ToggleGroup } from "@navikt/ds-react";
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

  const isActive = (opt: string) => propsState.props[name] === opt;

  const findDefault = () => propsState.props[name];

  const handleToggle = (opt: string) => {
    return isActive(opt) && arg.options.includes("")
      ? setSandboxState({
          ...sandboxState,
          propsState: {
            ...propsState,
            props: { ...propsState.props, [name]: "" },
          },
        })
      : setSandboxState({
          ...sandboxState,
          propsState: {
            ...propsState,
            props: { ...propsState.props, [name]: opt },
          },
        });
  };

  return (
    <>
      {arg.options.length > 2 ? (
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
      ) : (
        <div>
          <ToggleGroup
            onChange={handleToggle}
            size="small"
            defaultValue={findDefault().toString()}
            label={type !== "variant" ? name : undefined}
          >
            {arg.options.map((opt, i) =>
              opt ? (
                <ToggleGroup.Item key={opt + i} value={opt}>
                  {opt || "Ingen"}
                </ToggleGroup.Item>
              ) : null
            )}
          </ToggleGroup>
        </div>
      )}
    </>
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
    <Switch
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
    </Switch>
  );
};
