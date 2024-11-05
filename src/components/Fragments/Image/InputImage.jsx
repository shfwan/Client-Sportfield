import React, { useEffect, useState } from 'react'
import FileInput from './FileInput'
import ImageCrop from './ImageCrop'
import ImagePreview from '@/components/Elements/Image'
import Button from '@/components/Elements/Button'
import ModalLayout from '@/components/Layouts/ModalLayout'

const InputImage = () => {
    const [image, setImage] = useState("")
    const [currentPage, setCurrentPage] = useState("choose-img")

    const [imageAfterCrop, setImageAfterCrop] = useState("")
    const onImageSelected = (image) => {
        setImage(image)
        setCurrentPage("crop-img")
    }

    const onCropDone = (imgCropArea) => {
        const canvas = document.createElement("canvas");

        canvas.width = imgCropArea.width
        canvas.height = imgCropArea.height

        const context = canvas.getContext("2d")

        // Load select img
        let imageObj = new Image()
        imageObj.src = image
        imageObj.onload = () => {
            // Draw crop img to canvas
            context.drawImage(
                imageObj,
                imgCropArea.x,
                imgCropArea.y,
                imgCropArea.width,
                imgCropArea.height,
                0,
                0,
                imgCropArea.width,
                imgCropArea.height
            )

            // Convert canvas to data URL(JPEG format)
            const dataUrl = canvas.toDataURL("image/jpeg")
            setImageAfterCrop(dataUrl)
            setCurrentPage("img-crop")
            
        }

    }

    useEffect(() => {
        if(currentPage == "crop-img") {
            document.getElementById("img").showModal()
        } else {
            // document.getElementById("img").showModal()
        }
    }, [currentPage])

    const onCropCancel = () => {
        setCurrentPage("choose-img")
        setImage("")
    }
    
    

    return (
        <div className='w-full h-full'>
            {currentPage === "choose-img" ? (
                <FileInput onImageSelected={onImageSelected} />
            ) : currentPage === "crop-img" ? (
                // <div className='p-4 bg-black w-full flex-[1_0_100%]'></div>
                <ModalLayout id="img">
                        <div className='w-[100vh] h-[100vh]'>
                            <ImageCrop
                                image={image}
                                onCropDone={onCropDone}
                                onCropCancel={onCropCancel}
                            />
                        </div>
                </ModalLayout>
            ) : (
                <div className='flex flex-col gap-4'>
                    <ImagePreview src={imageAfterCrop} />
                    <Button onClick={() => setCurrentPage("crop-img")}>Crop</Button>
                    <Button onClick={() => {
                        setCurrentPage("choose-img")
                        setImage("")
                    }}>New Image</Button>
                </div>
            )}
        </div>
    )
}

export default InputImage