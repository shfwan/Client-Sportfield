import React from 'react'

const Select = ({name, children, value, onChange }) => {
    return (
        <select name={name} value={value} onChange={onChange} className='select select-bordered w-full max-w-xs'>
            {children}
        </select>
    )
}

export default Select