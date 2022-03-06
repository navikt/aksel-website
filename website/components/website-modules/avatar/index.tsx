import { BodyShort } from "@navikt/ds-react";

const nameToInitials = (fullName) => {
  const namesArray = fullName.trim().split(" ");
  if (namesArray.length === 1) return `${namesArray[0].charAt(0)}`;
  else
    return `${namesArray[0].charAt(0)}${namesArray[
      namesArray.length - 1
    ].charAt(0)}`;
};

const Avatar = ({ name }: { name: string }) => {
  return (
    <BodyShort
      as="div"
      className="flex aspect-square h-12 items-center justify-center rounded-full bg-gray-300"
    >
      {nameToInitials(name)}
    </BodyShort>
  );
};

export default Avatar;
