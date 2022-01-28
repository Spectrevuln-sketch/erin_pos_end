import React, { useState, useMemo, useEffect, useContext } from 'react'
import ReactTable, { useGlobalFilter, useSortBy, useTable, usePagination } from "react-table";
import { useLocation } from 'react-router-dom';
import {
    SearchFilters
} from '../../../Components';
import {
    DropDownData,
    InputTable
} from '../../Atoms';



const Tables = ({ title, data, column, tableHooks, enableDropDown, DataDrop, OnChangeDropdown, DateInput, onChangeDate }) => {
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
        <section className="h-full mt-4 antialiased text-gray-600">
            <div className="flex flex-col justify-center h-full">
                {/* Table */}
                <div className="mx-auto bg-white border border-gray-200 rounded-sm shadow-lg lg:w-full sm:w-screen md:w-screen">
                    <header className="flex flex-row items-center justify-between h-20 px-5 py-4 capitalize border-b border-gray-100">
                        {/* Konter Data */}
                        {enableDropDown === true && (
                            <DropDownData title="Kirim Ke ...." onChange={OnChangeDropdown}>
                                {DataDrop}
                            </DropDownData>
                        )}
                        {/* End Konter Data */}
                        {/* Search */}
                        <SearchFilters
                            preGlobalFilteredRows={preGlobalFilteredRows}
                            setGlobalFilter={setGlobalFilter}
                            globalFilter={state.globalFilter}
                            countRow={pageOptions}
                        />
                        {/* End Search */}
                        {/* Tanggal */}
                        {DateInput && (

                            <InputTable type="date" onChange={onChangeDate} />
                        )}
                        {/* End Tanggal */}
                    </header>
                    <div className="p-3 ">
                        <div className="overflow-x-auto">
                            {data && (


                                <table className="table m-0 text-center border-2" {...getTableProps()}>
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
                            )}
                            <div className="mt-2 row">
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
                </div>
            </div>
        </section>
    )
}

export default Tables
