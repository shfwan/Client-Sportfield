import InputForm from '@/components/Elements/Input'
import SelectInput from '@/components/Elements/Select Input'
import Textarea from '@/components/Elements/Textarea'
import { usePostLapanganTersedia } from '@/features/detailLapangan'
import { useQueryClient } from '@tanstack/react-query'
import { useFormik } from 'formik'
import React from 'react'
import * as yup from 'yup'

const FormLapanganTersedia = ({ id, onClick }) => {
    const queryClient = useQueryClient()

    const { mutate: createLapanganTersedia } = usePostLapanganTersedia({
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['fetch.lapanganTersedia'] })
            onClick
        }
    })

    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
            statusLapangan: "",
            type: "",
            price: "",
        },
        onSubmit: async () => {
            event.preventDefault()

            createLapanganTersedia({
                id: id,
                name: formik.values.name,
                description: formik.values.description,
                statusLapangan: formik.values.statusLapangan,
                type: formik.values.type,
                price: parseInt(formik.values.price),
            })
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

    return (
        <form onSubmit={formik.handleSubmit} action="#">
            <div className="flex flex-col gap-4">

                <InputForm onChange={handleFormikInput} type="text" title="Name" name="name" />
                <Textarea name="description" title="Deskripsi" className="" placeholder="Deskripsi lapangan" onChange={handleFormikInput} />
                <div className="flex justify-between">
                    <SelectInput name="statusLapangan" title="Status Lapangan" onChange={handleFormikInput}>
                        <option>Indoor</option>
                        <option>Outdoor</option>
                    </SelectInput>
                    <SelectInput name="type" title="Type" onChange={handleFormikInput}>
                        <option>Badminton</option>
                        <option>Futsal</option>
                    </SelectInput>
                </div>
                <InputForm onChange={handleFormikInput} type="number" title="Price" name="price" />
            </div>
            <div className="flex gap-4 mt-5">
                <button className="btn btn-wide btn-error font-semibold text-white text-lg" type="button" onClick={onClick}>Cancel</button>
                <button className="btn btn-wide btn-success font-semibold text-white text-lg" type="submit">Tambah</button>
            </div>
        </form>
    )
}

export default FormLapanganTersedia