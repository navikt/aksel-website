import React, { useState } from "react";
import { StepIndicator } from "@navikt/ds-react";
import { ExampleComponent } from "../../lib";
import { BgColors } from "@/lib";

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

StepIndicatorDefault.bg = BgColors.WHITE;

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

StepIndicatorHideLabels.bg = BgColors.WHITE;

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

StepIndicatorDisabled.bg = BgColors.WHITE;
