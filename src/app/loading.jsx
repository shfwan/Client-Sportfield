"use client"

const loading = () => {

    return (
        <div className='bg-[#f8fafc] flex justify-center items-center w-screen h-screen top-0 z-50'>
            <div className='flex flex-col justify-center items-center gap-4'>
                <h1 className='font-extrabold text-4xl text-success tracking-wide'>Sportfield</h1>
                <span className="loading loading-spinner text-success loading-lg"></span>
            </div>
        </div>
    )
}

export default loading