import { Tag } from "@navikt/ds-react";
import { SandboxComponentv2 } from "./types";

Tag.displayName = "Tag";
const TagSandbox: SandboxComponentv2 = (props: any) => {
  const title = props?.variant;

  return (
    <Tag variant={props?.variant ?? "info"} size={props?.size}>
      {title}
    </Tag>
  );
};

TagSandbox.args = {
  props: {
    variant: ["info", "success", "warning", "error"],
    size: ["medium", "small"],
  },
};

export default TagSandbox;
