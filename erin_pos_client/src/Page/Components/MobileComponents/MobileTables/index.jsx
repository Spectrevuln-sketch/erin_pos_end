import React from 'react';
import ReactTable, { useGlobalFilter, useSortBy, useTable, usePagination } from "react-table";
import { useLocation } from 'react-router-dom';
import {
    SearchFilters
} from '../../../Components';
import {
    DropDownData,
    InputTable
} from '../../Atoms';


const MobileTables = ({ title, data, column, tableHooks, enableDropDown, DataDrop, OnChangeDropdown, DateInput, onChangeDate }) => {
    let Location = useLocation();

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
        <div className="card">
            <div class="card-header">
                <SearchFilters
                    preGlobalFilteredRows={preGlobalFilteredRows}
                    setGlobalFilter={setGlobalFilter}
                    globalFilter={state.globalFilter}
                    countRow={pageOptions}
                />
            </div>
            <div className="card-body">
                <div className='grid content-center grid-cols-4'>
                    <table className="table m-0 text-center border-2 table-auto" {...getTableProps()}>
                        <thead className="text-center capitalize border-2 whitespace-nowrap"
                            style={{
                                fontSize: '10px',
                                fontWeight: 'bolder',
                            }}>
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
                        <tbody  {...getTableBodyProps()}>
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
            </div>
            <div class="card-footer text-muted">
                <div>
                    <div className="col-sm-12 col-md-5">
                        <div
                            className="dataTables_info"
                            id="example1_info"
                            role="status"
                            aria-live="polite"
                        >
                            Page{' '}
                            <strong>
                                {pageIndex + 1} of {pageOptions.length}
                            </strong>{' '}
                            <span>
                                | Go to page:{' '}
                                <input
                                    className='border-2'
                                    type="number"
                                    defaultValue={pageIndex + 1}
                                    onChange={e => {
                                        const page = e.target.value ? Number(e.target.value) - 1 : 0
                                        gotoPage(page)
                                    }}
                                    style={{ width: '50px' }}
                                />
                            </span>{' '}
                        </div>

                    </div>
                    <div className="col-sm-12 col-md-7">
                        <div
                            className="dataTables_paginate paging_simple_numbers"
                            id="example1_paginate"
                        >
                            <ul className="pagination">
                                <li
                                    className="paginate_button page-item previous disabled"
                                    id="example1_previous"
                                >
                                    <button
                                        aria-controls="example1"
                                        data-dt-idx={0}
                                        tabIndex={0}
                                        className="page-link d-inline-block"
                                        onClick={() => gotoPage(0)} disabled={!canPreviousPage}
                                    >
                                        {'<<'}
                                    </button>
                                    <button
                                        aria-controls="example1"
                                        data-dt-idx={0}
                                        tabIndex={0}
                                        className="page-link d-inline-block"
                                        onClick={() => previousPage()} disabled={!canPreviousPage}
                                    >
                                        {'<'}
                                    </button>
                                </li>

                                <li className="paginate_button page-item next" id="example1_next">
                                    <button
                                        href="#"
                                        aria-controls="example1"
                                        data-dt-idx={7}
                                        tabIndex={0}
                                        className="page-link d-inline-block"
                                        onClick={() => nextPage()} disabled={!canNextPage}
                                    >
                                        {'>'}
                                    </button>
                                    <button
                                        href="#"
                                        aria-controls="example1"
                                        data-dt-idx={7}
                                        tabIndex={0}
                                        className="page-link d-inline-block"
                                        onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}
                                    >
                                        {'>>'}
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileTables;
