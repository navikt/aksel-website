import React from "react";
import { Select } from "@navikt/ds-react";

export const SelectExample = () => (
  <>
    <Select label="Velg hvilket land du bosted i.">
      <option value="">Velg land</option>
      <option value="norge">Norge</option>
      <option value="sverige">Sverige</option>
      <option value="danmark">Danmark</option>
    </Select>
  </>
);

SelectExample.react = `<Select label="Velg hvilket land du bosted i.">
<option value="">Velg land</option>
<option value="norge">Norge</option>
<option value="sverige">Sverige</option>
<option value="danmark">Danmark</option>
</Select>`;

export const SelectSmall = () => (
  <>
    <Select label="Velg hvilket land du bosted i." size="small">
      <option value="">Velg land</option>
      <option value="norge">Norge</option>
      <option value="sverige">Sverige</option>
      <option value="danmark">Danmark</option>
    </Select>
  </>
);

SelectSmall.react = `<Select label="Velg hvilket land du bosted i." size="small">
<option value="">Velg land</option>
<option value="norge">Norge</option>
<option value="sverige">Sverige</option>
<option value="danmark">Danmark</option>
</Select>`;

export const SelectMedDescription = () => (
  <>
    <Select
      label="Velg hvilket land du bosted i."
      description="Velg det lande du tilbringer mest tid."
    >
      <option value="">Velg land</option>
      <option value="norge">Norge</option>
      <option value="sverige">Sverige</option>
      <option value="danmark">Danmark</option>
    </Select>
  </>
);

SelectMedDescription.react = `<Select label="Velg hvilket land du bosted i." description="Velg det lande du tilbringer mest tid.">
<option value="">Velg land</option>
<option value="norge">Norge</option>
<option value="sverige">Sverige</option>
<option value="danmark">Danmark</option>
</Select>`;

export const SelectMedError = () => (
  <>
    <Select label="Velg hvilket land du bosted i." error="Du må velge et land.">
      <option value="">Velg land</option>
      <option value="norge">Norge</option>
      <option value="sverige">Sverige</option>
      <option value="danmark">Danmark</option>
    </Select>
  </>
);

SelectExample.react = `<Select label="Velg hvilket land du bosted i." error="Du må velge et land.">
<option value="">Velg land</option>
<option value="norge">Norge</option>
<option value="sverige">Sverige</option>
<option value="danmark">Danmark</option>
</Select>`;

export const SelectmedHideLabel = () => (
  <>
    <Select label="Velg hvilket land du bosted i." hideLabel>
      <option value="">Velg land</option>
      <option value="norge">Norge</option>
      <option value="sverige">Sverige</option>
      <option value="danmark">Danmark</option>
    </Select>
  </>
);

SelectExample.react = `<Select label="Velg hvilket land du bosted i." hideLabel>
<option value="">Velg land</option>
<option value="norge">Norge</option>
<option value="sverige">Sverige</option>
<option value="danmark">Danmark</option>
</Select>`;
