import React from "react";
import { TextField } from "@navikt/ds-react";

export const TextFieldExample = () => {
  return <TextField label="Legg til adressen din." />;
};

TextFieldExample.react = `<TextField label="Legg til adressen din." />`;

export const TextFieldSmall = () => {
  return <TextField size="small" label="Legg til adressen din." />;
};

TextFieldSmall.react = `<TextField size="small" label="Legg til adressen din." />`;

export const TextFieldMedDescription = () => {
  return (
    <TextField
      label="Legg til adressen din."
      description="Eksempel: Fyrstikkveien 99, 0999 Oslo"
    />
  );
};

TextFieldMedDescription.react = `<TextField label="Legg til adressen din." description="Eksempel: Fyrstikkveien 99, 0999 Oslo" />`;

export const TextFieldMedError = () => {
  return (
    <TextField
      label="Legg til adressen din."
      error="Du må fylle ut adressen din."
    />
  );
};

TextFieldMedError.react = `<TextField label="Legg til adressen din." error="Du må fylle ut adressen din."/>`;

export const TextFieldMedHideLabel = () => {
  return <TextField label="Legg til adressen din." hideLabel />;
};

TextFieldMedHideLabel.react = `<TextField label="Legg til adressen din." hideLabel/>`;
