import { Detail } from "@navikt/ds-react";
import React from "react";
import { Tips as TipsT } from "../../../lib";
import { withErrorBoundary } from "../../ErrorBoundary";
import { SanityBlockContent } from "../../SanityBlockContent";

const Tips = ({ node }: { node: TipsT }): JSX.Element => {
  if (!node || !node.body) {
    return null;
  }

  return (
    <div className="my-16 max-w-2xl rounded-r border-l-[6px] border-l-gray-500 bg-gray-50 px-4 py-3 shadow-md md:px-8">
      <Detail className="text-text-muted" spacing>
        TIPS
      </Detail>
      <SanityBlockContent blocks={node.body} noLastMargin />
    </div>
  );
};

export default withErrorBoundary(Tips, "Tips");
