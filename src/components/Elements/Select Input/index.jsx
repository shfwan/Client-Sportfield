import React from 'react'
import Label from '../Input/Label'
import Select from './Select'

const SelectInput = ({id, name, title, children, defaultValue, onChange }) => {
    return (
        <div className='flex flex-col gap-2'>
            <Label  htmlFor={name}>{title}</Label>
            <Select id={id} name={name} defaultValue={defaultValue} onChange={onChange}>
                {children}
            </Select>
        </div>
    )
}

export default SelectInput