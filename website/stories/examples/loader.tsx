import React from "react";
import { Loader, Button } from "@navikt/ds-react";
import { ExampleComponent } from "../../lib";
import { BgColors } from "../../lib/types/types";

export const LoaderInverted: ExampleComponent = () => (
  <>
    <Loader size="2xlarge" variant="inverted" />
  </>
);

LoaderInverted.react = `<Loader size="2xlarge" variant="inverted" />`;
LoaderInverted.bg = BgColors.INVERTED;

export const LoaderMedButton: ExampleComponent = () => (
  <div className="flex w-24">
    <Button className="flex-1" loading aria-label="last inn innhold">
      Send inn søknad
    </Button>
  </div>
);

LoaderMedButton.react = `<Button className="flex-1" loading aria-label="last inn innhold">
Send inn søknad
</Button>`;
