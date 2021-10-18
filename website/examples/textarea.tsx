import React, { useState } from "react";
import { Textarea } from "@navikt/ds-react";

export const TextareaExample = () => {
  const [value, setValue] = useState("");
  return (
    <Textarea
      label="Har du noen tilbakemeldinger?"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

TextareaExample.react = `<Textarea
label="Har du noen tilbakemeldinger?"
value={value}
onChange={(e) => setValue(e.target.value)}
/>`;

export const TextareaSmall = () => {
  const [value, setValue] = useState("");
  return (
    <Textarea
      label="Har du noen tilbakemeldinger?"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      size="small"
    />
  );
};

TextareaSmall.react = `<Textarea
label="Har du noen tilbakemeldinger?"
value={value}
onChange={(e) => setValue(e.target.value)}
size="small"
/>`;

export const TextareaMedDescription = () => {
  const [value, setValue] = useState("");
  return (
    <Textarea
      label="Har du noen tilbakemeldinger?"
      description="Vi lagrer bare selve meldingen, ikke hvem som sendte den."
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

TextareaMedDescription.react = `<Textarea
label="Har du noen tilbakemeldinger?"
description="Vi lagrer bare selve meldingen, ikke hvem som sendte den."
value={value}
onChange={(e) => setValue(e.target.value)}
/>`;

export const TextareaMedMaxlength = () => {
  const [value, setValue] = useState("");
  return (
    <Textarea
      label="Har du noen tilbakemeldinger?"
      maxLength={40}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

TextareaMedMaxlength.react = `<Textarea
label="Har du noen tilbakemeldinger?"
maxLength={40}
value={value}
onChange={(e) => setValue(e.target.value)}
/>`;

export const TextareaMedError = () => {
  const [value, setValue] = useState("");
  return (
    <Textarea
      label="Har du noen tilbakemeldinger?"
      maxLength={40}
      error="Du må minst skrive 20 tegn i tilbakemeldingen."
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

TextareaMedError.react = `<Textarea
label="Har du noen tilbakemeldinger?"
maxLength={40}
error="Du må minst skrive 20 tegn i tilbakemeldingen."
value={value}
onChange={(e) => setValue(e.target.value)}
/>`;

export const TextareaMedHideLabel = () => {
  const [value, setValue] = useState("");
  return (
    <Textarea
      label="Har du noen tilbakemeldinger?"
      maxLength={40}
      hideLabel
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

TextareaMedHideLabel.react = `<Textarea
label="Har du noen tilbakemeldinger?"
maxLength={40}
hideLabel
value={value}
onChange={(e) => setValue(e.target.value)}
/>`;
