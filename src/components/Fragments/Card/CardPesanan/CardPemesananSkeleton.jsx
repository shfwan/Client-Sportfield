import React from 'react'

const CardPemesananSkeleton = () => {
    return (
        <div className='p-4 w-full h-24 border shadow grid grid-cols-5 gap-4 place-items-center'>
            <div className='inline-flex gap-4 w-full'>
                <span className='skeleton w-10 rounded-full h-8'></span>
                <span className='skeleton w-full rounded-full h-8'></span>
            </div>
            <span className='skeleton w-full rounded-full h-8'></span>
            <span className='skeleton w-full rounded-full h-8'></span>
            <span className='skeleton w-full rounded-full h-8'></span>
            <span className='skeleton w-full rounded-full h-8'></span>
        </div>
    )
}

export default CardPemesananSkeleton