import { SanityT } from "@/lib";
import { SanityBlockContent } from "@/sanity-block";
import { SectionContext } from "@/utils";
import { LightBulb } from "@navikt/ds-icons";
import { Detail } from "@navikt/ds-react";
import cl from "classnames";
import React, { useContext } from "react";
import { withErrorBoundary } from "../../../ErrorBoundary";
import style from "./tips.module.css";

const Tips = ({ node }: { node: SanityT.Schema.tips }): JSX.Element => {
  const context = useContext(SectionContext);

  if (!node || !node.body) {
    return null;
  }

  return (
    <div
      className={cl(
        style.tips,
        "relative-child linear max-w-2xl rounded-r border-l-[6px] border-l-gray-500 px-4 py-4 shadow-small xs:px-8",
        {
          "my-8": context.withinSection,
          "my-16": !context.withinSection,
        }
      )}
    >
      <Detail className="flex items-center gap-1 text-text-muted" spacing>
        <LightBulb className="text-large" aria-label="tips" aria-hidden /> TIPS
      </Detail>
      <SanityBlockContent blocks={node.body} noLastMargin />
    </div>
  );
};

export default withErrorBoundary(Tips, "Tips");
