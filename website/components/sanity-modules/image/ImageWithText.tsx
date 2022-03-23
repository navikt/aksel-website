import NextImage from "next/image";
import React from "react";
import { PictureText as PictureTextT, useSanityImage } from "../../../lib";
import { SanityBlockContent } from "../../SanityBlockContent";
import { withErrorBoundary } from "../../ErrorBoundary";
import cl from "classnames";

const Image = ({ node }: { node: PictureTextT }): JSX.Element => {
  if (!node || !node.asset || !node.body) {
    return null;
  }

  const imageProps = useSanityImage(node);
  return (
    <div className="flow-root">
      <div
        className={cl(
          "mb-6 w-full max-w-xs bg-gray-50 shadow-[0_0_0_1px_var(--navds-semantic-color-divider)] sm:w-80",
          {
            "float-none mb-6 sm:float-left sm:mr-6": node?.placement === "left",
            "float-none mb-6 sm:float-right sm:ml-6":
              node?.placement === "right",
          }
        )}
      >
        <NextImage
          {...imageProps}
          layout="responsive"
          sizes="(max-width: 320px)"
          alt={node.title}
        />
      </div>
      <SanityBlockContent blocks={node.body} />
    </div>
  );
};

export default withErrorBoundary(Image, "ImageWithText");
