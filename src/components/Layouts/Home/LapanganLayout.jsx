"use client"

import CardLapangan from '@/components/Fragments/CardLapangan/CardLapangan'
import { faker } from '@faker-js/faker'
import CardLapanganSkeleton from '../../Fragments/CardLapangan/CardLapanganSkeleton'
import { Heart } from 'react-feather'
import ImagePreview from '@/components/Elements/Image'
import { useFetchLapangan } from '@/features/lapangan'
import { useGetProfil } from '@/features/profil'
import { Router } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import { useSession } from 'next-auth/react'

const LapanganLayout = () => {


    const { data: lapangan, isLoading } = useFetchLapangan(
        {
            onError: (error) => {
                console.error(error)
            }
        }
    )

    

    // const [loading, setLoading] = useState(false)


    // useEffect(() => {
    //     // setTimeout(() => {
    //     //     setLoading(true)
    //     // }, 3000)
    // }, [])
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
                                query: {
                                    id: item.id
                                }
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

    const handlePagination = () => {
        const numberPage = []

        for (let i = 0; i < lapangan?.data.data.totalPage; i++) {
            numberPage.push(i + 1)
        }

        return (
            <div className="join">
                <button className={`join-item btn btn-outline ${lapangan?.data.data.prevPage ? "" : "btn-disabled"}`}>Back</button>
                {
                    numberPage.map((item, index) => (
                        <button key={index} className="join-item btn btn-outline">{item}</button>

                    ))
                }
                <button className={`join-item btn btn-outline ${lapangan?.data.data.nextPage ? "" : "btn-disabled"}`}>Next</button>
            </div>
        )
    }

    return (
        <div className='flex w-full h-fit flex-col items-center justify-center text-black gap-y-10'>
            <div className="grid gap-5 xl:grid-cols-3 md:grid-cols-2 h-fit">
                {isLoading ? renderSkeletonLapangan() : renderLapangan()}

            </div>
            {handlePagination()}
        </div>
    )
}

export default LapanganLayout