import { slugger } from "@/components";
import { Heading } from "@navikt/ds-react";
import cl from "classnames";
import React, { useEffect, useMemo, useState } from "react";

const LevelTwoHeading = ({
  children,
  hidden,
}: {
  children: [React.ReactNode | string];
  hidden?: boolean;
}): JSX.Element => {
  const [slug, setSlug] = useState<null | string>(null);

  const cleanedChildren = useMemo(
    () => children.filter((x) => typeof x === "string").filter((x) => !!x),
    [children]
  );

  useEffect(() => {
    setSlug(slugger.slug(cleanedChildren.toString()));
  }, [cleanedChildren]);

  if (children.toString() === "" || children.toString() === "Ikonsøk") {
    return null;
  }

  if (cleanedChildren.length == 0) {
    return null;
  }

  return (
    <>
      {hidden && <div id={slug} className="scroll-m-18" />}
      <Heading
        tabIndex={-1}
        id={slug}
        level="2"
        size="large"
        className={cl(
          "algolia-index-lvl2 group mb-4 max-w-text scroll-mt-20 focus:outline-none",
          {
            hidden: hidden,
            "inline-flex": !hidden,
          }
        )}
      >
        {cleanedChildren}
      </Heading>
    </>
  );
};

export default LevelTwoHeading;
