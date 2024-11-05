"use client"

import CardLapangan from '@/components/Fragments/Card/CardLapangan/CardLapangan'
import { faker } from '@faker-js/faker'
import CardLapanganSkeleton from '../../Fragments/Card/CardLapangan/CardLapanganSkeleton'
import { Heart } from 'react-feather'
import ImagePreview from '@/components/Elements/Image'
import { useFetchLapangan } from '@/features/lapangan'
import Link from 'next/link'
import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Pagination from '@/components/Fragments/Form/Pagination'
import EmptyData from '@/components/Fragments/EmptyData'
import { ToRupiah } from '@/lib/toRupiah'
import { GiShuttlecock } from "react-icons/gi"
import { BsPinMap } from "react-icons/bs";

const LapanganLayout = () => {
    const query = useSearchParams()

    const { data: lapangan, isLoading, refetch: refetchLapangan } = useFetchLapangan(parseInt(query.get("page")) || 1, 10, query.get("value") || "")

    useEffect(() => {
        refetchLapangan()
    }, [query.get("page"), query.get("value")])


    const renderLapangan = () => {
        return lapangan?.data.data.lapangan?.map((item, index) => {
            const replaceName = item.name.replace(" ", "_")

            // const [isLiked, setLiked] = useState(false)
            return (
                <div className='relative hover:scale-[101%]' key={index}>
                    <Link
                        href={
                            {
                                pathname: `/lapangan/${replaceName}`,
                                query: { id: item.id }
                            }
                        }
                    >
                        {/* <CardLapangan className="cursor-pointer">
                            <CardLapangan.Header>
                                <figure>
                                    <img
                                        src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                                        alt="Shoes" />
                                </figure>
                            </CardLapangan.Header>
                            <CardLapangan.Body className="card-body">
                                <h3 className="card-title text-ellipsis overflow-hidden text-nowrap text-lg font-bold">{item.name}</h3>
                                <p>{item.description}</p>
                            </CardLapangan.Body>
                            <CardLapangan.Footer />
                        </CardLapangan> */}
                        <div className="card bg-base-100 w-96 shadow-lg">
                            <figure className='min-h-72 max-h-72 bg-gray-400'>
                                <img
                                    src={process.env.NEXT_PUBLIC_API + "/api/v1/user/picture/" + item.picture}
                                    alt={item.name} />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{item.name}</h2>

                                <h3 className='text-ellipsis overflow-hidden text-nowrap text-base text-gray-700'>{item.alamat}</h3>
                                <div className='block w-full'>
                                    <span className='inline-flex gap-2'>
                                        <GiShuttlecock color='#9ca3af' size={20} className='-rotate-[140deg] ' />
                                        <h5 className='text-sm text-gray-400'>{item.detailsLapangan[0].type}</h5>
                                    </span>
                                    <h4 className='font-semibold text-base'>{ToRupiah(item.detailsLapangan[0].price)} / sesi</h4>
                                </div>
                                <div className="card-actions justify-end">
                                    {/* <button className="btn btn-primary">Buy Now</button> */}
                                </div>
                            </div>
                        </div>
                    </Link>
                    {/* <div className='absolute bottom-0 right-4 h-16 w-16'>
                            <span className='btn btn-ghost rounded-full w-fit'>
                                <Heart className='rounded-md' radius="10rem" size={36} fill={isLiked ? "red" : "#f6f6f6"} color='none' onClick={() => setLiked(!isLiked)} />
                            </span>
                        </div> */}
                </div>
            )
        })
    }

    const renderSkeletonLapangan = () => {
        return Array.from({ length: 10 }).map((_, i) => (
            <CardLapanganSkeleton key={i} />
        ))
    }

    return (
        <div className='flex w-full h-fit flex-col items-center justify-between text-black gap-y-10'>
            <div className="grid grid-cols-1 gap-4 auto-rows-max sm:grid-cols-1 lg:grid-cols-3 md:grid-cols-2">
                {isLoading ? renderSkeletonLapangan() : lapangan?.data.data.lapangan.length > 0 ? renderLapangan() : (<EmptyData title="Lapangan tidak ada" />)}
            </div>

            {isLoading ? <span className='skeleton w-56'></span> : <Pagination item={lapangan?.data} />}

        </div>
    )
}

export default LapanganLayout