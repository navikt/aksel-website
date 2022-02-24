import { Spacing as SpacingT } from "../../../lib";
import cl from "classnames";

const Spacing = ({ node }: { node: SpacingT }): JSX.Element => {
  if (!node.space) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className={cl({
        "mt-4": node.space === "s-4",
        "mt-8": node.space === "s-8",
        "mt-12": node.space === "s-12",
        "mt-16": node.space === "s-16",
      })}
    />
  );
};

export default Spacing;
