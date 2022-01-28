import React from 'react'

const DropDownData = ({ children, title, ...rest }) => {
    return (

        <div className="w-32 input-group">
            <select className="rounded-full w-28 custom-select text-zinc-400 focus:ring-2 focus:ring-orange-300" id="inputGroupSelect01" {...rest}>
                <option defaultValue="" selected>{title}</option>
                {children}

            </select>
        </div>

    )
}

export default DropDownData
