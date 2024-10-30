import Button from '@/components/Elements/Button'
import InputForm from '@/components/Elements/Input'
import SelectInput from '@/components/Elements/Select Input'
import Textarea from '@/components/Elements/Textarea'
import { usePostLapanganTersedia, useUpdateLapanganTersedia } from '@/features/detailLapangan'
import { socketInstance } from '@/lib/socket'
import { useQueryClient } from '@tanstack/react-query'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import * as yup from 'yup'

const FormLapanganTersedia = ({ id, jam, data, type = "create", onClick }) => {
    const queryClient = useQueryClient()
    const [isJamOption, setIsJamOption] = useState(false)


    const { mutate: createLapanganTersedia } = usePostLapanganTersedia({
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['fetch.ListLapanganTersedia'] })
            socketInstance.emit("send_refreshLapanganTersedia")
            document.getElementById("lapanganTersediaCreate").close()
            toast.success("Lapangan Berhasil ditambahkan", { style: { backgroundColor: "#00a96e" } })
        },
        onError: () => {
            document.getElementById("lapanganTersediaCreate").close()
            toast.error("Lapangan Gagal ditambahkan", { style: { backgroundColor: "#ff5861" } })
        }
    })

    const { mutate: updateLapanganTersedia } = useUpdateLapanganTersedia({
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['fetch.ListLapanganTersedia'] })
            document.getElementById("lapanganTersediaUpdate" + data?.id).close()
            toast.success("Lapangan Berhasil diEdit", { style: { backgroundColor: "#00a96e" } })
        },
        onError: () => {
            document.getElementById("lapanganTersediaUpdate" + data?.id).close()
            toast.error("Lapangan Gagal di Ubah", { style: { backgroundColor: "#ff5861" } })
        }
    })

    const formik = useFormik({

        initialValues: {
            name: data?.name || "",
            picture: data?.picture || "",
            description: data?.description || "",
            statusLapangan: data?.statusLapangan || "Pilih",
            type: data?.type || "Pilih",
            price: data?.price || "",
            open: "",
            close: ""
        },
        onSubmit: async (value) => {
            event.preventDefault()

            formik.values.open = !isJamOption ? jam.open : formik.values.open
            formik.values.close = !isJamOption ? jam.close : formik.values.close

            if (type === "create") {
                createLapanganTersedia({
                    id: id,
                    name: value.name,
                    picture: value.picture,
                    description: value.description,
                    statusLapangan: value.statusLapangan,
                    type: value.type,
                    price: parseInt(value.price),
                    open: value.open,
                    close: value.close
                })

                formik.values.name = ""
                formik.values.description = ""
                formik.values.statusLapangan = ""
                formik.values.type = ""
                formik.values.price = ""

            } else if (type === "update") {
                updateLapanganTersedia({
                    id: data?.id,
                    lapanganId: data?.lapanganId,
                    data: value
                })
            }

        },
        validationSchema: yup.object().shape({
            name: yup.string().required(),
            description: yup.string().optional(),
            statusLapangan: yup.string().required(),
            type: yup.string().required(),
            price: yup.number().required(),
        })
    })

    const handleFormikInput = () => {
        formik.setFieldValue(event.target.name, event.target.value)
    }

    const handleJamOption = (event) => {
        if (event.target.value === "Gunakan jam yang sudah ada") {
            setIsJamOption(false)
        } else if (event.target.value === "Buat jam untuk lapangan ini") {
            setIsJamOption(true)
        } else {
            setIsJamOption(false)
        }
    }

    const handleFormikFile = (event) => {
        const formdata = new FormData()

        formdata.append("file", event.target.files[0])
        formik.setFieldValue(event.target.name, formdata.get("file"))
    }


    return (
        <form id={type} onSubmit={formik.handleSubmit} method='dialog'>
            <div className="flex flex-col gap-4">
                <InputForm value={formik.values.name} onChange={handleFormikInput} type="text" title="Name" name="name" isInvalid={formik.errors.name} />
                <input type="file" name="picture" id="" onChange={handleFormikFile} className='file-input w-full max-w-xs' />
                <Textarea value={formik.values.description} name="description" title="Deskripsi" className="" placeholder="Deskripsi lapangan" onChange={handleFormikInput} />
                <div className="flex gap-4">
                    <SelectInput id={type} defaultValue={formik.values.statusLapangan} name="statusLapangan" title="Status Lapangan" onChange={handleFormikInput}>
                        <option>Indoor</option>
                        <option>Outdoor</option>
                    </SelectInput>
                    <SelectInput defaultValue={formik.values.type} name="type" title="Type" onChange={handleFormikInput}>
                        <option>Badminton</option>
                        <option>Futsal</option>
                    </SelectInput>
                </div>
                <SelectInput name="jam" title="Jam" onChange={handleJamOption}>
                    <option>Gunakan jam yang sudah ada</option>
                    <option>Buat jam untuk lapangan ini</option>
                </SelectInput>
                {
                    isJamOption ? (
                        <div className='inline-flex gap-2'>
                            <InputForm onChange={handleFormikInput} value={formik.values.open} type="time" title="Open" name="open" />
                            <InputForm onChange={handleFormikInput} value={formik.values.close} type="time" title="Close" name="close" />
                        </div>
                    ) : <></>
                }

                <InputForm value={formik.values.price} onChange={handleFormikInput} type="number" title="Price" name="price" isInvalid={formik.errors.price} />
            </div>
            <div className="flex gap-4 mt-5">
                <Button className="text-white btn-wide hidden lg:flex btn-error" onClick={onClick}>Cancel</Button>
                <Button className={`lg:btn-wide text-white w-full ${type === "create" ? "btn-info" : "btn-warning"}`} type='submit'>{type === "create" ? "Tambah" : "Ubah"}</Button>
            </div>
        </form>
    )
}

export default FormLapanganTersedia