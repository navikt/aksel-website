import React, { useRef, useState } from "react";
import { Popover, Button, Select } from "@navikt/ds-react";
import { placements, Placement } from "@popperjs/core";
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
PopoverExample.react = `
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
      <Popover.Content>
        Innhold her!
      </Popover.Content>
    </Popover>
  </>`;

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
  const [selectedPlacement, setselectedPlacement] = useState<Placement>("auto");

  const [open, setOpen] = useState(false);
  return (
    <div className="my-12 mx-4 w-full flex justify-center">
      <Select
        value={selectedPlacement}
        onChange={(e) => {
          setselectedPlacement(e.target.value as Placement);
          setOpen(true);
        }}
        ref={selectRef}
        label="Placement"
      >
        {placements?.map((placement) => (
          <option key={placement} value={placement}>
            {placement}
          </option>
        ))}
      </Select>
      <Popover
        placement={selectedPlacement}
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
