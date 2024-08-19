import React, { useEffect, useState } from 'react'
import CardLapangan from './CardLapangan'
import Caraousel from '../Caraousel/Caraousel'
import ImagePreview from '@/components/Elements/Image'
import Button from '@/components/Elements/Button'
import Pembayaran from '../Pembayaran'
import DropdownLayout from '@/components/Layouts/DropdownLayout'
import ListJamLapangan from '../List/Jam/ListJamLapangan'
import { Clock } from 'react-feather'
import { useOrderStore } from '@/store/orderStore'
import { faker } from '@faker-js/faker'
import { useQuery } from '@tanstack/react-query'
import Swal from 'sweetalert2'

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
        // if (date != "" && jam.length > 0) {
        // } else {
        //     Swal.fire({
        //         icon: "error",
        //         title: "Oops...",
        //         text: "Tanggal atau Jam belum dipilih",
        //     })
        // }
    }

    const [isJam, setIsJam] = useState(false)
    const handleJamClick = () => {
        setIsJam(!isJam)
    }

    useEffect(() => { setIsJam(false) }, [date])

    return (
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
            </CardLapangan.Body>
            <CardLapangan.Footer>
            </CardLapangan.Footer>
        </CardLapangan>
    )
}

export default CardLapanganTersedia