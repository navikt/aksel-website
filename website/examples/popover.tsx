import React, { useRef, useState } from "react";
import { Popover, Button, Select } from "@navikt/ds-react";
import { placements, Placement } from "@popperjs/core";
import styled from "styled-components";

export const PopoverExample = () => {
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
      >
        <Popover.Content>
          Eu quis exercitation voluptate ex. Aute irure esse occaecat minim
          cupidatat velit minim duis sint culpa anim laboris. Consectetur nulla
          eu commodo ea culpa velit commodo incididunt sunt ipsum.
        </Popover.Content>
      </Popover>
    </>
  );
};

export const PopoverArrow = () => {
  const buttonRef = useRef(null);
  return (
    <>
      <Button ref={buttonRef}>Anker</Button>
      <Popover
        open={true}
        onClose={() => null}
        anchorEl={buttonRef.current}
        arrow={false}
      >
        <Popover.Content>
          Eu quis exercitation voluptate ex. Aute irure esse occaecat minim
          cupidatat velit minim duis sint culpa anim laboris. Consectetur nulla
          eu commodo ea culpa velit commodo incididunt sunt ipsum.
        </Popover.Content>
      </Popover>
    </>
  );
};

export const PopoverOffset = () => {
  const buttonRef = useRef(null);
  return (
    <>
      <Button ref={buttonRef}>Anker</Button>
      <Popover
        open={true}
        onClose={() => null}
        anchorEl={buttonRef.current}
        arrow={false}
        offset={32}
      >
        <Popover.Content>
          Eu quis exercitation voluptate ex. Aute irure esse occaecat minim
          cupidatat velit minim duis sint culpa anim laboris. Consectetur nulla
          eu commodo ea culpa velit commodo incididunt sunt ipsum.
        </Popover.Content>
      </Popover>
    </>
  );
};

const Wrapper = styled.div`
  margin: 3rem 1rem;
`;

export const PopoverPlacement = () => {
  const selectRef = useRef(null);
  const [selectedPlacement, setselectedPlacement] = useState<Placement>("auto");

  return (
    <Wrapper>
      <Select
        value={selectedPlacement}
        onChange={(e) => setselectedPlacement(e.target.value as Placement)}
        ref={selectRef}
        label="Placement av popover"
      >
        {placements?.map((placement) => (
          <option key={placement} value={placement}>
            {placement}
          </option>
        ))}
      </Select>
      <Popover
        placement={selectedPlacement}
        open={true}
        onClose={() => null}
        anchorEl={selectRef.current}
      >
        <Popover.Content>
          Officia reprehenderit irure aliqua cupidatat quis
        </Popover.Content>
      </Popover>
    </Wrapper>
  );
};
