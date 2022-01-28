import React from 'react';
import ReactTable, { useGlobalFilter, useSortBy, useTable, usePagination } from "react-table";
import { useLocation } from 'react-router-dom';
import {
    SearchFilters
} from '../../../Components';

const ResponsiveTable = ({ title, data, column, tableHooks, enableDropDown, DataDrop, OnChangeDropdown, DateInput, onChangeDate }) => {



    /** Table Instance */
    const tableInstance = useTable(
        {
            columns: column,
            data: data,

            initialState: {
                hiddenColumns: ["_id", "uuid", "log_stok"]
            }
        },
        useGlobalFilter,
        useSortBy,
        usePagination,
        tableHooks ? tableHooks : ""
    );
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        preGlobalFilteredRows,
        setGlobalFilter,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state,
    } = tableInstance

    const { pageIndex, pageSize } = state

    /** End  Table Instance */
    return (
        <div className='flex flex-col'>
            <div className='flex flex-row'>
                <SearchFilters
                    preGlobalFilteredRows={preGlobalFilteredRows}
                    setGlobalFilter={setGlobalFilter}
                    globalFilter={state.globalFilter}
                    countRow={pageOptions}
                />
            </div>


            <table className="mx-auto table-auto"  {...getTableProps()}>
                <thead className='border-2'>
                    {headerGroups.map((headerGroup) => (
                        <tr  {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th  {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render("Header")}
                                    {column.isSorted ? (column.isSortedDesc ? " ▼" : " ▲") : ""}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row, idx) => {
                        prepareRow(row);
                        return (

                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell, idx) => (

                                    <td {...cell.getCellProps()}>

                                        {cell.isAggregated
                                            ?
                                            cell.render("Aggregated")
                                            : cell.isPlaceholder
                                                ? null
                                                :
                                                cell.render("Cell")}
                                        {/* {cell.render("Cell")} */}
                                    </td>
                                ))}
                            </tr>
                        )
                    })}
                </tbody>
            </table>

        </div>
    );
};

export default ResponsiveTable;
