import { BodyShort, Detail } from "@navikt/ds-react";
import cl from "classnames";

const nameToInitials = (fullName) => {
  const namesArray = fullName.trim().split(" ");
  if (namesArray.length === 1) return `${namesArray[0].charAt(0)}`;
  else
    return `${namesArray[0].charAt(0)}${namesArray[
      namesArray.length - 1
    ].charAt(0)}`;
};

const Avatar = ({ name, small }: { name: string; small?: boolean }) => {
  const Component = small ? Detail : BodyShort;
  return (
    <Component
      as="div"
      className={cl(
        "flex aspect-square items-center justify-center rounded-full bg-gray-300",
        { "h-6": small, "h-12": !small }
      )}
    >
      {nameToInitials(name)}
    </Component>
  );
};

export default Avatar;
