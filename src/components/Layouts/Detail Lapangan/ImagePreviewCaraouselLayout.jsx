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
            <Caraousel className='max-w-7xl min-h-full:' autoSlideInterval={3000}>
                {
                    slides.map((item, i) => (
                        <ImagePreview
                            className="flex-[1_0_100%] snap-start"
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
                    <CaraouselModalPreview className='max-w-[60rem]' data={slides}>

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
            </ModalLayout>
        </div>
    )
}

export default ImagePreviewCaraouselLayout