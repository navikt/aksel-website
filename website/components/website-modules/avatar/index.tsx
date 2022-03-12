import cl from "classnames";

const nameToInitials = (fullName) => {
  const namesArray = fullName.trim().split(" ");
  if (namesArray.length === 1) return `${namesArray[0].charAt(0)}`;
  else
    return `${namesArray[0].charAt(0)}${namesArray[
      namesArray.length - 1
    ].charAt(0)}`;
};

const getBgColor = (s: string) => {
  let hash = 0;
  for (let i = 0; i < s.length; i++) {
    hash = s.charCodeAt(i) + ((hash << 10) - hash);
  }

  const h = hash % 360;
  return "hsl(" + h + ", 50%, 87%)";
};

const Avatar = ({
  className,
  name,
  small,
}: {
  className?: string;
  name: string;
  small?: boolean;
}) => {
  return (
    <div
      className={cl(className, "aspect-square rounded-full", {
        "h-6 text-[0.75rem] font-semibold": small,
        "h-8 text-[1.125rem]": !small,
      })}
      style={{ background: getBgColor(name) }}
    >
      <span className="flex h-full items-center justify-center">
        {nameToInitials(name)}
      </span>
    </div>
  );
};

export default Avatar;
