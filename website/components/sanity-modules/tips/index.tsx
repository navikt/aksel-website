import { Detail } from "@navikt/ds-react";
import React, { useContext } from "react";
import { SectionContext } from "../..";
import { Tips as TipsT } from "../../../lib";
import { withErrorBoundary } from "../../ErrorBoundary";
import { SanityBlockContent } from "../../SanityBlockContent";
import cl from "classnames";
import { PagePropsContext } from "../../website-modules/utils";

const Tips = ({ node }: { node: TipsT }): JSX.Element => {
  const context = useContext(SectionContext);
  const { pageProps } = useContext(PagePropsContext);

  if (!node || !node.body) {
    return null;
  }

  return (
    <div
      className={cl(
        "relative-child linear  max-w-2xl rounded-r border-l-[6px] border-l-gray-500 px-4 py-4 shadow-small md:px-8",
        {
          "my-8": context.withinSection,
          "my-16": !context.withinSection,
          "bg-white": pageProps?.page?._type === "aksel_artikkel",
          "bg-gradient-to-l from-gray-100 to-gray-50":
            pageProps?.page?._type !== "aksel_artikkel",
        }
      )}
    >
      <Detail className="text-text-muted" spacing>
        TIPS
      </Detail>
      <SanityBlockContent blocks={node.body} noLastMargin />
    </div>
  );
};

export default withErrorBoundary(Tips, "Tips");
