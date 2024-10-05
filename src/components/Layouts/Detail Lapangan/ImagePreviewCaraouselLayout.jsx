import ImagePreview from '@/components/Elements/Image'
import Caraousel from '@/components/Fragments/Caraousel/Caraousel'
import { useState } from 'react'
import ModalLayout from '../ModalLayout'
import CaraouselModalPreview from '@/components/Fragments/Caraousel/CaraouselModalPreview'
import { ArrowLeft, Image } from 'react-feather'
import { faker } from '@faker-js/faker'
import GalleryMasonryLayout from '../GalleryMasonryLayout'

const ImagePreviewCaraouselLayout = () => {

    const slides = [
        faker.image.url().toString(),
        faker.image.url().toString(),
        faker.image.url().toString(),
    ]

    const [isPreview, setIsPreview] = useState(false)

    const handleModal = () => {
        if (isPreview) {
            setIsPreview(!isPreview)
        } else {
            document.getElementById("modalCarauoselImagePreview").close()
        }
    }

    return (
        <div className="relative">
            <Caraousel className='max-2xl:' autoSlideInterval={3000} maxWidth={"200rem"} >
                {
                    slides.map((item, i) => (
                        <ImagePreview
                            className="flex-[1_0_100%] object-cover snap-start"
                            key={i}
                            src={item}
                            alt="Shoes" />
                    ))
                }
            </Caraousel>
            {/* Full image preview */}
            <div className='absolute bottom-2 right-2 cursor-pointer' onClick={() => document.getElementById("modalCarauoselImagePreview").showModal()}>
                <div className='p-2 rounded-md bg-opacity-50 bg-white'>
                    <Image color='white' />
                </div>
            </div>
            {/* Modal preview image */}
            <ModalLayout id="modalCarauoselImagePreview" title="Gallery" className="bg-white/50 flex flex-col gap-4" onClick={handleModal}>
                <div className=''>
                    {
                        isPreview ? (
                            <div className="min-w-[60rem] min-h-full">
                                
                                <CaraouselModalPreview className='max-w-[60rem]'>
                                    
                                    {
                                        slides.map((item, i) => (
                                            <ImagePreview
                                                className="rounded-md"
                                                key={i}
                                                src={item.toString()}
                                                alt="Image" />
                                        ))
                                    }
                                </CaraouselModalPreview>
                            </div>
                        ) : (

                            <GalleryMasonryLayout>
                                {
                                    slides.map((item, index) => (
                                        <figure className='bg-gray-200 break-inside-avoid ' key={index} onClick={() => setIsPreview(!isPreview)}>
                                            <img className='rounded-md flex-[1_0_100%]' src={item.toString()} alt="Image" loading='lazy' />
                                        </figure>
                                    ))
                                }
                            </GalleryMasonryLayout>
                        )
                    }
                </div>
            </ModalLayout>
        </div>
    )
}

export default ImagePreviewCaraouselLayout