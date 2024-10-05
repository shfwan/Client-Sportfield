import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'react-feather'

const CaraouselModalPreview = ({ className, children, indicator = true, data }) => {
    const [curr, setCurr] = useState(0)

    const prev = () => setCurr((curr) => (curr === 0 ? data.length - 1 : curr - 1))
    const next = () => setCurr((curr) => (curr === data.length - 1 ? 0 : curr + 1))


    return (
        <div className={`${className} margin-auto`}>
            <div className="overflow-x-hidden relative aspect-auto rounded-xl flex gap-4 flex-col">
                {/* Image */}
                <figure className="flex transition-transform ease-out duration-500 snap-mandatory scroll-smooth" style={{ transform: `translateX(-${curr * 100}%)` }}>
                    {children}
                </figure>

                {/* Button next & prev */}
                <div className={`absolute inset-0 flex justify-between p-4 items-center lg:mb-24 ${className}`}>
                    <button className="bg-opacity-50 bg-white h-fit rounded-full" onClick={prev}>
                        <ChevronLeft size={36} color='white' />
                    </button>
                    <button className="bg-opacity-50 bg-white h-fit rounded-full" onClick={next}>
                        <ChevronRight size={36} color='white' />
                    </button>
                </div>

                {/* Indicator */}
                {/* <div className={`p-2 overflow-x-scroll absolute bottom-0 opacity-0 hover:opacity-100 transition-opacity ease-linear delay-100 bg-black/55 w-full ${indicator ? "visible" : "hidden"}`}>
                    <div className='max-w-64'>
                        <div className='relative aspect-auto '>
                            <figure className="flex transition-transform ease-out duration-500 gap-x-2">
                                {
                                    children.map((item, i) => {
                                        return (
                                            <div key={i} className='cursor-pointer hover:scale-[101%] transition-all ease-in-out' onClick={() => setCurr(i)}>
                                                {item}
                                            </div>
                                        )
                                    })
                                }
                            </figure>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default CaraouselModalPreview