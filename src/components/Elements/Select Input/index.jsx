import React from 'react'
import Label from '../Input/Label'
import Select from './Select'

const SelectInput = ({ name, title, children, value, onChange }) => {
    return (
        <div className='flex flex-col gap-2'>
            <Label htmlFor={name}>{title}</Label>
            <Select name={name} value={value} onChange={onChange}>
                {children}
            </Select>
        </div>
    )
}

export default SelectInput