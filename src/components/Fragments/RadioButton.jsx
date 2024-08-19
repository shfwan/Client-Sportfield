import React, { createContext, useContext } from 'react'

const RadioContext = createContext()

export const RadioButton = ({ className, children, dateDay, index, ...props }) => {
    const { value, onChange } = useContext(RadioContext)
    
    return (
        <label className={`btn btn-md btn-outline hover:bg-success hover:border-success ${value == props.value ? "bg-success text-white" : "text-success"}`}>
            <input className='hidden' type="radio" name="" checked={value == props.value} value={props.value} onChange={onChange} id="" {...props} />
            {children}
        </label>
    )
}

export const RadioGroup = ({ value, onChange, children }) => {
    return (
        <RadioContext.Provider value={{ value, onChange }}>
            {children}
        </RadioContext.Provider>
    )
}
