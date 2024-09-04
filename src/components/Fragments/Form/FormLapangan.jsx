import InputForm from '@/components/Elements/Input'
import Textarea from '@/components/Elements/Textarea'
import { usePostLapangan } from '@/features/lapangan'
import { useQueryClient } from '@tanstack/react-query'
import { useFormik } from 'formik'
import React, { useState } from 'react'

const FormLapangan = ({onClick}) => {
    const queryClient = useQueryClient()
    
    const { mutate: createLapangan } = usePostLapangan({
        onSuccess: () => {
            onClick
            queryClient.invalidateQueries({ queryKey: ['fetch.lapangan'] })
        }
    })

    const formik = useFormik({
        initialValues: {
            name: "",
            picture: "",
            description: "",
            alamat: "",
            mapUrl: "",
            open: "",
            close: ""
        },

        onSubmit: async () => {
            event.preventDefault()

            createLapangan({
                name: formik.values.name,
                picture: formik.values.picturex,
                description: formik.values.description,
                address: {
                    alamat: formik.values.alamat,
                    mapUrl: formik.values.mapUrl
                },
                open: formik.values.open,
                close: formik.values.close,
            })
        }
    })

    const handleFormikInput = (event) => {
        formik.setFieldValue(event.target.name, event.target.value)
    }
    return (
        <form onSubmit={formik.handleSubmit} action="#">
            <div className="flex flex-col gap-4">
                <InputForm onChange={handleFormikInput} type="text" title="Name" name="name" />
                {/* <input type="file" name="picture" id="" /> */}
                <Textarea name="description" title="Deskripsi" className="" placeholder="Deskripsi lapangan" onChange={handleFormikInput} />
                <InputForm onChange={handleFormikInput} type="text" title="Alamat" name="alamat" />
                <InputForm onChange={handleFormikInput} type="text" title="URL map" name="mapUrl" />
                <div className='inline-flex gap-2'>
                    <InputForm onChange={handleFormikInput} type="time" title="Open" name="open" />
                    <InputForm onChange={handleFormikInput} type="time" title="Close" name="close" />
                </div>
            </div>
            <div className="flex gap-4 mt-5">
                <button className="btn btn-wide btn-error font-semibold text-white text-lg" type="button" onClick={onClick}>Cancel</button>
                <button className="btn btn-wide btn-success font-semibold text-white text-lg" type="submit">Tambah</button>
            </div>
        </form>
    )
}

export default FormLapangan