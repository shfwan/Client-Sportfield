import React, { createContext, useContext, useState } from 'react'


const CheckboxContext = createContext()
export const CheckboxButton = ({ children, onInput, value, isChecked, disabled, onChange = () => { } }) => {

    return (
        <label className={`btn ${disabled ? "btn-disabled" : ""} cursor-pointer btn-md btn-outline hover:bg-success hover:border-success ${isChecked ? "bg-success text-white" : "text-success"}`} >
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

