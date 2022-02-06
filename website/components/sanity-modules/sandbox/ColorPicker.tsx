import { Popover } from "@navikt/ds-react";
import cl from "classnames";
import { useRef, useState } from "react";
import { CanvasIcon } from "../..";

const ColorLabel = ({
  color,
  onClick,
}: {
  color: string;
  onClick: (c: string) => void;
}) => {
  const newColor = color
    .replace("--navds-semantic-color-", "")
    .replace("--navds-global-color-", "")
    .replaceAll("-", " ");
  return (
    <button
      style={{ background: `var(${color})` }}
      className="rounded border-none bg-none py-2 px-4 text-left focus:shadow-focus-inset focus:outline-none"
      onClick={() => onClick(color)}
    >
      <span className="invert" style={{ color: `var(${color})` }}>
        {newColor}
      </span>
    </button>
  );
};

const ColorPicker = ({
  onChange,
  className,
  sandbox,
  ...rest
}: {
  onChange: (c: string) => void;
  className?: string;
  sandbox?: boolean;
  style?: any;
}) => {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleClick = (c: string) => {
    setOpen(false);
    onChange?.(c);
  };

  return (
    <>
      <button
        ref={anchorRef}
        onClick={() => setOpen(!open)}
        className={cl(
          className,
          "flex items-center justify-center border-none bg-transparent text-text-muted hover:text-text",
          {
            "min-w-[50px] hover:bg-interaction-primary-hover-subtle": !sandbox,
          }
        )}
        {...rest}
      >
        <span className="navds-sr-only">
          {open ? "Lukk fargevelger" : "Åpne fargevelger"}
        </span>
        <CanvasIcon
          className={cl({ invert: sandbox })}
          aria-hidden
          aria-label={open ? "Lukk fargevelger" : "Åpne fargevelger"}
        />
      </button>
      <Popover
        open={open}
        anchorEl={anchorRef.current}
        onClose={() => setOpen(false)}
        placement="bottom-start"
        arrow={false}
      >
        <div className="flex flex-col">
          <ColorLabel
            onClick={handleClick}
            color={"--navds-semantic-color-canvas-background"}
          />
          <ColorLabel
            onClick={handleClick}
            color={"--navds-semantic-color-canvas-background-light"}
          />
        </div>
      </Popover>
    </>
  );
};

export default ColorPicker;
