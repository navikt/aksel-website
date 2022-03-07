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
    <div
      className={cl("aspect-square rounded-full bg-gray-300", {
        "h-6": small,
        "h-12 text-[1.25rem]": !small,
      })}
    >
      <Component
        as="span"
        className="mt-[1px] flex h-full items-center justify-center"
      >
        {nameToInitials(name)}
      </Component>
    </div>
  );
};

export default Avatar;
