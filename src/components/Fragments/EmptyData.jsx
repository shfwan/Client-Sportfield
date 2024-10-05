import React from 'react'

const EmptyData = ({title}) => {
    return (
        <div className='h-full w-full  flex flex-col items-center justify-center max-w-96'>
            <img src='/empty.svg' width="100%" height="100%" />
            <label className='font-semibold text-3xl text-slate-700 -translate-y-10 whitespace-nowrap' htmlFor="">{title}</label>
        </div>
    )
}

export default EmptyData