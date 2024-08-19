import React from 'react'

const EmptyData = ({tittle}) => {
    return (
        <div className='h-full w-full  flex flex-col items-center justify-center'>
            <img src='/empty.svg' width="40%" height="40%" />
            <label className='font-semibold text-3xl text-slate-700 -translate-y-10' htmlFor="">{tittle}</label>
        </div>
    )
}

export default EmptyData