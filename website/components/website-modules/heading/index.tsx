import { slugger } from "@/components";
import { Heading } from "@navikt/ds-react";
import cl from "classnames";
import React, { useEffect, useState } from "react";

const LevelTwoHeading = ({
  children,
  hidden,
}: {
  children: [React.ReactNode | string];
  hidden?: boolean;
}): JSX.Element => {
  const [slug, setSlug] = useState<null | string>(null);
  const [cleaned, setCleaned] = useState<null | string>(null);

  const cleanedChildren = children
    .filter((x) => typeof x === "string")
    .filter((x) => !!x);

  useEffect(() => {
    const str = children
      .filter((x) => typeof x === "string")
      .filter((x) => !!x);
    if (cleaned !== str.toString()) {
      setSlug(slugger.slug(str.toString()));
      setCleaned(str.toString());
    }
  }, [children, cleaned]);

  if (children.toString() === "") {
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
          "algolia-index-lvl2 group mb-4 mt-12  max-w-text scroll-mt-20 first-of-type:mt-0 focus:outline-none",
          {
            hidden: hidden,
            block: !hidden,
          }
        )}
      >
        {children}
      </Heading>
    </>
  );
};

export default LevelTwoHeading;
