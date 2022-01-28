import React, { useState } from 'react'
import { useAsyncDebounce } from "react-table";
const SearchFilters = ({ preGlobalFilteredRows, globalFilter, setGlobalFilter, countRow }) => {
    const count = preGlobalFilteredRows.length;
    const [value, setValue] = useState(globalFilter);
    const onChange = useAsyncDebounce((value) => {
        setGlobalFilter(value || undefined);
    }, 300);
    return (
        <>
            <div className='flex flex-row items-center justify-evenly'>
                <div id="example1_filter" className="mr-2 dataTables_filter">
                    <label className='flex flex-row items-center justify-center gap-2'>
                        <p>Search:</p>
                        <input
                            type="search"
                            className="h-8 p-2 text-sm form-control form-control-sm"
                            aria-controls="example1"
                            value={value || ""}
                            onChange={(e) => {
                                setValue(e.target.value);
                                onChange(e.target.value);
                            }}
                            placeholder={`Cari Disini...`}
                        />

                    </label>
                    <p>Total Data {count} Dari {countRow.length}</p>
                </div>
            </div>
        </>
    )
}

export default SearchFilters
