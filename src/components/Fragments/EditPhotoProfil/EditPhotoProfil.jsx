import { useState } from 'react'
import Avatar from 'react-avatar-edit'
import { useFormik } from 'formik'
import ImagePreview from '@/components/Elements/Image'

const EditPhotoProfil = ({state}) => {
  const [isOpen, setOpen] = useState(false)
  const [imgCrop, setImgCrop] = useState(state)
  const [storeImage, setStoreImage] = useState([])

  const onCrop = (view) => {
    setImgCrop(view)
  }

  const onClose = () => {
    setImgCrop(null)
  }

  const saveImage = () => {
    setStoreImage([...storeImage, { imgCrop }])
    setOpen(false)
  }


  const profileImageShow = storeImage.map(item => item.imgCrop)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const formik = useFormik({
    initialValues: {
      image: storeImage
    },
    onSubmit: async () => {
      try {
        const formData = new FormData()
        formData.append("file", formik.values.image)
        setOpen(false)
      } catch (error) {
        console.error(error);
      }
    }
  })
  return (
    <div className='m-5 w-fit flex justify-center cursor-pointer hover:scale-[101%]'>
      <div>
        <ImagePreview
          className='w-64 h-64 rounded-full object-cover '
          src={process.env.NEXT_PUBLIC_API + "/api/v1/user/picture/" + imgCrop}
          onClick={() => document.getElementById('my_modal_1').showModal()}
        />
        <dialog id='my_modal_1' className='modal'>
          <div className='modal-box w-fit'>
            <Avatar width={390} height={295} onClose={onClose} onCrop={onCrop} onImageLoad={(e) => {console.log(e.target);}}/>
            <form method='dialog'>
              <button onClick={saveImage} className='bg-success my-3 w-full text-white p-2 text-lg rounded-md'>Save</button>
            </form>
          </div>
        </dialog>
      </div>
    </div>
  )
}

export default EditPhotoProfil