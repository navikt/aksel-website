import { ReadMore } from "@navikt/ds-react";
import { SandboxComponentT } from "./types";

ReadMore.displayName = "ReadMore";

const ReadMoreSandbox: SandboxComponentT = (props: any) => {
  return (
    <div className="h-32">
      <ReadMore
        size={props?.size}
        header="Dette regnes som helsemessige begrensninger"
        renderContentWhenClosed
      >
        Med helsemessige begrensninger mener vi funksjonshemming, sykdom,
        allergier som hindrer deg i arbeidet eller andre årsaker som må tas
        hensyn til når du skal finne nytt arbeid. Du må oppgi hva som gjelder
        for deg, og dokumentere de helsemessige årsakene du viser til.
      </ReadMore>
    </div>
  );
};

ReadMoreSandbox.args = {
  props: {
    size: ["medium", "small"],
  },
};

export default ReadMoreSandbox;