import React, { useState } from "react";
import { Textarea } from "@navikt/ds-react";
import { ExampleComponent } from "../../lib";

export const TextareaSmall: ExampleComponent = () => {
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

export const TextareaMedDescription: ExampleComponent = () => {
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

export const TextareaMedMaxlength: ExampleComponent = () => {
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

export const TextareaMedError: ExampleComponent = () => {
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
