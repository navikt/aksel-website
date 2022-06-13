import { Checkbox, Pagination, Table } from "@navikt/ds-react";
import { format } from "date-fns";
import React from "react";
import { BgColors } from "../../lib/types/types";
import { SandboxComponentT } from "./types";

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

const TableSandbox: SandboxComponentT = (props: any) => {
  const newProps = { zebraStripes: props?.zebraStripes, size: props?.size };

  /* sortable */
  const [sort, setSort] = React.useState<any>();

  /* Pagination */
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 4;

  const [selectedRows, setSelectedRows] = React.useState([]);
  const toggleSelectedRow = (value) =>
    setSelectedRows((list) =>
      list.includes(value)
        ? list.filter((id) => id !== value)
        : [...list, value]
    );

  const handleSort = (sortKey) => {
    setSort(
      sort && sortKey === sort.orderBy && sort.direction === "descending"
        ? undefined
        : {
            orderBy: sortKey,
            direction:
              sort && sortKey === sort.orderBy && sort.direction === "ascending"
                ? "descending"
                : "ascending",
          }
    );
  };

  let sortData = data;
  if (props?.sortable) {
    sortData = sortData.slice().sort((a, b) => {
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
    });
  }
  if (props?.pagination) {
    sortData = sortData.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  }

  return (
    <div className="flex w-full flex-col gap-4">
      <Table
        {...newProps}
        {...(props?.sortable
          ? { sort: sort, onSortChange: (sortKey) => handleSort(sortKey) }
          : {})}
      >
        <Table.Header>
          <Table.Row>
            {props?.selectable && (
              <Table.DataCell>
                <Checkbox
                  size={props?.size}
                  checked={selectedRows.length === data.length}
                  indeterminate={
                    selectedRows.length && selectedRows.length !== data.length
                  }
                  onChange={() => {
                    selectedRows.length
                      ? setSelectedRows([])
                      : setSelectedRows(data.map(({ fnr }) => fnr));
                  }}
                  hideLabel
                >
                  {""}
                </Checkbox>
              </Table.DataCell>
            )}
            {props?.expandableRows && !props?.selectable && (
              <Table.HeaderCell />
            )}
            {props?.sortable ? (
              <Table.ColumnHeader sortKey="name" sortable>
                Navn
              </Table.ColumnHeader>
            ) : (
              <Table.HeaderCell scope="col">Navn</Table.HeaderCell>
            )}
            <Table.HeaderCell scope="col">Fødseslnr.</Table.HeaderCell>
            {props?.sortable ? (
              <Table.ColumnHeader sortKey="start" sortable>
                Start
              </Table.ColumnHeader>
            ) : (
              <Table.HeaderCell scope="col">Start</Table.HeaderCell>
            )}
            {props?.expandableRows && props?.selectable && <Table.HeaderCell />}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {sortData.map(({ name, fnr, start }, i) => {
            const Comp = props?.expandableRows
              ? Table.ExpandableRow
              : Table.Row;
            const rowProps = {
              ...(props?.expandableRows
                ? {
                    content: "Innhold i ekspanderbar rad",
                    ...(props?.selectable ? { togglePlacement: "right" } : {}),
                  }
                : {}),
              ...(props?.selectable
                ? { selected: selectedRows.includes(fnr) }
                : {}),
            };
            return (
              <Comp {...rowProps} key={i + fnr}>
                {props?.selectable ? (
                  <>
                    <Table.DataCell>
                      <Checkbox
                        size={props?.size}
                        hideLabel
                        checked={selectedRows.includes(fnr)}
                        onChange={() => {
                          toggleSelectedRow(fnr);
                        }}
                        aria-labelledby="id{fnr}"
                      >
                        {" "}
                      </Checkbox>
                    </Table.DataCell>
                    <Table.HeaderCell scope="row">
                      <span id="id{fnr}">{name}</span>
                    </Table.HeaderCell>
                  </>
                ) : (
                  <Table.HeaderCell scope="row">{name}</Table.HeaderCell>
                )}
                <Table.DataCell>
                  {fnr.substring(0, 6)} {fnr.substring(6)}
                </Table.DataCell>
                <Table.DataCell>
                  {format(new Date(start), "dd.MM.yyyy")}
                </Table.DataCell>
              </Comp>
            );
          })}
        </Table.Body>
      </Table>
      {props?.pagination && (
        <Pagination
          page={page}
          onPageChange={setPage}
          count={Math.ceil(data.length / rowsPerPage)}
        />
      )}
    </div>
  );
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

TableSandbox.getCode = (props: any) => {
  let body = ``;

  if (props?.expandableRows) {
    body = `{sortData.map(({ name, fnr, start }, i) => {
      return <Table.ExpandableRow key={i + fnr} content="Innhold i ekspanderbar rad"${
        props?.selectable
          ? ` togglePlacement="right" selected={selectedRows.includes(fnr)}`
          : ""
      }>
      ${
        props?.selectable
          ? `         <Table.DataCell>
                  <Checkbox
                    size={props?.size}
                    hideLabel
                    checked={selectedRows.includes(fnr)}
                    onChange={() => {
                      toggleSelectedRow(fnr);
                    }}
                    aria-labelledby="id{fnr}"
                  >
                    {" "}
                  </Checkbox>
                </Table.DataCell>
                <Table.HeaderCell scope="row">
                  <span id="id{fnr}">{name}</span>
                </Table.HeaderCell>`
          : `         <Table.HeaderCell scope="row">{name}</Table.HeaderCell>`
      }
                <Table.DataCell>
                  {fnr.substring(0, 6)} {fnr.substring(6)}
                </Table.DataCell>
                <Table.DataCell>
                  {format(new Date(start), "dd.MM.yyyy")}
                </Table.DataCell>
              </Table.ExpandableRow>
  })}`;
  } else {
    body = `{sortData.map(({ name, fnr, start }, i) => {
      return <Table.Row key={i + fnr}${
        props?.selectable ? ` selected={selectedRows.includes(fnr)}` : ""
      }>
      ${
        props?.selectable
          ? `         <Table.DataCell>
                  <Checkbox
                    size={props?.size}
                    hideLabel
                    checked={selectedRows.includes(fnr)}
                    onChange={() => {
                      toggleSelectedRow(fnr);
                    }}
                    aria-labelledby="id{fnr}"
                  >
                    {" "}
                  </Checkbox>
                </Table.DataCell>
                <Table.HeaderCell scope="row">
                  <span id="id{fnr}">{name}</span>
                </Table.HeaderCell>`
          : `         <Table.HeaderCell scope="row">{name}</Table.HeaderCell>`
      }
                <Table.DataCell>
                  {fnr.substring(0, 6)} {fnr.substring(6)}
                </Table.DataCell>
                <Table.DataCell>
                  {format(new Date(start), "dd.MM.yyyy")}
                </Table.DataCell>
              </Table.Row>
  })}`;
  }

  return `<>
  <Table
  size="${props?.size}"${props?.zebraStripes ? "\n  zebraStripes" : ""}${
    props?.sortable
      ? `\n  sort={sort}\n  onSortChange={(sortKey) => handleSort(sortKey)}`
      : ""
  }
>
  <Table.Header>
    <Table.Row>
    ${
      props?.selectable
        ? `  <Table.DataCell>
        <Checkbox
          size="${props?.size}"
          checked={selectedRows.length === data.length}
          indeterminate={
            selectedRows.length && selectedRows.length !== data.length
          }
          onChange={() => {
            selectedRows.length
              ? setSelectedRows([])
              : setSelectedRows(data.map(({ fnr }) => fnr));
          }}
          hideLabel
        >
          {""}
      </Checkbox>
    </Table.DataCell>`
        : ""
    }
    ${
      props?.expandableRows && !props?.selectable
        ? `  <Table.HeaderCell />`
        : ""
    }
    ${
      props?.sortable
        ? `  <Table.ColumnHeader sortKey="name" sortable>
        Navn
      </Table.ColumnHeader>`
        : `  <Table.HeaderCell scope="col">Navn</Table.HeaderCell>`
    }
      <Table.HeaderCell scope="col">Fødseslnr.</Table.HeaderCell>
    ${
      props?.sortable
        ? `  <Table.ColumnHeader sortKey="start" sortable>
        Start
      </Table.ColumnHeader>`
        : `  <Table.HeaderCell scope="col">Start</Table.HeaderCell>`
    }
    ${
      props?.expandableRows && props?.selectable ? `  <Table.HeaderCell />` : ""
    }
    </Table.Row>
  </Table.Header>
  <Table.Body>
    ${body}
  </Table.Body>
</Table>${
    props?.pagination
      ? `\n<Pagination
  page={page}
  onPageChange={setPage}
  count={Math.ceil(data.length / rowsPerPage)}
/>`
      : ""
  }</>`;
};

export default TableSandbox;
