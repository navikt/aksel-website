import { Label, Popover } from "@navikt/ds-react";
import { useRef, useState } from "react";
import styled, { css } from "styled-components";
import { CanvasIcon } from "../..";
import cl from "classnames";

const ScContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const ScLabel = styled(Label)`
  padding: 0.5rem 1rem;
  border-bottom: 1px solid var(--navds-semantic-color-border-muted);
`;

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

const ScDot = styled.div<{ $color: string }>`
  width: 2rem;
  height: 2rem;
  position: relative;

  ::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background-color: ${(props) => `var(${props.$color})`};
    border: 1px solid var(--navds-semantic-color-border-muted);
  }
`;

const ScTabCss = css`
  background-color: transparent;
  border: none;
  color: var(--navds-semantic-color-text-muted);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ScTabButton = styled.button`
  ${ScTabCss}

  :hover,
  :hover:focus {
    cursor: pointer;
    color: var(--navds-semantic-color-text);
  }
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
      $active={activeColor === color}
      onClick={() => onClick(color)}
    >
      {newColor} <ScDot $color={color} />
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
    onChange && onChange(c);
  };

  return (
    <>
      <ScTabButton
        ref={anchorRef}
        onClick={() => setOpen(!open)}
        className={cl(className, {
          "hover:bg-interaction-primary-hover-subtle min-w-[50px]": !sandbox,
        })}
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
      </ScTabButton>
      <Popover
        open={open}
        anchorEl={anchorRef.current}
        onClose={() => setOpen(false)}
        placement="bottom"
      >
        <ScLabel forwardedAs="div">Bakgrunnsfarge (token)</ScLabel>
        <ScContent>
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
          <ColorLabel
            activeColor={selectedColor}
            onClick={handleClick}
            color={"--navds-semantic-color-canvas-background-inverted"}
          />
        </ScContent>
      </Popover>
    </>
  );
};

export default ColorPicker;
