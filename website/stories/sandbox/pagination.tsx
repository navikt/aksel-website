import { Pagination } from "@navikt/ds-react";
import { useState } from "react";
import { SandboxComponentv2 } from "./types";

Pagination.displayName = "Pagination";
const PaginationSandbox: SandboxComponentv2 = (props: any) => {
  const [page, setPage] = useState(1);

  const newProps = {
    ...(props?.["Forrige/Neste"] ? { prevNextTexts: true } : {}),
  };

  return (
    <Pagination
      {...newProps}
      page={page}
      onPageChange={(x) => setPage(x)}
      count={Number(props?.count)}
      size={props?.size}
      boundaryCount={Number(props?.boundaryCount) ?? 1}
      siblingCount={Number(props?.siblingCount) ?? 1}
    />
  );
};

PaginationSandbox.args = {
  props: {
    size: ["medium", "small"],
    count: "9",
    siblingCount: "1",
    boundaryCount: "1",
    "Forrige/Neste": false,
  },
};

export default PaginationSandbox;
