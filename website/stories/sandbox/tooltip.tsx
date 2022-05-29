import { Print } from "@navikt/ds-icons";
import { Tooltip, Button } from "@navikt/ds-react";
import { SandboxComponentv2 } from "./types";

Tooltip.displayName = "Tooltip";
(Button as any).displayName = "Button";
Print.displayName = "Button";

const TooltipSandbox: SandboxComponentv2 = (props: any) => {
  const newProps = {
    ...(props?.arrow ? {} : { arrow: false }),
    ...(props?.open ? { open: true } : {}),
    ...(props?.offset ? { offset: Number(props.offset) } : {}),
    ...(props?.Komposisjon.includes("Med") ? { keys: ["cmd", "p"] } : {}),
  };

  return (
    <Tooltip
      {...newProps}
      content={props?.content ?? "Print"}
      placement={props?.placement}
    >
      <Button>
        <Print aria-hidden />
      </Button>
    </Tooltip>
  );
};

TooltipSandbox.args = {
  props: {
    placement: ["top", "right", "bottom", "left"],
    arrow: true,
    offset: "",
    content: "Print",
    Komposisjon: ["Uten shortcuts", "Med shortcuts"],
    open: false,
  },
};

export default TooltipSandbox;
