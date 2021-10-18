import React from "react";
import { ErrorSummary, ErrorSummaryItem } from "@navikt/ds-react";

export const ErrorSummaryExample = () => (
  <>
    <ErrorSummary heading="Du må fikse disse feilene før du kan sende inn søknad.">
      <ErrorSummaryItem href="#1">Felt må fylles ut med alder</ErrorSummaryItem>
      <ErrorSummaryItem href="#2">
        Tekstfeltet må ha en godkjent e-mail
      </ErrorSummaryItem>
    </ErrorSummary>
  </>
);

ErrorSummaryExample.react = `<ErrorSummary heading="Du må fikse disse feilene før du kan sende inn søknad.">
<ErrorSummaryItem href="#1">Felt må fylles ut med alder</ErrorSummaryItem>
<ErrorSummaryItem href="#2">
  Tekstfeltet må ha en godkjent e-mail
</ErrorSummaryItem>
</ErrorSummary>`;

export const ErrorSummarySmall = () => (
  <>
    <ErrorSummary
      size="small"
      heading="Du må fikse disse feilene før du kan sende inn søknad."
    >
      <ErrorSummaryItem href="#1">Felt må fylles ut med alder</ErrorSummaryItem>
      <ErrorSummaryItem href="#2">
        Tekstfeltet må ha en godkjent e-mail
      </ErrorSummaryItem>
    </ErrorSummary>
  </>
);

ErrorSummarySmall.react = `<ErrorSummary size="small" heading="Du må fikse disse feilene før du kan sende inn søknad.">
<ErrorSummaryItem href="#1">Felt må fylles ut med alder</ErrorSummaryItem>
<ErrorSummaryItem href="#2">
  Tekstfeltet må ha en godkjent e-mail
</ErrorSummaryItem>
</ErrorSummary>`;

export const ErrorSummaryWithCustomHeading = () => (
  <>
    <ErrorSummary
      headingTag="h3"
      heading="Du må fikse disse feilene før du kan sende inn søknad."
    >
      <ErrorSummaryItem href="#1">Felt må fylles ut med alder</ErrorSummaryItem>
      <ErrorSummaryItem href="#2">
        Tekstfeltet må ha en godkjent e-mail
      </ErrorSummaryItem>
    </ErrorSummary>
  </>
);

ErrorSummaryWithCustomHeading.react = `<ErrorSummary headingTag="h3" heading="Du må fikse disse feilene før du kan sende inn søknad.">
<ErrorSummaryItem href="#1">Felt må fylles ut med alder</ErrorSummaryItem>
<ErrorSummaryItem href="#2">
  Tekstfeltet må ha en godkjent e-mail
</ErrorSummaryItem>
</ErrorSummary>`;
