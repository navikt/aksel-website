import React from "react";
import { RadioGroup, Radio } from "@navikt/ds-react";
import { ExampleComponent } from "../../lib";

export const RadioGroupStandard: ExampleComponent = () => (
  <>
    <RadioGroup legend="Velg frukten du vil ha levert.">
      <Radio value="eple">Eple</Radio>
      <Radio value="pære">Pære</Radio>
      <Radio value="melon">Melon</Radio>
    </RadioGroup>
  </>
);

RadioGroupStandard.react = `<RadioGroup legend="Velg frukten du vil ha levert.">
<Radio value="eple">Eple</Radio>
<Radio value="pære">Pære</Radio>
<Radio value="melon">Melon</Radio>
</RadioGroup>`;

export const RadioGroupSmall: ExampleComponent = () => (
  <>
    <RadioGroup size="small" legend="Velg frukten du vil ha levert.">
      <Radio value="eple">Eple</Radio>
      <Radio value="pære">Pære</Radio>
      <Radio value="melon">Melon</Radio>
    </RadioGroup>
  </>
);

RadioGroupSmall.react = `<RadioGroup size="small" legend="Velg frukten du vil ha levert.">
<Radio value="eple">Eple</Radio>
<Radio value="pære">Pære</Radio>
<Radio value="melon">Melon</Radio>
</RadioGroup>`;

export const RadioGroupMedDescription: ExampleComponent = () => (
  <>
    <RadioGroup
      legend="Velg frukten du vil ha levert."
      description="Melon er bare tilgjengelig i helgene."
    >
      <Radio value="eple">Eple</Radio>
      <Radio value="pære">Pære</Radio>
      <Radio value="melon">Melon</Radio>
    </RadioGroup>
  </>
);

RadioGroupMedDescription.react = `<RadioGroup
legend="Velg frukten du vil ha levert."
description="Melon er bare tilgjengelig i helgene."
>
<Radio value="eple">Eple</Radio>
<Radio value="pære">Pære</Radio>
<Radio value="melon">Melon</Radio>
</RadioGroup>`;

export const RadioGroupMedError: ExampleComponent = () => (
  <>
    <RadioGroup
      legend="Velg frukten du vil ha levert."
      error="Du må velge hvilken frukt du ønsker inkludert i leveransen din."
    >
      <Radio value="eple">Eple</Radio>
      <Radio value="pære">Pære</Radio>
      <Radio value="melon">Melon</Radio>
    </RadioGroup>
  </>
);

RadioGroupMedError.react = `<RadioGroup
legend="Velg frukten du vil ha levert."
error="Du må velge hvilken frukt du ønsker inkludert i leveransen din."
>
<Radio value="eple">Eple</Radio>
<Radio value="pære">Pære</Radio>
<Radio value="melon">Melon</Radio>
</RadioGroup>`;

export const RadioGroupMedErrorUtenErrorPropagation: ExampleComponent = () => (
  <>
    <RadioGroup
      legend="Velg frukten du vil ha levert."
      error="Valget ditt kan ikke bli levert idag."
      defaultValue={"eple"}
    >
      <Radio value="melon">Melon</Radio>
      <Radio value="eple">Eple</Radio>
      <Radio value="pære">Pære</Radio>
    </RadioGroup>
  </>
);

RadioGroupMedErrorUtenErrorPropagation.react = `<RadioGroup
legend="Velg frukten du vil ha levert."
error="Valget ditt kan ikke bli levert idag."
defaultValue={"eple"}
>
<Radio value="melon">Melon</Radio>
<Radio value="eple" >
  Eple
</Radio>
<Radio value="pære">Pære</Radio>
</RadioGroup>`;

export const RadioGroupMedHidelegend: ExampleComponent = () => (
  <>
    <RadioGroup legend="Velg frukten du vil ha levert." hideLegend>
      <Radio value="eple">Eple</Radio>
      <Radio value="pære">Pære</Radio>
      <Radio value="melon">Melon</Radio>
    </RadioGroup>
  </>
);

RadioGroupMedHidelegend.react = `<RadioGroup legend="Velg frukten du vil ha levert." hideLegend>
<Radio value="eple">Eple</Radio>
<Radio value="pære">Pære</Radio>
<Radio value="melon">Melon</Radio>
</RadioGroup>`;
