import { Label, Select, TextField, Switch } from "@navikt/ds-react";
import React, { useContext } from "react";
import { SandboxContext } from "./Sandbox";
import { ScToggle, ScToggleGroup } from "../icon-search/Filter";
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

  const isActive = (opt: string) =>
    type === "prop"
      ? propsState.props[name] === opt
      : propsState.variants === opt;

  const handleToggle = (opt: string) => {
    return isActive(opt) && arg.options.includes("")
      ? type === "prop"
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
              variants: "",
            },
          })
      : type === "prop"
      ? setSandboxState({
          ...sandboxState,
          propsState: {
            ...propsState,
            props: { ...propsState.props, [name]: opt },
          },
        })
      : setSandboxState({
          ...sandboxState,
          propsState: {
            ...propsState,
            variants: opt,
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
            type === "prop"
              ? setSandboxState({
                  ...sandboxState,
                  propsState: {
                    ...propsState,
                    props: { ...propsState.props, [name]: e.target.value },
                  },
                })
              : setSandboxState({
                  ...sandboxState,
                  propsState: {
                    ...propsState,
                    variants: e.target.value,
                  },
                })
          }
          value={
            (type === "prop"
              ? propsState.props[name]
              : propsState.variants) as string
          }
        >
          {arg.options.map((opt, i) => (
            <option key={opt + i} value={opt}>
              {opt ? opt : "default"}
            </option>
          ))}
        </Select>
      ) : (
        <div>
          {type !== "variant" && (
            <Label size="small" spacing>
              {name}
            </Label>
          )}
          <ScToggleGroup forwardedAs="div" size="small">
            {arg.options.map((opt, i) =>
              opt ? (
                <ScToggle
                  key={opt + i}
                  className="navds-label navds-label--small"
                  data-active={isActive(opt)}
                  aria-pressed={isActive(opt)}
                  onClick={() => handleToggle(opt)}
                  aria-label={opt || "Ingen"}
                >
                  {opt || "Ingen"}
                </ScToggle>
              ) : null
            )}
          </ScToggleGroup>
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
