import React from "react";
import { Select } from "@navikt/ds-react";
import { ExampleComponent } from "../../lib";

export const SelectSmall: ExampleComponent = () => (
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

export const SelectMedDescription: ExampleComponent = () => (
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

export const SelectMedError: ExampleComponent = () => (
  <>
    <Select label="Velg hvilket land du bosted i." error="Du må velge et land.">
      <option value="">Velg land</option>
      <option value="norge">Norge</option>
      <option value="sverige">Sverige</option>
      <option value="danmark">Danmark</option>
    </Select>
  </>
);

SelectMedError.react = `<Select label="Velg hvilket land du bosted i." error="Du må velge et land.">
<option value="">Velg land</option>
<option value="norge">Norge</option>
<option value="sverige">Sverige</option>
<option value="danmark">Danmark</option>
</Select>`;
