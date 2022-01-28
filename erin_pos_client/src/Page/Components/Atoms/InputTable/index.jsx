import React from 'react'

const InputTable = ({ ...rest }) => {
    return (
        <div>
            <input className='p-2 lg:w-full sm:w-14 md:w-14 border-2 border-zinc-200 hover:ring-2 hover:ring-blue-200 rounded-full' {...rest} />
        </div>
    )
}

export default InputTable
