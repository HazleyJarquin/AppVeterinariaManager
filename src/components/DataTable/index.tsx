import { AddIcon, ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Button, Heading } from "@chakra-ui/react";
import {
  CellContext,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

type Column = {
  Header: string | JSX.Element;
  accessor: string | ((row: any) => string | number | JSX.Element);
  id?: string;
  Cell?: (info: CellContext<any, any>) => JSX.Element | null;
  footer?: string;
  filter?: "text" | "number"; // Añadir tipos de filtro según corresponda
};

type DataTableProps = {
  data: any[];
  columns: Column[];
  loading: boolean;
  paginated?: boolean;
  paginatedPosition?: "flex-start" | "center" | "flex-end";
  pageSize?: number;
  tableTitle: string;
  onClickButtonAdd: () => void;
  isButton: boolean;
  titleButton: string;
};

const columnHelper = createColumnHelper<any>();

export const DataTable: React.FC<DataTableProps> = ({
  data = [],
  columns = [],
  paginated = false,
  paginatedPosition = "center",
  pageSize = 10,
  tableTitle,
  onClickButtonAdd,
  isButton,
  titleButton,
}) => {
  const table = useReactTable({
    data,
    columns: columns.map((column) =>
      columnHelper.accessor(column.accessor, {
        ...column,
        header: () => column.Header,
        id: column.id || column.Header.toString(),
        cell: column.Cell ?? (({ getValue }) => <>{getValue()}</>),
        footer: column.footer?.toString(),
      })
    ),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),

    initialState: {
      pagination: {
        pageSize: pageSize,
      },
    },
  });

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          background: "white",
          borderRadius: "8px",
          width: "100%",
          height: "450px",
          padding: "10px",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Heading size={"lg"}>{tableTitle}</Heading>
          {isButton && (
            <Button
              leftIcon={<AddIcon />}
              fontSize={"md"}
              onClick={onClickButtonAdd}
            >
              {titleButton}
            </Button>
          )}
        </div>
        <table>
          <thead style={{ borderBottom: "1px solid gray" }}>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    style={{
                      width: "300px",
                      padding: "10px",
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row, index) => (
              <tr
                key={row.id}
                style={{
                  width: "300px",
                  textAlign: "center",
                  backgroundColor: index % 2 === 0 ? "white" : "#faeae2",
                  color: "black",
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} style={{ padding: "10px" }}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot>
            {table.getFooterGroups().map((footerGroup) => (
              <tr key={footerGroup.id}>
                {footerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.footer,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </tfoot>
        </table>
      </div>
      {paginated && (
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: paginatedPosition,
            alignItems: "center",
            marginTop: "10px",
            gap: "10px",
          }}
        >
          <Button
            variant={"outline"}
            color={"black"}
            _hover={{ background: "none" }}
            leftIcon={<ChevronLeftIcon />}
            onClick={() => table.previousPage()}
            isDisabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <span>
            {table.getState().pagination.pageIndex + 1} /{" "}
            {table.getPageCount().toLocaleString()}
          </span>
          <Button
            variant={"outline"}
            color={"black"}
            _hover={{ background: "none" }}
            rightIcon={<ChevronRightIcon />}
            onClick={() => table.nextPage()}
            isDisabled={!table.getCanNextPage()}
          >
            Siguiente
          </Button>
        </div>
      )}
    </>
  );
};
