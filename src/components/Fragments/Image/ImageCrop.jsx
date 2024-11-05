import Button from '@/components/Elements/Button'
import React, { useState } from 'react'
import Cropper from 'react-easy-crop'

const ImageCrop = ({ image, onCropDone, onCropCancel }) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)

    const [cropArea, setCropArea] = useState(null)
    const [aspectRatio, setAspectRatio] = useState(4 / 3)

    const onCropComplete = (cropAreaPercent, cropAreaPixels) => {
        setCropArea(cropAreaPixels)
    }

    const onAspectRatioChange = (e) => {
        setAspectRatio(e.targe.value)
    }


    return (
        <div className='flex flex-col w-full h-full'>
            <Cropper
                image={image}
                crop={crop}
                zoom={zoom}
                aspect={aspectRatio}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
                style={{ 
                    containerStyle: {
                        width: "100%",
                        height: "80%",
                        backgroundColor: "#fff"
                    }
                 }}
            />
            
            <div className='inline-flex gap-4' onChange={onAspectRatioChange}>
                <input type='radio' value={16 / 9} name='ratio' /> 16:9
                <input type='radio' value={16 / 9} name='ratio' /> 16:9
                <input type='radio' value={16 / 9} name='ratio' /> 16:9
                <input type='radio' value={16 / 9} name='ratio' /> 16:9
                <input type='radio' value={16 / 9} name='ratio' /> 16:9
            </div>
            <div className='w-full inline-flex gap-4'>
                <Button className="btn-error" onClick={onCropCancel}>Cancel</Button>
                <Button className="btn-error" onClick={() => {
                    onCropDone(cropArea)
                }}>Crop & aply</Button>
            </div>
        </div>
    )
}

export default ImageCrop