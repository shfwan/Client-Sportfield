import Button from '@/components/Elements/Button'
import InputForm from '@/components/Elements/Input'
import Textarea from '@/components/Elements/Textarea'
import { usePostLapangan, useUpdateLapangan } from '@/features/lapangan'
import { useQueryClient } from '@tanstack/react-query'
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const FormLapangan = ({ data, onClick, type = "create" }) => {    
    const router = useRouter()
    const queryClient = useQueryClient()

    const { mutate: createLapangan } = usePostLapangan({

        onSuccess: (res) => {
            localStorage.setItem("aWQ=", res.data.data.id)
            queryClient.invalidateQueries({ queryKey: ['fetch.detailLapangan'] })
            document.getElementById("lapanganCreate").close()
            window.location.reload()
        }
    })

    const { mutate: updateLapangan } = useUpdateLapangan({
        
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['fetch.detailLapangan', data.id] })
            document.getElementById("lapanganUpdate").close()
            router.push("/management")
        }
    })

    const formik = useFormik({
        initialValues: {
            name: data?.name || "",
            picture: data?.picture || "",
            description: data?.description || "",
            alamat: data?.address.alamat || "",
            mapUrl: data?.address.mapUrl || "",
            open: data?.open || "",
            close: data?.close || ""
        },

        onSubmit: async () => {
            event.preventDefault()

            if (type === "create") {
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
            } else if (type === "update") {
                updateLapangan({
                    id: data.id,
                    data: formik.values
                })
            }
        }
    })

    const handleFormikInput = (event) => {
        formik.setFieldValue(event.target.name, event.target.value)
    }

    return (
        <form className='w-fit' onSubmit={formik.handleSubmit} action="#">
            <div className="flex flex-col gap-4">
                <InputForm onChange={handleFormikInput} type="text" value={formik.values.name} title="Name" name="name" />
                {/* <input type="file" name="picture" id="" /> */}
                <Textarea name="description" title="Deskripsi" className="" placeholder="Deskripsi lapangan" onChange={handleFormikInput} />
                <InputForm onChange={handleFormikInput} type="text" value={formik.values.alamat} title="Alamat" name="alamat" />
                <InputForm onChange={handleFormikInput} type="text" value={formik.values.mapUrl} title="URL map" name="mapUrl" />
                <div className='inline-flex gap-2'>
                    <InputForm onChange={handleFormikInput} value={formik.values.open} type="time" title="Open" name="open" />
                    <InputForm onChange={handleFormikInput} value={formik.values.close} type="time" title="Close" name="close" />
                </div>
            </div>
            <div className="flex flex-col-reverse lg:flex-row gap-4 mt-5">
                <Button className="btn-error hidden lg:flex btn-wide" type="button" onClick={onClick}>Cancel</Button>
                <Button className={`lg:btn-wide ${type === "update" ? "btn-warning" : "btn-success"}`} type="submit">{type === "update" ? "Ubah" : "Tambah"}</Button>
            </div>
        </form>
    )
}

export default FormLapangan