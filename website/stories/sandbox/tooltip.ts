import { SandboxComponent } from "./types";

const TooltipSandbox: SandboxComponent = (props) => {
  const placement = props?.placement ? ` placement="${props.placement}"` : "";
  const arrow = props?.arrow ? `` : " arrow={false}";
  const offset = props?.offset ? ` offset={${props.offset}}` : "";
  const content = props?.content
    ? ` content={"${props.content}"}`
    : ` content="print"`;
  const komp = props?.Komposisjon.includes("Med") ? ` keys={["cmd","p"]}` : "";
  const open = props?.open ? " open" : "";

  return `<Tooltip${placement}${arrow}${offset}${content}${komp}${open}>
  <Button><Print aria-hidden/></Button>
  </Tooltip>`;
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
