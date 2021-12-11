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
    <>
      {Object.keys(context.args.props).length > 0 && (
        <Fieldset legend="Props" size="small">
          {Object.keys(context.state.props).map((key) => {
            switch (context.args.props[key].format) {
              case "array":
                return (
                  <SelectComp
                    key={key}
                    arg={context.args.props[key] as EnumT}
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
      {context.args.variants && (
        <Fieldset legend="Variants" size="small">
          <SelectComp
            type="variant"
            arg={context.args.variants}
            name="Variants"
          />
        </Fieldset>
      )}
    </>
  );
};

export default PropFilter;
