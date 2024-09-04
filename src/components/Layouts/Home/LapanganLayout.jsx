"use client"

import CardLapangan from '@/components/Fragments/CardLapangan/CardLapangan'
import { faker } from '@faker-js/faker'
import CardLapanganSkeleton from '../../Fragments/CardLapangan/CardLapanganSkeleton'
import { Heart } from 'react-feather'
import ImagePreview from '@/components/Elements/Image'
import { useFetchLapangan } from '@/features/lapangan'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Button from '@/components/Elements/Button'
import ModalLayout from '../ModalLayout'
import FormLapangan from '@/components/Fragments/Form/FormLapangan'
import Pagination from '@/components/Fragments/Form/Pagination'

const LapanganLayout = () => {
    const query = useSearchParams()
    const [add, setAdd] = useState(false)

    const { data: lapangan, isLoading, refetch: refetchLapangan } = useFetchLapangan(parseInt(query.get("page")) || 1, 5, query.get("value") || "")

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
                        <CardLapangan className=" w-[22rem] h-[26rem] cursor-pointer">
                            <CardLapangan.Header>
                                <figure>
                                    <ImagePreview
                                        src={faker.image.url()}
                                        alt="Shoes"
                                        loading="lazy"
                                    />
                                    {/* <Image
                                        src={`https://images.pexels.com/photos/47547/squirrel-animal-cute-rodents-47547.jpeg`}
                                        alt='card'
                                        width={100}
                                        height={100}
                                        className='transition-opacity opacity-0 duration-[2s]'
                                        onLoadingComplete={(image) => image.classList.remove('opacity-0')}
                                    /> */}
                                </figure>
                            </CardLapangan.Header>
                            <CardLapangan.Body className="card-body">
                                <label className="text-ellipsis overflow-hidden text-nowrap text-lg font-bold">{item.name}</label>
                                <p>{item.description}</p>
                            </CardLapangan.Body>
                            <CardLapangan.Footer />
                        </CardLapangan>
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
        <>
            <div className='flex w-full h-fit flex-col items-center justify-center text-black gap-y-10'>
                <Button className="btn-success" onClick={() => setAdd(!add)}>Tambah Lapangan</Button>
                <div className="grid gap-5 xl:grid-cols-3 md:grid-cols-2 h-fit">
                    {isLoading ? renderSkeletonLapangan() : renderLapangan()}
                </div>
                <Pagination item={lapangan?.data} />
            </div>
            <ModalLayout className="bg-white" open={add} onClick={() => setAdd(!add)}>
                <FormLapangan onClick={() => setAdd(!add)} />
            </ModalLayout>
        </>
    )
}

export default LapanganLayout