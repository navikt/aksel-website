import { SandboxComponent } from "./types";

const PaginationSandbox: SandboxComponent = (props) => {
  const count = props?.count ? ` count={${props.count}}` : "count={9}";
  const siblingCount = props?.siblingCount
    ? ` siblingCount={${props.siblingCount}}`
    : "siblingCount={1}";
  const boundaryCount = props?.boundaryCount
    ? ` boundaryCount={${props.boundaryCount}}`
    : "boundaryCount={1}";
  const size = props?.size ? ` size="${props.size}"` : "";
  const forrigeNeste = props?.["Forrige/Neste"] ? ` prevNextTexts` : "";

  return `
  const PaginationDemo = () => {
    const [page, setPage] = React.useState(1);

    return <Pagination page={page} onPageChange={setPage}${count}${size}${forrigeNeste}${siblingCount}${boundaryCount} />
  }

  render(<PaginationDemo />)`;
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
