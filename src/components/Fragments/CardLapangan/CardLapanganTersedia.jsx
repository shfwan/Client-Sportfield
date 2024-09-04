import React, { useEffect, useState } from 'react'
import CardLapangan from './CardLapangan'
import Caraousel from '../Caraousel/Caraousel'
import ImagePreview from '@/components/Elements/Image'
import Button from '@/components/Elements/Button'
import Pembayaran from '../Pembayaran'
import DropdownLayout from '@/components/Layouts/DropdownLayout'
import ListJamLapangan from '../List/Jam/ListJamLapangan'
import { Clock, Edit, Trash2 } from 'react-feather'
import { useOrderStore } from '@/store/orderStore'
import { faker } from '@faker-js/faker'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Swal from 'sweetalert2'
import useAxiosAuth from '@/hooks/useAxiosAuth'
import { useDeleteLapanganTersedia, useFetchLapanganTersedia, useUpdateLapanganTersedia } from '@/features/detailLapangan'
import { useFormik } from 'formik'
import ModalLayout from '@/components/Layouts/ModalLayout'
import InputForm from '@/components/Elements/Input'
import Textarea from '@/components/Elements/Textarea'
import SelectInput from '@/components/Elements/Select Input'

const CardLapanganTersedia = ({ lapanganTersedia }) => {

    const [
        date,
        jam,
        isOrder,
        setOrder
    ] = useOrderStore((state) => [
        state.date,
        state.jam,
        state.isOrder,
        state.setOrder
    ])

    const slides = [
        faker.image.url(),
        faker.image.url(),
        faker.image.url(),
    ]

    const handleOrderClick = () => {
        setOrder(!isOrder)
    }

    const [isJam, setIsJam] = useState(false)
    const handleJamClick = () => {
        setIsJam(!isJam)
    }

    useEffect(() => { setIsJam(false) }, [date])

    const queryClient = useQueryClient()
    const { mutate: deleteLapanganTersedia, isPending } = useDeleteLapanganTersedia({
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['fetch.lapanganTersedia'] })
        }
    })

    const handleRemoveClick = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",

        }).then((result) => {
            if (result.isConfirmed) {
                deleteLapanganTersedia(lapanganTersedia.id)
                if (isPending) {
                    Swal.fire({
                        //   title: "Deleted!",
                        // text: "Your file has been deleted.",
                        //   icon: "success",
                        html: "Mohon Tunggu",
                        allowOutsideClick: false,
                        showConfirmButton: false,
                        willOpen: () => {
                            Swal.showLoading()
                        }
                    });
                } else {
                    Swal.fire({
                        icon: "success",
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                    })
                }
            }
        });
    }


    const [add, setAdd] = useState(false)

    const handleUpdateClick = () => {
        setAdd(!add)
    }

    const { mutate: updateLapanganTersedia } = useUpdateLapanganTersedia({
        onSuccess: () => {
            setAdd(!add)
            queryClient.invalidateQueries({ queryKey: ['fetch.lapanganTersedia'] })
        }
    })

    const formik = useFormik({
        initialValues: {
            name: lapanganTersedia.name,
            description: "",
            statusLapangan: lapanganTersedia.statusLapangan,
            type: lapanganTersedia.type,
            price: lapanganTersedia.price,
        },
        onSubmit: async () => {
            event.preventDefault()

            updateLapanganTersedia({
                id: lapanganTersedia.id,
                name: formik.values.name,
                description: formik.values.description,
                statusLapangan: formik.values.statusLapangan,
                type: formik.values.type,
                price: parseInt(formik.values.price),
            })

        }
    })

    const handleFormikInput = () => {
        formik.setFieldValue(event.target.name, event.target.value)
    }

    return (
        <>
            <CardLapangan key={lapanganTersedia.id} className="w-full h-fit gap-4 items-start rounded-md sm:flex-row flex-col p-3 shadow-none border-2">
                <CardLapangan.Header>
                    <Caraousel className='md:max-w-[20rem]' autoSlide={false} maxWidth="100%">
                        {
                            slides.map((item, i) => (
                                <ImagePreview
                                    key={i}
                                    src={item}
                                    alt="Shoes"
                                    loading="lazy"
                                />
                            ))
                        }
                    </Caraousel>
                </CardLapangan.Header>
                <CardLapangan.Body className="flex flex-col gap-4 md:w-fit w-full relative">
                    <label className="text-ellipsis overflow-hidden text-nowrap text-lg font-bold">{lapanganTersedia.name}</label>
                    <p>{lapanganTersedia.description}</p>
                    <label className="">Rp.<strong>{lapanganTersedia.price}</strong>/sesi</label>

                    <div className='inline-flex gap-x-4 relative justify-start '>
                        {/* Button Order */}
                        <Button className="btn-success" onClick={handleOrderClick}>Order sekarang</Button>

                        {/* Modal Order */}
                        <Pembayaran key={lapanganTersedia.id} />

                        {/* Dropdown Select Jam */}
                        {/* <DropdownLayout className="bg-white w-full absolute xl:relative gap-4 -translate-x-[9.3rem] md:-translate-x-[5.3rem] " icon={<Clock />} title="Pilih Jam" >
                        Render List
                    </DropdownLayout> */}

                        <Button className="btn-info" onClick={handleJamClick}>Pilih Jam</Button>
                    </div>
                    <div className={`border rounded-md p-4 ${isJam ? "visible" : "hidden"}`}>
                        <ListJamLapangan lapangan={lapanganTersedia} />
                    </div>
                    <div className='inline-flex gap-2'>
                        <Button className="btn-warning" onClick={handleUpdateClick}><Edit /></Button>
                        <Button className="btn-error" onClick={handleRemoveClick}><Trash2 /></Button>
                    </div>
                </CardLapangan.Body>
            </CardLapangan>
            <ModalLayout className="bg-white" open={add} onClick={() => setAdd(!add)}>
                <form onSubmit={formik.handleSubmit} action="#">
                    <div className="flex flex-col gap-4">

                        <InputForm value={formik.values.name} onChange={handleFormikInput} type="text" title="Name" name="name" />
                        <Textarea value={formik.values.description} name="description" title="Deskripsi" className="" placeholder="Deskripsi lapangan" onChange={handleFormikInput} />
                        <div className="flex justify-between">
                            <SelectInput value={formik.values.statusLapangan} name="statusLapangan" title="Status Lapangan" onChange={handleFormikInput}>
                                <option>Indoor</option>
                                <option>Outdoor</option>
                            </SelectInput>
                            <SelectInput value={formik.values.type} name="type" title="Type" onChange={handleFormikInput}>
                                <option>Badminton</option>
                                <option>Futsal</option>
                            </SelectInput>
                        </div>
                        <InputForm value={formik.values.price} onChange={handleFormikInput} type="number" title="Price" name="price" />
                    </div>
                    <div className="flex gap-4 mt-5">
                        <button className="btn btn-wide btn-error font-semibold text-white text-lg" type="button" onClick={() => setAdd(!add)}>Cancel</button>
                        <button className="btn btn-wide btn-warning font-semibold text-white text-lg" type="submit">Ubah</button>
                    </div>
                </form>
            </ModalLayout>
        </>
    )
}

export default CardLapanganTersedia