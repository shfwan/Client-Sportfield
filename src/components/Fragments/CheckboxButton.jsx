import React, { createContext, useContext, useState } from 'react'


const CheckboxContext = createContext()
export const CheckboxButton = ({ children, onInput, value, isChecked, disabled, onChange = () => { } }) => {

    return (
        <label
            className={`btn ${disabled ? "btn-disabled" : ""}
                rounded-md min-w-44 h-full cursor-pointer
                btn-md btn-outline border-gray-400
                hover:bg-transparent hover:border-gray-400 hover:text-current hover:shadow-md
                ${isChecked ? "bg-success/10 text-success border-success" : ""}
                `} >
            <input
                className="hidden"
                type="checkbox"
                defaultChecked={isChecked}
                value={value}
                onInput={onInput}
                onChange={onChange}
            />
            {children}
        </label>
    )
}

