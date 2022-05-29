import { ReadMore } from "@navikt/ds-react";
import { SandboxComponentT } from "./types";

ReadMore.displayName = "ReadMore";
const ReadMoreSandbox: SandboxComponentT = () => {
  return (
    <div>
      <ReadMore header="ReadMore header text" renderContentWhenClosed>
        13 Magna aliquip aliquip fugiat nostrud nostrud velit pariatur veniam 14
        officia laboris voluptate officia pariatur.Lorem est ex anim velit 15
        occaecat nisi qui nostrud sit consectetur consectetur officia nostrud 16
        ullamco. 28
      </ReadMore>
    </div>
  );
};

export default ReadMoreSandbox;
