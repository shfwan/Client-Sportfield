import React from 'react'

const Select = ({ id, name, children, value, onChange }) => {
    return (
        <select id={id} name={name} defaultValue={value} onChange={onChange} className='select select-bordered w-full max-w-xs'>
            <option disabled value="Pilih">Pilih</option>
            {children}
        </select>
    )
}

export default Select