import React from "react";
import { CheckboxGroup, Checkbox } from "@navikt/ds-react";

export const CheckboxStandard = () => (
  <>
    <Checkbox value="eple">Eple</Checkbox>
  </>
);

CheckboxStandard.react = `<Checkbox value="eple">Eple</Checkbox>`;

export const CheckboxMedError = () => (
  <>
    <Checkbox value="melon" error="Melon må være valgt.">
      Melon
    </Checkbox>
  </>
);

CheckboxMedError.react = `<Checkbox value="melon" error="Melon må være valgt.">
Melon
</Checkbox>`;

export const CheckboxGroupStandard = () => (
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

export const CheckboxGroupMedDescription = () => (
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

export const CheckboxGroupMedError = () => (
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

export const CheckboxGroupMedErrorUtenErrorPropagation = () => (
  <>
    <CheckboxGroup
      legend="Velg frukt du vil ha levert."
      error="Alle leveringer må inkludere melon"
      errorPropagation={false}
      defaultValue={["eple", "pære"]}
    >
      <Checkbox value="melon" error="Leveringen din må inneholde Melon">
        Melon
      </Checkbox>
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
errorPropagation={false}
defaultValue={["eple", "pære"]}
>
<Checkbox value="melon" error="Leveringen din må inneholde Melon">
  Melon
</Checkbox>
<Checkbox value="eple">Eple</Checkbox>
<Checkbox value="pære" defaultChecked>
  Pære
</Checkbox>
</CheckboxGroup>`;

export const CheckboxGroupMedHidelegend = () => (
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

export const CheckboxMedHideLabel = () => (
  <>
    <Checkbox value="eple" hideLabel>
      Eple
    </Checkbox>
  </>
);
CheckboxMedHideLabel.react = `<Checkbox value="eple" hideLabel>
Eple
</Checkbox>`;
