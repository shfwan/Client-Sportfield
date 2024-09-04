import React from 'react'

const InternalServerError = () => {
    return (
        <div className='h-full w-full  flex items-center justify-center'>
            <img className='aspect-square' width="40%" height="40%" src="/500.svg" alt="Not Found" />
        </div>
    )
}

export default InternalServerError