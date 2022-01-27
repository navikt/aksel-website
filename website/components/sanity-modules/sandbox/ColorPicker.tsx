import { Popover } from "@navikt/ds-react";
import cl from "classnames";
import { useRef, useState } from "react";
import styled from "styled-components";
import { CanvasIcon } from "../..";

const ScColorLabel = styled.button<{ $active: boolean }>`
  position: relative;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;
  background: none;
  border: none;
  padding: 0.5rem 1rem;

  :focus {
    outline: none;
    box-shadow: inset 0 0 0 2px var(--navds-semantic-color-focus);
  }

  ${({ $active }) =>
    $active &&
    `
  background-color: var(--navds-semantic-color-canvas-background);
  `}
`;

const ColorLabel = ({
  color,
  onClick,
  activeColor,
}: {
  color: string;
  onClick: (c: string) => void;
  activeColor: string;
}) => {
  const newColor = color
    .replace("navds-", "")
    .replace("semantic-", "")
    .replace("global-", "")
    .replace("color-", "")
    .replace("--", "")
    .replaceAll("-", " ");
  return (
    <ScColorLabel
      style={{ background: `var(${color})` }}
      $active={activeColor === color}
      onClick={() => onClick(color)}
    >
      <span className="invert" style={{ color: `var(${color})` }}>
        {newColor}
      </span>
    </ScColorLabel>
  );
};

const ColorPicker = ({
  onChange,
  defaultColor,
  className,
  sandbox,
  ...rest
}: {
  onChange: (c: string) => void;
  defaultColor?: string;
  className?: string;
  sandbox?: boolean;
  style?: any;
}) => {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(
    defaultColor ?? "--navds-semantic-color-canvas-background"
  );

  const handleClick = (c: string) => {
    setSelectedColor(c);
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
          "bg-transparent border-none text-text-muted flex items-center justify-center hover:text-text",
          {
            "hover:bg-interaction-primary-hover-subtle min-w-[50px]": !sandbox,
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
            activeColor={selectedColor}
            onClick={handleClick}
            color={"--navds-semantic-color-canvas-background"}
          />
          <ColorLabel
            activeColor={selectedColor}
            onClick={handleClick}
            color={"--navds-semantic-color-canvas-background-light"}
          />
        </div>
      </Popover>
    </>
  );
};

export default ColorPicker;
