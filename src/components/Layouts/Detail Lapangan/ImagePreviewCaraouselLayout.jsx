import ImagePreview from '@/components/Elements/Image'
import Caraousel from '@/components/Fragments/Caraousel/Caraousel'
import { useState } from 'react'
import ModalLayout from '../ModalLayout'
import CaraouselModalPreview from '@/components/Fragments/Caraousel/CaraouselModalPreview'
import { Image } from 'react-feather'
import { faker } from '@faker-js/faker'

const ImagePreviewCaraouselLayout = () => {

    const slides = [
        faker.image.url().toString(),
        faker.image.url().toString(),
        faker.image.url().toString(),
    ]

    const [isPreview, setPreview] = useState(false)

    return (
        <div className="relative">
            <Caraousel autoSlideInterval={3000} maxWidth={"200rem"} >
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
            <div className='absolute bottom-2 right-2 cursor-pointer' onClick={() => setPreview(!isPreview)}>
                <div className='p-2 rounded-md bg-opacity-50 bg-white'>
                    <Image color='white' />
                </div>
            </div>
            {/* Modal preview image */}
            <ModalLayout className="bg-white/50 flex flex-col gap-4" open={isPreview} onClick={() => setPreview(!isPreview)}>
                <div className="relative">
                    <CaraouselModalPreview maxWidth={"48rem"} >
                        {
                            slides.map((item, i) => (
                                <ImagePreview
                                    className="flex-[1_0_100%] object-cover snap-start rounded"
                                    key={i}
                                    src={item.toString()}
                                    alt="Shoes" />
                            ))
                        }
                    </CaraouselModalPreview>
                </div>
            </ModalLayout>
        </div>
    )
}

export default ImagePreviewCaraouselLayout