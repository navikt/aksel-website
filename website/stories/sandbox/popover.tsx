import { Button, Popover } from "@navikt/ds-react";
import { useRef, useState } from "react";
import { SandboxComponentT } from "./types";

Popover.displayName = "Popover";
Popover.Content.displayName = "Popover.Content";
const PopoverSandbox: SandboxComponentT = (props: any) => {
  const buttonRef = useRef(null);
  const [open, setOpen] = useState(false);
  const newProps = { ...(props?.offset ? { offset: props.offset } : {}) };
  return (
    <>
      <Button
        ref={(ref) => {
          buttonRef.current = ref;
        }}
        onClick={() => setOpen(true)}
      >
        Åpne popover
      </Button>
      <Popover
        open={props?.open === "true" || open}
        onClose={() => setOpen(false)}
        anchorEl={buttonRef.current}
        placement={props?.placement || "auto"}
        arrow={props?.arrow}
        {...newProps}
      >
        <Popover.Content>Innhold her!</Popover.Content>
      </Popover>
    </>
  );
};

PopoverSandbox.args = {
  props: {
    placement: [
      "",
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
      "auto",
      "auto-start",
      "auto-end",
    ],
    arrow: true,
    offset: "",
    open: ["", "true"],
  },
};

export default PopoverSandbox;
