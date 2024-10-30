import React, { createContext, useContext } from 'react'

const RadioContext = createContext()

export const RadioButton = ({ className, children, dateDay, index, ...props }) => {
    const { value, onChange } = useContext(RadioContext)    

    console.log(props.value, value);
    
    
    return (
        <label className={`btn min-w-28 p-2 h-full btn-outline border-gray-400 hover:bg-transparent hover:shadow-md ${value == props.value ? "bg-success/10 text-white border-success" : ""}`}>
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
