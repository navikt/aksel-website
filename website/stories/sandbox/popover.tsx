import { Button, Popover } from "@navikt/ds-react";
import { useEffect, useRef, useState } from "react";
import { SandboxComponentT } from "./types";

const PopoverSandbox: SandboxComponentT = (props: any) => {
  const buttonRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const newProps = { ...(props?.offset ? { offset: props.offset } : {}) };

  useEffect(() => {
    setIsOpen(props?.open === "true" || open);
  }, [props, open]);

  return (
    <>
      <Button
        ref={(ref) => {
          buttonRef.current = ref;
        }}
        onClick={() => setOpen(true)}
      >
        Åpne
      </Button>
      <Popover
        open={isOpen}
        onClose={() => setOpen(false)}
        anchorEl={buttonRef.current}
        placement={props?.placement}
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
    ],
    arrow: true,
    offset: "",
    open: ["", "true"],
  },
};

PopoverSandbox.getCode = (props: any) => {
  return `<>
  <Button
    ref={buttonRef}
    onClick={() => setOpenState(true)}
  >
    Åpne popover
  </Button>
  <Popover
    open={openState}
    onClose={() => setOpenState(false)}
    anchorEl={buttonRef.current}${!props?.arrow ? "\n    arrow={false}" : ""}${
    props?.placement ? `\n    placement="${props?.placement}"` : ""
  }${props?.offset ? `\n    offset={${props?.offset}}` : ""}
  >
    <Popover.Content>Innhold her!</Popover.Content>
  </Popover>
</>`;
};

export default PopoverSandbox;
