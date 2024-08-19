const CardLapanganSkeleton = () => {
    return (
        <div className='card shadow-lg w-[22rem] h-[26rem] border p-4 gap-4'>
            <div className='skeleton w-full h-52'></div>
            <div className='skeleton w-full h-6 rounded-md'></div>
            <div className='skeleton w-full h-16 rounded-md'></div>
            <div className='inline-flex justify-between'>
                <div className='skeleton w-48 h-8 rounded-md'></div>
                <div className='skeleton w-10 h-10 rounded-full'></div>
            </div>
        </div>
    )
}
export default CardLapanganSkeleton