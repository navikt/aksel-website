import { slugger } from "@/components";
import { Heading } from "@navikt/ds-react";
import React, { useEffect, useState } from "react";

const LevelThreeHeading = ({
  children,
}: {
  children: [React.ReactNode | string];
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
    <Heading
      className="algolia-index-lvl3 mt-8 max-w-text scroll-mt-20 focus:outline-none"
      spacing
      level="3"
      size="medium"
      tabIndex={-1}
      id={slug}
    >
      {children}
    </Heading>
  );
};

export default LevelThreeHeading;
