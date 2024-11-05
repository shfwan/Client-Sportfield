import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'react-feather'

const Caraousel = ({ className = "", maxWidth, children, autoSlide = true, autoSlideInterval = 0, indicator = true, nextPrev = true }) => {

    const [curr, setCurr] = useState(0)

    const prev = () => setCurr((curr) => (curr === 0 ? children.length - 1 : curr - 1))
    const next = () => setCurr((curr) => (curr === children.length - 1 ? 0 : curr + 1))

    useEffect(() => {
        if (!autoSlide) return
        const timer = setTimeout(next, autoSlideInterval)
        return () => clearTimeout(timer)
    })

    return (
        <>
            <div className={`margin-auto ${className}`}>
                <div className="overflow-x-hidden relative rounded-xl">
                    {/* Image */}
                    <div className="flex transition-transform ease-out duration-500 scroll-smooth w-full bg-gray-500" style={{ transform: `translateX(-${curr * 100}%)` }}>
                        {children}
                    </div>

                    {/* Button next & prev */}
                    <div className={`absolute inset-0 flex justify-between p-4 items-center ${nextPrev ? "visible" : "hidden"}`}>
                        <button className="text-white bg-opacity-50 bg-white h-fit rounded-full" onClick={prev}>
                            <ChevronLeft size={36} color='white' />
                        </button>
                        <button className="text-white bg-opacity-50 bg-white h-fit rounded-full" onClick={next}>
                            <ChevronRight size={36} color='white' />
                        </button>
                    </div>

                    {/* Indicator */}
                    <div className={`absolute bottom-4 right-0 left-0 text-black ${indicator ? "visible" : "hidden"}`}>
                        <div className='flex w-full items-center justify-center gap-2'>
                            {/* {
                                children.map((_, i) => (
                                    <span
                                        className={`cursor-pointer w-2 h-2 transition-all rounded-full bg-white ${curr === i ? "p-1" : "bg-opacity-50"}`}
                                        key={i}
                                        onClick={() => setCurr(i)}
                                    ></span>
                                ))
                            } */}
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Caraousel