import Button from '@/components/Elements/Button'
import React, { useRef } from 'react'

const FileInput = ({ onImageSelected }) => {
    const inputRef = useRef()
    const handleOnChange = (e) => {
        if(e.target.files && e.target.files.length > 0 ) {
            const reader = new FileReader()

            reader.readAsDataURL(e.target.files[0])
            reader.onload = () => {
                onImageSelected(reader.result)
            }
        }
    }

    const onChosseImg = () => {
        inputRef.current.click()
    }
    return (
        <div className='file-input w-full max-w-xs'>
            <input type="file" name="picture" id="" onChange={handleOnChange} ref={inputRef} className='' />
            <Button className="btn-info text-white">
                Select File
            </Button>
        </div>
    )
}

export default FileInput