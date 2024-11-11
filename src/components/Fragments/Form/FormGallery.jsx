import Button from '@/components/Elements/Button';
import ImagePreview from '@/components/Elements/Image';
import useAxiosAuth from '@/hooks/useAxiosAuth'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react';
import { FaImage, FaImages } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { HiOutlineTrash } from "react-icons/hi";
import Caraousel from '../Caraousel/Caraousel';
import { toast } from 'react-toastify';


const FormGallery = ({ data }) => {
    const axiosAuth = useAxiosAuth()
    const queryClient = useQueryClient()

    const { mutate: uploadGambar } = useMutation({
        mutationFn: async (body) => {
            return await axiosAuth.post(`/api/v2/lapangan/${data.id}/gallery`, body, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries("fetch.gallery")
            document.getElementById("modalGalleryTambah").close()
            toast.success("Berhasil Upload", { style: { backgroundColor: "#00a96e" } })
        }
    })

    const formik = useFormik({
        initialValues: {
            picture: null
        },
        onSubmit: async (value) => {
            event.preventDefault()

            uploadGambar(value)
        }
    })

    const [image, setImage] = useState([])

    const handleFormikFile = (event) => {
        event.preventDefault()

        const formdata = new FormData()
        // setStoreImage(event.target.files.length)
        // for (let i = 0; i < event.target.files.length; i++) {
        //     // formdata.append("file", event.target.files[i])
        //     image.push(URL.createObjectURL(event.target.files[i]))
        // }

        formdata.append("file", event.target.files[0])
        // formik.setFieldValue(event.target.name, formdata.get("file"))
        uploadGambar({ picture: formdata.get("file") })

    }

    const handleDeleteFile = () => {
        // setImage([])
        // setStoreImage(0)
        formik.setFieldValue("picture", null)
    }
    return (
        <div className='flex flex-col gap-4 '>
            <form
                className='flex flex-col items-center justify-center'
                onClick={() => document.getElementById("file").click()}
                onSubmit={formik.handleSubmit}>

                <div className='flex flex-col min-w-96 min-h-72 items-center justify-center gap-2 border-2 hover:scale-105 transition-all border-dashed border-info rounded-md cursor-pointer'>
                    <FaImages color='gray' size={50} />
                    <h3 className='font-semibold text-lg' htmlFor="">Click to upload</h3>
                </div>
                <input
                    id='file'
                    className='w-fit'
                    type="file"
                    name="picture"
                    onChange={handleFormikFile}
                    accept='image/*'
                    hidden
                    multiple
                    draggable
                />
            </form >
            <div className='flex flex-col items-center justify-start gap-4'>
                {
                    image.length < 1 ? (
                        <div className='flex flex-col space-y-2 '>
                            {/* {
                                image.map((item, index) => (

                                ))
                            } */}
                            {/* <div className='inline-flex items-center justify-start gap-4 min-w-96 bg-blue-100 p-4 rounded-md'>
                                <FaImage color='blue' size={28} />
                                <div className='block w-full'>
                                    <div className='inline-flex items-center justify-center gap-x-4 w-full'>
                                        <label className='font-semibold w-full' htmlFor="">hakhsdkajsd.jpg</label>
                                        {
                                            isPercent ? <FaCheck color='blue' size={26} /> : <label  id='progress-label' className='ml-auto' htmlFor="">0</label>
                                        }
                                        
                                    </div>
                                <progress id='progress' className={`${isPercent ? "hidden" : "block"} progress progress-primary w-full`} value="0" max="100"></progress>
                                </div>
                                
                                <HiOutlineTrash className='cursor-pointer' color='red' size={26} onClick={handleDeleteFile} />
                            </div> */}
                        </div>

                    ) : null
                }
            </div>

        </div>
    )
}

export default FormGallery