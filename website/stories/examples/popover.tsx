import React, { useRef, useState } from "react";
import { Popover, Button, Select } from "@navikt/ds-react";

const placement = [
  "auto",
  "auto-start",
  "auto-end",
  "top",
  "bottom",
  "right",
  "left",
  "top-start",
  "top-end",
  "bottom-start",
  "bottom-end",
  "right-start",
  "right-end",
  "left-start",
  "left-end",
];

import { ExampleComponent } from "../../lib";

export const PopoverExample: ExampleComponent = () => {
  const buttonRef = useRef(null);
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button ref={buttonRef} onClick={() => setOpen(true)}>
        Åpne popover
      </Button>
      <Popover
        open={open}
        onClose={() => setOpen(false)}
        anchorEl={buttonRef.current}
        placement="auto"
      >
        <Popover.Content>Innhold her!</Popover.Content>
      </Popover>
    </>
  );
};

PopoverExample.html = "";
PopoverExample.react = `const PopoverExample = () => {
  const buttonRef = useRef(null);
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button ref={buttonRef} onClick={() => setOpen(true)}>
        Åpne popover
      </Button>
      <Popover
        open={open}
        onClose={() => setOpen(false)}
        anchorEl={buttonRef.current}
        placement="auto"
      >
        <Popover.Content>Innhold her!</Popover.Content>
      </Popover>
    </>
  );
};`;

export const PopoverArrow: ExampleComponent = () => {
  const buttonRef = useRef(null);
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button ref={buttonRef} onClick={() => setOpen(true)}>
        Åpne popover
      </Button>
      <Popover
        open={open}
        onClose={() => setOpen(false)}
        anchorEl={buttonRef.current}
        arrow={false}
        placement="auto"
      >
        <Popover.Content>Innhold her!</Popover.Content>
      </Popover>
    </>
  );
};

PopoverArrow.html = "";
PopoverArrow.react = `
  <>
    <Button ref={buttonRef} onClick={() => setOpen(true)}>Åpne popover</Button>
    <Popover
      open={open}
      onClose={() => setOpen(false)}
      anchorEl={buttonRef.current}
      arrow={false}
      placement="auto"
    >
      <Popover.Content>
        Innhold her!
      </Popover.Content>
    </Popover>
  </>
`;

export const PopoverOffset: ExampleComponent = () => {
  const buttonRef = useRef(null);
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button ref={buttonRef} onClick={() => setOpen(true)}>
        Åpne popover
      </Button>
      <Popover
        open={open}
        onClose={() => setOpen(false)}
        anchorEl={buttonRef.current}
        arrow={false}
        offset={32}
        placement="auto"
      >
        <Popover.Content>Innhold her!</Popover.Content>
      </Popover>
    </>
  );
};

PopoverOffset.html = ``;
PopoverOffset.react = `
  <>
    <Button ref={buttonRef}>Åpne popover</Button>
    <Popover
      open={open}
      onClose={() => setOpen(false)}
      anchorEl={buttonRef.current}
      arrow={false}
      offset={32}
    >
      <Popover.Content>
        Innhold her!
      </Popover.Content>
    </Popover>
  </>`;

export const PopoverPlacement: ExampleComponent = () => {
  const selectRef = useRef(null);
  const [selectedPlacement, setselectedPlacement] = useState<string>("auto");

  const [open, setOpen] = useState(false);
  return (
    <div className="my-12 mx-4 flex w-full justify-center">
      <Select
        value={selectedPlacement}
        onChange={(e) => {
          setselectedPlacement(e.target.value);
          setOpen(true);
        }}
        ref={selectRef}
        label="Placement"
      >
        {placement?.map((placement) => (
          <option key={placement} value={placement}>
            {placement}
          </option>
        ))}
      </Select>
      <Popover
        placement={selectedPlacement as any}
        open={open}
        onClose={() => setOpen(false)}
        anchorEl={selectRef.current}
      >
        <Popover.Content>Innhold her!</Popover.Content>
      </Popover>
    </div>
  );
};

PopoverPlacement.react = "";
PopoverPlacement.html = "";
