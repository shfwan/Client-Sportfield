import React from 'react'

const Text = ({ className, title, value, children }) => {
  return (
    <div className='inline-flex justify-between w-full'>
      <label className='text-black font-normal text-md' htmlFor={title}>{title}</label>
      <label className={`text-black font-normal text-md ${className}`} htmlFor={value}>{children}</label>
    </div>
  )
}

export default Text