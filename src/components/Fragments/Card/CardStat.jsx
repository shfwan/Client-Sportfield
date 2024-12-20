import React from 'react'

const CardStat = ({name, title, total, icon }) => {
    return (
        <div className='flex flex-col items-center justify-center w-full p-4 h-44 rounded-md shadow space-y-4 bg-white'>
            <div className="inline-flex justify-center items-center gap-4">
                {icon}
                <label className='font-semibold text-lg' htmlFor="">{title}</label>
            </div>
            <label className='font-medium text-lg' htmlFor={name}>{total}</label>
        </div>
    )
}

export default CardStat