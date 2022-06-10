import { Print } from "@navikt/ds-icons";
import { Tooltip, Button } from "@navikt/ds-react";
import { SandboxComponentT } from "./types";

Tooltip.displayName = "Tooltip";
(Button as any).displayName = "Button";
Print.displayName = "Print";

const TooltipSandbox: SandboxComponentT = (props: any) => {
  const newProps = {
    ...(props?.arrow ? {} : { arrow: false }),
    ...(props?.open ? { open: true } : {}),
    ...(props?.offset ? { offset: Number(props.offset) } : {}),
    ...(props?.Komposisjon?.includes("Med") ? { keys: ["cmd", "p"] } : {}),
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

/*
const newProps = {
    ...(props?.arrow ? {} : { arrow: false }),
    ...(props?.open ? { open: true } : {}),
    ...(props?.offset ? { offset: Number(props.offset) } : {}),
    ...(props?.Komposisjon?.includes("Med") ? { keys: ["cmd", "p"] } : {}),
  };
*/

TooltipSandbox.getCode = (props: any) => {
  return `<Tooltip
  content="${props?.content ? props?.content : "Print"}"
  placement="${props?.placement}"${!props?.arrow ? "\n  arrow={false}" : ""}${
    props?.open ? "\n  open" : ""
  }${props?.offset ? `\n  offset={${props?.offset}}` : ""}${
    props?.Komposisjon?.includes("Med") ? `\n  keys={["cmd", "p"]}` : ""
  }
>
  <Button>
    <Print aria-hidden />
  </Button>
</Tooltip>`;
};

export default TooltipSandbox;
