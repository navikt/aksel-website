import { BgColors, SandboxComponent } from "./types";

const TableSandbox: SandboxComponent = ({
  size,
  zebraStripes,
  selectable,
  sortable,
  pagination,
  expandableRows,
}) => {
  const propZebraStripes = zebraStripes ? ` zebraStripes` : "";
  const propSize = size ? ` size="${size}"` : "";

  return `
  const TableDemo = () => {
    ${
      selectable
        ? `const [selectedRows, setSelectedRows] = React.useState([]);
  
    const toggleSelectedRow = (value) =>
        setSelectedRows((list) =>
          list.includes(value)
            ? list.filter((id) => id !== value)
            : [...list, value]
        );`
        : ""
    }
    ${sortable ? `const [sort, setSort] = React.useState();` : ""}
    ${
      pagination
        ? `const [page, setPage] = React.useState(1);
            const rowsPerPage = 4;`
        : ""
    }

  return (
    <div className="w-full flex flex-col gap-4">
    <Table${propZebraStripes}${propSize} ${
    sortable
      ? `sort={sort}
        onSortChange={(sortKey) =>
          setSort(sort && sortKey === sort.orderBy && sort.direction === "descending"
            ? undefined
            : {
              orderBy: sortKey,
              direction: 
                sort &&sortKey === sort.orderBy && sort.direction === "ascending" 
                  ? "descending" 
                  : "ascending",
            })
        }`
      : ""
  }>
      <Table.Header>
        <Table.Row>
        ${
          selectable
            ? `<Table.DataCell>
                <Checkbox
                  ${propSize}
                  checked={selectedRows.length === data.length}
                  indeterminate={selectedRows.length && selectedRows.length !== data.length}
                  onChange={(e) =>
                    selectedRows.length
                      ? setSelectedRows([])
                      : setSelectedRows(data.map(({fnr}) => fnr))
                  }
                  hideLabel
                >
                  {" "}
                </Checkbox>
              </Table.DataCell>`
            : ""
        }
        ${expandableRows && !selectable ? `<Table.HeaderCell />` : ""}
          ${
            sortable
              ? `<Table.ColumnHeader sortKey="name" sortable>
                  Navn
                </Table.ColumnHeader>`
              : '<Table.HeaderCell scope="col">Navn</Table.HeaderCell>'
          }
          <Table.HeaderCell scope="col">Fødseslnr.</Table.HeaderCell>
          ${
            sortable
              ? `<Table.ColumnHeader sortKey="start" sortable>
                  Start
                </Table.ColumnHeader>`
              : '<Table.HeaderCell scope="col">Start</Table.HeaderCell>'
          }
          ${expandableRows && selectable ? `<Table.HeaderCell />` : ""}
        </Table.Row>
      </Table.Header>
      <Table.Body>
      {data
        ${
          sortable
            ? `.slice()
            .sort((a, b) => {
              if (sort) {
                const comparator = (a, b, orderBy) => {
                  if (b[orderBy] < a[orderBy] || b[orderBy] === undefined) {
                    return -1;
                  }
                  if (b[orderBy] > a[orderBy]) {
                    return 1;
                  }
                  return 0;
                };

                return sort.direction === "ascending"
                  ? comparator(b, a, sort.orderBy)
                  : comparator(a, b, sort.orderBy);
              }
              return 1;
            })`
            : ""
        }
        ${
          pagination
            ? `.slice((page - 1) * rowsPerPage, page * rowsPerPage)`
            : ""
        }
        .map(
          ({ name, fnr, start }) =>
            <Table.${
              expandableRows
                ? `ExpandableRow content="Innhold i ekspanderbar rad" ${
                    selectable ? `togglePlacement="right"` : ""
                  }`
                : "Row"
            } key={fnr} ${
    selectable ? "selected={selectedRows.includes(fnr)}" : ""
  }>
              ${
                selectable
                  ? `<Table.DataCell>
                      <Checkbox
                        ${propSize}
                        hideLabel
                        checked={selectedRows.includes(fnr)}
                        onChange={() => toggleSelectedRow(fnr)}
                        aria-labelledby="id{fnr}"
                      >
                        {" "}
                      </Checkbox>
                    </Table.DataCell>
                    <Table.HeaderCell scope="row">
                      <span id="id{fnr}">{name}</span>
                    </Table.HeaderCell>`
                  : `<Table.HeaderCell scope="row">{name}</Table.HeaderCell>`
              }
              <Table.DataCell>{fnr.substring(0, 6)} {fnr.substring(6)}</Table.DataCell>
              <Table.DataCell>{format(new Date(start), "dd.MM.yyyy")}</Table.DataCell>
            </Table.${expandableRows ? "ExpandableRow" : "Row"}>
        )}
      </Table.Body>
    </Table>
    ${
      pagination
        ? `<Pagination
            page={page}
            onPageChange={setPage}
            count={Math.ceil(data.length / rowsPerPage)}
          />`
        : ""
    }
    </div>
  );
}

render(<TableDemo />);


const data = [
  {
    name: "Jakobsen, Markus",
    fnr: "03129265463",
    start: "2021-04-28T19:12:14.358Z",
  },
  {
    name: "Halvorsen, Mari",
    fnr: "16063634134",
    start: "2022-01-29T09:51:19.833Z",
  },
  {
    name: "Christiansen, Mathias",
    fnr: "18124441438",
    start: "2021-06-04T20:57:29.159Z",
  },
  {
    name: "Fredriksen, Leah",
    fnr: "24089080180",
    start: "2021-08-31T15:47:36.293Z",
  },
  {
    name: "Evensen, Jonas",
    fnr: "18106248460",
    start: "2021-07-17T11:13:26.116Z",
  },
  {
    name: "Strand, Thomas",
    fnr: "11123693157",
    start: "2021-08-14T14:15:44.597Z",
  },
  {
    name: "Eriksen, Sofie",
    fnr: "07067878435",
    start: "2021-12-20T15:55:02.613Z",
  },
  {
    name: "Jørgensen, Erik",
    fnr: "02099681196",
    start: "2021-09-05T11:33:19.361Z",
  },
  {
    name: "Carlsen, Sondre",
    fnr: "23096491197",
    start: "2022-01-25T16:10:47.223Z",
  },
  {
    name: "Berge, Martine",
    fnr: "11090293151",
    start: "2022-01-09T11:15:50.833Z",
  },
];
`;
};

TableSandbox.args = {
  props: {
    size: ["medium", "small"],
    zebraStripes: false,
    selectable: false,
    sortable: false,
    pagination: false,
    expandableRows: false,
  },
  background: BgColors.WHITE,
};

export default TableSandbox;
