import React from 'react'
// import NotFound from "@/assets/icon/png/404.png"
import Image from 'next/image'
const ErrorPage = () => {
    return (
        <div className='h-full w-full  flex items-center justify-center'>
            <img className='aspect-square' width="40%" height="40%" src="/404.png" alt="Not Found" />
        </div>
    )
}

export default ErrorPage