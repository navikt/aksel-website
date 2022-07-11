import { Tag } from "@navikt/ds-react";
import { SandboxComponentT } from "./types";

const CopyToClipBoardSandbox: SandboxComponentT = (props: any) => {
  const title = props?.variant;

  return (
    <Tag variant={props?.variant ?? "info"} size={props?.size}>
      {title}
    </Tag>
  );
};

CopyToClipBoardSandbox.args = {
  props: {
    variant: ["info", "success", "warning", "error"],
    size: ["medium", "small"],
  },
};

CopyToClipBoardSandbox.getCode = (props: any) => {
  return `<Tag
  variant="${props?.variant}"
  size="${props?.size}"
>
 ${props?.variant}
</Tag>`;
};

export default CopyToClipBoardSandbox;
