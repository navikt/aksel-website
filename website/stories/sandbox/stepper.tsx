import { Stepper } from "@navikt/ds-react";
import { useState } from "react";
import { SandboxComponentT } from "./types";

const StepperSandbox: SandboxComponentT = (props: any) => {
  const [activeStep, setActiveStep] = useState(1);

  const newProps = {
    onClick: (e) => e.preventDefault(),
    ...(props?.as === "button" ? { as: "button" } : { href: "#" }),
  };

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
        <Stepper.Step {...newProps}>Start søknad</Stepper.Step>
        <Stepper.Step {...newProps}>Saksopplysninger</Stepper.Step>
        <Stepper.Step {...newProps}>Vedlegg</Stepper.Step>
        <Stepper.Step {...newProps}>Oppsummering</Stepper.Step>
        <Stepper.Step {...newProps}>Innsending</Stepper.Step>
      </Stepper>
    </>
  );
};

StepperSandbox.args = {
  props: {
    orientation: ["horizontal", "vertical"],
    as: ["link", "button"],
  },
};

StepperSandbox.getCode = (props: any) => {
  const as = props?.as === "button" ? `as="button"` : `href="#"`;

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
      >
        <Stepper.Step ${as}>Start søknad</Stepper.Step>
        <Stepper.Step ${as}>Saksopplysninger</Stepper.Step>
        <Stepper.Step ${as}>Vedlegg</Stepper.Step>
        <Stepper.Step ${as}>Oppsummering</Stepper.Step>
        <Stepper.Step ${as}>Innsending</Stepper.Step>
      </Stepper>
    </>
  );`;
};

export default StepperSandbox;
