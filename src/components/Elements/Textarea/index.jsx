import React from 'react'
import Label from '../Input/Label'
import TextareaInput from './TextareaInput'

const Textarea = ({name, title, className, placeholder, value, onChange}) => {
  return (
    <div className='flex flex-col gap-2'>
        <Label htmlFor={name}>{title}</Label>
        <TextareaInput name={name} className={className} value={value} onChange={onChange} placeholder={placeholder}/>
    </div>
  )
}

export default Textarea