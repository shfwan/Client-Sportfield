import ImagePreview from '@/components/Elements/Image'
import CardLapangan from '@/components/Fragments/CardLapangan/CardLapangan'
import CardLapanganSkeleton from '@/components/Fragments/CardLapangan/CardLapanganSkeleton'
import Search from '@/components/Fragments/Search'
import { useSearchLapangan } from '@/features/lapangan'
import { faker } from '@faker-js/faker'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const SearchPage = () => {
  const query = useSearchParams()  
  
  const [page, setPage] = useState(1)
  const { data: lapangan,isLoading, refetch: refetchLapangan } = useSearchLapangan(page, 10, query.get("value"))

  useEffect(() => {
    refetchLapangan()
  }, [page, query.get("value")])

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

  const renderPagination = () => {
    const numberPage = []

    for (let i = 0; i < lapangan?.data.data.totalPage; i++) {
      numberPage.push(i + 1)
    }

    const handleNextButton = () => {
      setPage(page + 1)
    }

    const handleBackButton = () => {
      if (page > 1) {
        setPage(page - 1)
      }
    }

    return (
      <div className="join">
        <button className={`join-item btn btn-outline ${lapangan?.data.data.prevPage ? "" : "btn-disabled"}`} onClick={handleBackButton}>Back</button>
        {
          numberPage.map((item, index) => (
            <button key={index} className="join-item btn btn-outline">{item}</button>
          ))
        }
        <button className={`join-item btn btn-outline ${lapangan?.data.data.nextPage ? "" : ""}`} onClick={handleNextButton}>Next</button>
      </div>
    )
  }

  return (
    <main className='flex flex-col'>
      <Search/>
      <div className='flex w-full h-fit flex-col items-center justify-center text-black gap-y-10'>
        <div className="grid gap-5 xl:grid-cols-3 md:grid-cols-2 h-fit">
          {isLoading ? renderSkeletonLapangan() : renderLapangan()}

        </div>
        {renderPagination()}
      </div>
    </main>
  )
}

export default SearchPage