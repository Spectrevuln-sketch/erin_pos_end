import React from 'react'

const InputGroup = ({ label, ...rest }) => {
    return (
        <div className="form-group row">
            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">{label}</label>
            <div className="col-sm-10">
                <input {...rest} id="inputEmail3" />
            </div>
        </div >
    )
}

export default InputGroup
