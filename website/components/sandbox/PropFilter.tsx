import { Fieldset } from "@navikt/ds-react";
import React, { useContext } from "react";
import { SandboxContext } from ".";
import { BooleanComp, SelectComp, StringComp } from "./FormComponents";
import { EnumT } from "./generateState";

const PropFilter = () => {
  const context = useContext(SandboxContext);

  if (!context.state || !context.args) {
    return null;
  }

  return (
    <Fieldset legend="Props" size="small">
      {Object.keys(context.state).map((key) => {
        switch (context.args[key].format) {
          case "array":
            return (
              <SelectComp
                key={key}
                arg={context.args[key] as EnumT}
                name={key}
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
  );
};

export default PropFilter;
