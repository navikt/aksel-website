import React, { useState } from "react";
import { StepIndicator } from "@navikt/ds-react";
import { ExampleComponent } from "../../lib";

export const StepIndicatorDefault: ExampleComponent = () => {
  const [state, setState] = useState(1);

  return (
    <StepIndicator activeStep={state} onStepChange={(x) => setState(x)}>
      <StepIndicator.Step>Bruker</StepIndicator.Step>
      <StepIndicator.Step>Signatur</StepIndicator.Step>
      <StepIndicator.Step>Levering</StepIndicator.Step>
      <StepIndicator.Step>Oppsummering</StepIndicator.Step>
    </StepIndicator>
  );
};

StepIndicatorDefault.react = `<StepIndicator activeStep={state} onStepChange={(x) => setState(x)}>
<StepIndicator.Step>Bruker</StepIndicator.Step>
<StepIndicator.Step>Signatur</StepIndicator.Step>
<StepIndicator.Step>Levering</StepIndicator.Step>
<StepIndicator.Step>Oppsummering</StepIndicator.Step>
</StepIndicator>`;

export const StepIndicatorResponsive: ExampleComponent = () => {
  const [state, setState] = useState(1);

  return (
    <StepIndicator
      responsive
      activeStep={state}
      onStepChange={(x) => setState(x)}
    >
      <StepIndicator.Step>Bruker</StepIndicator.Step>
      <StepIndicator.Step>Signatur</StepIndicator.Step>
      <StepIndicator.Step>Levering</StepIndicator.Step>
      <StepIndicator.Step>Oppsummering</StepIndicator.Step>
    </StepIndicator>
  );
};

StepIndicatorResponsive.react = `<StepIndicator responsive activeStep={state} onStepChange={(x) => setState(x)}>
<StepIndicator.Step>Bruker</StepIndicator.Step>
<StepIndicator.Step>Signatur</StepIndicator.Step>
<StepIndicator.Step>Levering</StepIndicator.Step>
<StepIndicator.Step>Oppsummering</StepIndicator.Step>
</StepIndicator>`;

export const StepIndicatorHideLabels: ExampleComponent = () => {
  const [state, setState] = useState(1);

  return (
    <StepIndicator
      hideLabels
      activeStep={state}
      onStepChange={(x) => setState(x)}
    >
      <StepIndicator.Step>Bruker</StepIndicator.Step>
      <StepIndicator.Step>Signatur</StepIndicator.Step>
      <StepIndicator.Step>Levering</StepIndicator.Step>
      <StepIndicator.Step>Oppsummering</StepIndicator.Step>
    </StepIndicator>
  );
};

StepIndicatorHideLabels.react = `<StepIndicator responsive activeStep={state} onStepChange={(x) => setState(x)}>
<StepIndicator.Step>Bruker</StepIndicator.Step>
<StepIndicator.Step>Signatur</StepIndicator.Step>
<StepIndicator.Step>Levering</StepIndicator.Step>
<StepIndicator.Step>Oppsummering</StepIndicator.Step>
</StepIndicator>`;

export const StepIndicatorDisabled: ExampleComponent = () => {
  const [state, setState] = useState(1);

  return (
    <StepIndicator activeStep={state} onStepChange={(x) => setState(x)}>
      <StepIndicator.Step>Bruker</StepIndicator.Step>
      <StepIndicator.Step disabled>Signatur</StepIndicator.Step>
      <StepIndicator.Step>Levering</StepIndicator.Step>
      <StepIndicator.Step>Oppsummering</StepIndicator.Step>
    </StepIndicator>
  );
};

StepIndicatorDisabled.react = `<StepIndicator activeStep={state} onStepChange={(x) => setState(x)}>
<StepIndicator.Step>Bruker</StepIndicator.Step>
<StepIndicator.Step disabled>Signatur</StepIndicator.Step>
<StepIndicator.Step>Levering</StepIndicator.Step>
<StepIndicator.Step>Oppsummering</StepIndicator.Step>
</StepIndicator>`;