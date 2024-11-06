import { useState } from 'react'
import Avatar from 'react-avatar-edit'
import { useFormik } from 'formik'
import ImagePreview from '@/components/Elements/Image'
import ModalLayout from '@/components/Layouts/ModalLayout'
import Button from '@/components/Elements/Button'

const EditPhotoProfil = ({ state }) => {
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
    console.log("asd");
    
    try {
      const formData = new FormData()
      formData.append("file", formik.values.image)
      setStoreImage([...storeImage, { imgCrop }])
      console.log(storeImage);
      
      setOpen(false)
      document.getElementById('changeImage').close()
    } catch (error) {
      console.error(error);
    }
    
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
        <img
          className='w-64 h-64 rounded-full object-cover '
          src={process.env.NEXT_PUBLIC_API + "/api/v1/user/picture/" + imgCrop}
          onClick={() => document.getElementById('changeImage').showModal()}
        />
        <ModalLayout id='changeImage' title="Ubah Photo" >
          <div className='block space-y-4'>
            <Avatar width={500} height={295} onClose={onClose} onCrop={onCrop} onImageLoad={(e) => { console.log(e.target); }} />
            <Button onClick={saveImage} className='btn-success text-white btn-wide'>Save</Button>
          </div>
        </ModalLayout>
      </div>
    </div>
  )
}

export default EditPhotoProfil