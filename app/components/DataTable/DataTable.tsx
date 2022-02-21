
import type { Column } from "react-table";
import { useMemo } from "react";
import { useTable, useFilters, useGlobalFilter, useSortBy } from "react-table";
import { FaSortAlphaUp, FaSortAlphaDown } from "react-icons/fa";
import Search from "./components/Search/Search";

export function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}: any) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = useMemo(() => {
    const options = new Set()
    preFilteredRows.forEach((row: any) => {
      options.add(row.values[id])
    })
    return [...options.values()]
  }, [id, preFilteredRows])

  // Render a multi-select box
  return (
    <select
      value={filterValue}
      onChange={e => {
        setFilter(e.target.value || undefined)
      }}
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option
          key={i}
          value={option}
        >
          {option}
        </option>
      ))}
    </select>
  )
}

export type DataTableProps = {
  columns: Column<any>[]
  data: any[]
  search?: boolean
}



export default function DataTable({ columns, data, search = false }: DataTableProps) {
  const defaultColumn = useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: SelectColumnFilter,
    }),
    []
  )

  const tableInstance = useTable(
    // @ts-ignore
    { columns, data, defaultColumn },
    useGlobalFilter,
    useFilters,
    useSortBy,
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    // @ts-ignore
    setGlobalFilter,
    state: {
      // @ts-ignore
      globalFilter
    },
  } = tableInstance

  return (
    <div className="rounded-xl">
      {search && <Search onChange={setGlobalFilter} value={globalFilter} />}
      <table
        className="min-w-full divide-y divide-slate-800"
        {...getTableProps()}
      >
        <thead className="bg-slate-900">
          {// Loop over the header rows
            headerGroups.map(headerGroup => (
              // Apply the header row props
              <tr
                {...headerGroup.getHeaderGroupProps()}
              >
                {// Loop over the headers in each row
                  headerGroup.headers.map(column => {
                    console.log(column)

                    return (
                      // Apply the header cell props
                      <th
                        className="bg-slate-900 text-gray-100 hidden sm:table-cell sticky top-0 px-6 py-3 text-left text-xs font-bold  uppercase tracking-wider"
                        {...column.getHeaderProps(
                          // @ts-ignore
                          column.getSortByToggleProps()
                        )}
                      >
                        <div className="flex flex-row items-center justify-start">

                          {
                            // @ts-ignore
                            column.canFilter && column.render("Filter")
                          }
                          {column.render('Header')}
                          <span className="pl-2">
                            {
                              // @ts-ignore
                              column.isSorted
                                // @ts-ignore
                                ? column.isSortedDesc
                                  ? <FaSortAlphaUp />
                                  : <FaSortAlphaDown />
                                : ''}
                          </span>
                        </div>
                      </th>
                    )
                  })}
              </tr>
            ))}
        </thead>
        {/* Apply the table body props */}
        <tbody {...getTableBodyProps()}>
          {// Loop over the table rows
            rows.map(row => {
              // Prepare the row for display
              prepareRow(row)
              return (
                // Apply the row props
                <tr
                  className="even:bg-slate-900 cursor-pointer  block sm:table-row mb-6 sm:mb-0 rounded-sm sm:rounded-none group"
                  {...row.getRowProps()}
                >
                  {// Loop over the rows cells
                    row.cells.map(cell => {

                      // Apply the cell props
                      return (
                        <td
                          {...cell.getCellProps()}
                          className="px-6 py-2 sm:py-4 whitespace-nowrap text-sm font-medium block sm:table-cell border-b-2 sm:border-b-0 group-odd:border-slate-900 border-slate-800 text-gray-100"
                        >
                          <div className="flex justify-between">
                            <span className="sm:hidden text-gray-300 mr-2 text-xs">
                              {cell.column.Header}
                            </span>
                            <div className="text-right sm:text-left">
                              {cell.render('Cell')}
                            </div>
                          </div>
                        </td>

                      )
                    })}
                </tr>
              )
            })}
        </tbody>
      </table>
    </div>
  )

}
