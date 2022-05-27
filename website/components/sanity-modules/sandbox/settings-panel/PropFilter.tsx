import { Fieldset } from "@navikt/ds-react";
import React, { useContext } from "react";
import { SandboxContext } from "../index";
import { BooleanComp, SelectComp, StringComp } from "./FormComponents";
import { EnumT } from "./generateState";

const PropFilter = () => {
  const { sandboxState } = useContext(SandboxContext);

  if (!sandboxState.propsState || !sandboxState?.args) {
    return null;
  }

  const { args } = sandboxState;

  return (
    <>
      {Object.keys(args.props).length > 0 && (
        <Fieldset legend="Props" size="small" className="mb-4">
          {Object.keys(sandboxState.propsState.props).map((key) => {
            switch (args.props[key].format) {
              case "array":
                return (
                  <SelectComp
                    key={key}
                    arg={args.props[key] as EnumT}
                    name={key}
                    type="prop"
                  />
                );
              case "boolean":
                return <BooleanComp key={key} name={key} />;
              case "string":
                return <StringComp key={key} name={key} />;
              default:
                return null;
            }
          })}
        </Fieldset>
      )}
    </>
  );
};

export default PropFilter;
