import React from 'react'

const TextareaInput = ({name, className, placeholder, value, onChange}) => {
    return (
        <textarea name={name} className={`textarea textarea-bordered ${className}`} value={value} placeholder={placeholder} onChange={onChange}></textarea>
    )
}

export default TextareaInput