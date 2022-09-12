import { Stepper } from "@navikt/ds-react";
import { useState } from "react";
import { SandboxComponentT } from "./types";

const StepperSandbox: SandboxComponentT = (props: any) => {
  const [activeStep, setActiveStep] = useState(1);

  const newProps = {
    onClick: (e) => e.preventDefault(),
    ...(props?.as === "button" ? { as: "button" } : { href: "#" }),
  };

  const single = props?.["interactive (false)"] === "enkel steg";
  const all = props?.["interactive (false)"] === "alle steg";

  return (
    <>
      <h2 id="stepper-heading" hidden>
        Søknadssteg
      </h2>
      <Stepper
        aria-labelledby="stepper-heading"
        activeStep={activeStep}
        onStepChange={setActiveStep}
        orientation={props?.orientation}
      >
        <Stepper.Step
          {...newProps}
          completed={props?.completed}
          interactive={!all}
        >
          Start søknad
        </Stepper.Step>
        <Stepper.Step
          {...newProps}
          completed={props?.completed}
          interactive={!all}
        >
          Saksopplysninger
        </Stepper.Step>
        <Stepper.Step
          {...newProps}
          interactive={!single && !all}
          completed={props?.completed}
        >
          Vedlegg
        </Stepper.Step>
        <Stepper.Step {...newProps} interactive={!single && !all}>
          Oppsummering
        </Stepper.Step>
        <Stepper.Step {...newProps} interactive={!single && !all}>
          Innsending
        </Stepper.Step>
      </Stepper>
    </>
  );
};

StepperSandbox.args = {
  props: {
    orientation: ["vertical", "horizontal"],
    as: ["link", "button"],
    "interactive (false)": ["", "enkel steg", "alle steg"],
    completed: false,
  },
};

StepperSandbox.getCode = (props: any) => {
  const as = props?.as === "button" ? `as="button"` : `href="#"`;
  const single = props?.["interactive (false)"] === "enkel steg";
  const all = props?.["interactive (false)"] === "alle steg";

  const interactiveSingle = single ? `interactive={false}\n` : "";
  const interactiveAll = all ? `interactive={false}\n` : "";
  const completed = props?.completed ? `completed\n` : "";

  return `
  const [activeStep, setActiveStep] = useState(1);

  return (
    <>
      <h2 id="stepper-heading">Søknadssteg</h2>
      <Stepper
        aria-labelledby="stepper-heading"
        activeStep={activeStep}
        onStepChange={(x) => setActiveStep(x)}
        orientation="${props?.orientation}"
        ${interactiveAll}
      >
        <Stepper.Step ${as}${completed}>Start søknad</Stepper.Step>
        <Stepper.Step ${as}${completed}>Saksopplysninger</Stepper.Step>
        <Stepper.Step ${as}${interactiveSingle}${completed}>Vedlegg</Stepper.Step>
        <Stepper.Step ${as}${interactiveSingle}>Oppsummering</Stepper.Step>
        <Stepper.Step ${as}${interactiveSingle}>Innsending</Stepper.Step>
      </Stepper>
    </>
  );`;
};

export default StepperSandbox;
