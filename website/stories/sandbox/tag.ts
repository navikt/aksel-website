import { SandboxComponent } from "./types";

const TagSandbox: SandboxComponent = (props) => {
  const propVariant = props?.variant ? ` variant="${props.variant}"` : "";
  const size = props?.size ? ` size="${props.size}"` : "";
  const title = props.variant;

  return `<Tag${propVariant}${size} >${title}</Tag>`;
};

TagSandbox.args = {
  props: {
    variant: ["info", "success", "warning", "error"],
    size: ["", "medium", "small"],
  },
};

export default TagSandbox;
