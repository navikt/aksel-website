import { Pagination } from "@navikt/ds-react";
import { useState } from "react";
import { SandboxComponentT } from "./types";

Pagination.displayName = "Pagination";
const PaginationSandbox: SandboxComponentT = (props: any) => {
  const [page, setPage] = useState(1);

  const newProps = {
    ...(props?.["Forrige/Neste"] ? { prevNextTexts: true } : {}),
  };

  return (
    <Pagination
      {...newProps}
      page={page}
      onPageChange={(x) => setPage(x)}
      count={Number(props?.count) ?? 1}
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

PaginationSandbox.getCode = (props: any) => {
  return `<Pagination
  size="${props?.size}"
  page={pageState}
  onPageChange={(x) => setPageState(x)}
  count={${`${props?.count ? props?.count : "1"}`}}
  boundaryCount={${`${props?.boundaryCount ? props?.boundaryCount : "1"}`}}
  siblingCount={${`${props?.siblingCount ? props?.siblingCount : "1"}`}}${
    props?.["Forrige/Neste"] ? "\n  prevNextTexts" : ""
  }
/>`;
};

export default PaginationSandbox;
