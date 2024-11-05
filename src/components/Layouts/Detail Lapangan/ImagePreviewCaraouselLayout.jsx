import ImagePreview from '@/components/Elements/Image'
import Caraousel from '@/components/Fragments/Caraousel/Caraousel'
import { useState } from 'react'
import ModalLayout from '../ModalLayout'
import CaraouselModalPreview from '@/components/Fragments/Caraousel/CaraouselModalPreview'
import { ArrowLeft, Image } from 'react-feather'
import { faker } from '@faker-js/faker'
import GalleryMasonryLayout from '../GalleryMasonryLayout'
import { useQuery } from '@tanstack/react-query'
import { axiosInstace } from '@/lib/axios'
import { useSearchParams } from 'next/navigation'
import CaraouselGallery from '@/components/Fragments/Caraousel/CaraouselGallery'
import ModalGalleryLayout from '../ModalGalleryLayout'

const ImagePreviewCaraouselLayout = () => {
    const state = useSearchParams()


    const { data: gallery, isLoading: galleryLoading } = useQuery({
        queryKey: ["fetch.gallery"],
        queryFn: async () => {
            return await axiosInstace.get(`/api/v1/lapangan/${state.get("id")}/gallery`)
        }
    })

    const [isPreview, setIsPreview] = useState(false)

    return (
        <div className="relative">
            <Caraousel className='max-w-7xl' autoSlideInterval={3000}>
                {
                    gallery?.data.data.map((item, i) => (
                        <figure className='min-w-full bg-gray-300'>
                            <img
                                className='rounded-sm flex-[1_0_100%] max-h-[790px] size-full place-self-center object-contain '
                                src={process.env.NEXT_PUBLIC_API + "/api/v1/lapangan/picture/" + item.filename}
                                alt={item.name}
                            />
                        </figure>
                    ))
                }
            </Caraousel>
            {/* Full image preview */}
            <div className='absolute bottom-2 right-2 cursor-pointer' onClick={() => document.getElementById("previewImage").showModal()}>
                <div className='p-2 rounded-md bg-opacity-50 bg-white'>
                    <Image color='white' />
                </div>
            </div>

            {/* Modal preview image */}
            <ModalGalleryLayout id="previewImage" title="Gallery" onClick={() => { !isPreview ? document.getElementById("previewImage").close() : setIsPreview(!isPreview) }}>
                {
                    !galleryLoading ? <CaraouselGallery data={gallery?.data.data}>
                        {
                            gallery?.data.data.map((item, index) => (
                                <figure className='min-w-full -translate-y-2 '>
                                    <img
                                        className='rounded-sm flex-[1_0_100%] max-h-[790px] size-full place-self-center object-contain '
                                        src={process.env.NEXT_PUBLIC_API + "/api/v1/lapangan/picture/" + item.filename}
                                        alt={item.name}
                                    />
                                </figure>
                            ))
                        }
                    </CaraouselGallery> : <></>
                }

            </ModalGalleryLayout>
        </div>
    )
}

export default ImagePreviewCaraouselLayout