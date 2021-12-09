import React from "react";
import { CheckboxGroup, Checkbox } from "@navikt/ds-react";
import { ExampleComponent } from "../lib";

export const CheckboxStandard: ExampleComponent = () => (
  <>
    <Checkbox value="eple">Eple</Checkbox>
  </>
);

CheckboxStandard.react = `<Checkbox value="eple">Eple</Checkbox>`;

export const CheckboxMedError: ExampleComponent = () => (
  <>
    <Checkbox value="melon" error>
      Melon
    </Checkbox>
  </>
);

CheckboxMedError.react = `<Checkbox value="melon" error="Melon må være valgt.">
Melon
</Checkbox>`;

export const CheckboxGroupStandard: ExampleComponent = () => (
  <>
    <CheckboxGroup legend="Velg frukt du vil ha levert.">
      <Checkbox value="eple">Eple</Checkbox>
      <Checkbox value="pære">Pære</Checkbox>
      <Checkbox value="melon">Melon</Checkbox>
    </CheckboxGroup>
  </>
);

CheckboxGroupStandard.react = `<CheckboxGroup legend="Velg frukt du vil ha levert.">
<Checkbox value="eple">Eple</Checkbox>
<Checkbox value="pære">Pære</Checkbox>
<Checkbox value="melon">Melon</Checkbox>
</CheckboxGroup>`;

export const CheckboxGroupSmall: ExampleComponent = () => (
  <>
    <CheckboxGroup size="small" legend="Velg frukt du vil ha levert.">
      <Checkbox value="eple">Eple</Checkbox>
      <Checkbox value="pære">Pære</Checkbox>
      <Checkbox value="melon">Melon</Checkbox>
    </CheckboxGroup>
  </>
);

CheckboxGroupSmall.react = `<CheckboxGroup size="small" legend="Velg frukt du vil ha levert.">
<Checkbox value="eple">Eple</Checkbox>
<Checkbox value="pære">Pære</Checkbox>
<Checkbox value="melon">Melon</Checkbox>
</CheckboxGroup>`;

export const CheckboxGroupMedDescription: ExampleComponent = () => (
  <>
    <CheckboxGroup
      legend="Velg frukt du vil ha levert."
      description="Velg minst 2 frukter for levering."
    >
      <Checkbox value="eple">Eple</Checkbox>
      <Checkbox value="pære">Pære</Checkbox>
      <Checkbox value="melon">Melon</Checkbox>
    </CheckboxGroup>
  </>
);

CheckboxGroupMedDescription.react = `<CheckboxGroup
legend="Velg frukt du vil ha levert."
description="Velg minst 2 frukter for levering."
>
<Checkbox value="eple">Eple</Checkbox>
<Checkbox value="pære">Pære</Checkbox>
<Checkbox value="melon">Melon</Checkbox>
</CheckboxGroup>`;

export const CheckboxGroupMedError: ExampleComponent = () => (
  <>
    <CheckboxGroup
      legend="Velg frukt du vil ha levert."
      description="Velg minst 2 frukter for levering."
      error="Du må velge minst 2 frukter."
    >
      <Checkbox value="eple">Eple</Checkbox>
      <Checkbox value="pære">Pære</Checkbox>
      <Checkbox value="melon">Melon</Checkbox>
    </CheckboxGroup>
  </>
);
CheckboxGroupMedError.react = `<CheckboxGroup
legend="Velg frukt du vil ha levert."
description="Velg minst 2 frukter for levering."
error="Du må velge minst 2 frukter."
>
<Checkbox value="eple">Eple</Checkbox>
<Checkbox value="pære">Pære</Checkbox>
<Checkbox value="melon">Melon</Checkbox>
</CheckboxGroup>`;

export const CheckboxGroupMedErrorUtenErrorPropagation: ExampleComponent =
  () => (
    <>
      <CheckboxGroup
        legend="Velg frukt du vil ha levert."
        error="Alle leveringer må inkludere melon"
        defaultValue={["eple", "pære"]}
      >
        <Checkbox value="melon">Melon</Checkbox>
        <Checkbox value="eple">Eple</Checkbox>
        <Checkbox value="pære" defaultChecked>
          Pære
        </Checkbox>
      </CheckboxGroup>
    </>
  );

CheckboxGroupMedErrorUtenErrorPropagation.react = `<CheckboxGroup
legend="Velg frukt du vil ha levert."
error="Alle leveringer må inkludere melon"
defaultValue={["eple", "pære"]}
>
<Checkbox value="melon" error>
  Melon
</Checkbox>
<Checkbox value="eple">Eple</Checkbox>
<Checkbox value="pære" defaultChecked>
  Pære
</Checkbox>
</CheckboxGroup>`;

export const CheckboxGroupMedHidelegend: ExampleComponent = () => (
  <>
    <CheckboxGroup
      legend="Velg frukt du vil ha levert."
      description="Velg minst 2 frukter for levering."
      hideLegend
    >
      <Checkbox value="eple">Eple</Checkbox>
      <Checkbox value="pære">Pære</Checkbox>
      <Checkbox value="melon">Melon</Checkbox>
    </CheckboxGroup>
  </>
);
CheckboxGroupMedHidelegend.react = `<CheckboxGroup
legend="Velg frukt du vil ha levert."
description="Velg minst 2 frukter for levering."
hideLegend
>
<Checkbox value="eple">Eple</Checkbox>
<Checkbox value="pære">Pære</Checkbox>
<Checkbox value="melon">Melon</Checkbox>
</CheckboxGroup>`;

export const CheckboxMedHideLabel: ExampleComponent = () => (
  <>
    <Checkbox value="eple" hideLabel>
      Eple
    </Checkbox>
  </>
);
CheckboxMedHideLabel.react = `<Checkbox value="eple" hideLabel>
Eple
</Checkbox>`;
