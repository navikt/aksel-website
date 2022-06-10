import { Tag } from "@navikt/ds-react";
import { SandboxComponentT } from "./types";

Tag.displayName = "Tag";
const TagSandbox: SandboxComponentT = (props: any) => {
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

TagSandbox.getCode = (props: any) => {
  return `<Tag
  variant="${props?.variant}"
  size="${props?.size}"
>
 ${props?.variant}
</Tag>`;
};

export default TagSandbox;
