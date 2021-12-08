import React from "react";
import { RadioGroup, Radio } from "@navikt/ds-react";

export const RadioGroupStandard = () => (
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

export const RadioGroupSmall = () => (
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

export const RadioGroupMedDescription = () => (
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

export const RadioGroupMedError = () => (
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

export const RadioGroupMedErrorUtenErrorPropagation = () => (
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

export const RadioGroupMedHidelegend = () => (
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
