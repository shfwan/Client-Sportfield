import React, { useEffect } from 'react'
import ModalLayout from '../Layouts/ModalLayout'
import FormPembayaran from '@/components/Fragments/Form/FormPembayaran'
import { useOrderStore } from '@/store/orderStore'
import ImagePreview from '../Elements/Image'
import { faker } from '@faker-js/faker'
import Button from '../Elements/Button'
import ListJamLapangan from './List/Jam/ListJamLapangan'
import { useFormik } from 'formik'
import { useCheckOut } from '@/features/order'
import { useQueryClient } from '@tanstack/react-query'
// import ListJamLapangan from './List/Jam/ListJamLapangan'

const Checkout = ({ item }) => {


    useEffect(() => {
        const snapScript = process.env.NEXT_PUBLIC_SNAPSCRIPT
        const clientKey = process.env.NEXT_PUBLIC_CLIENT

        const script = document.createElement("script")
        script.src = snapScript
        script.setAttribute("data-client-key", clientKey)
        script.async = true

        document.body.appendChild(script)

        return () => {
            document.body.removeChild(script)
        }
    }, [])

    const [date, jam] = useOrderStore((state) => [state.date, state.jam])

    const [isOrder, setOrder] = useOrderStore((state) => [state.isOrder, state.setOrder])

    const { mutate: createOrder } = useCheckOut(
        {
            onSuccess: (data) => {
                console.log(data.data.data.token);
                window.snap.pay(data.data.data.token)
            }
        }
    )

    const handleSubmitForm = () => {
        event.preventDefault()
        const body = {
            id: item.id,
            lapanganId: item.lapanganId,
            jam: jam,
            date: date.toString()
        }
        createOrder(body)
    }
    return (
        <ModalLayout className="bg-white" open={isOrder} onClick={() => setOrder(!isOrder)} isBtnX={false}>
            <form onSubmit={handleSubmitForm} action="#">
                <div className='flex flex-col gap-4'>
                    <div className='flex flex-row gap-4'>
                        <figure className='max-w-[20rem]'>
                            <ImagePreview className="rounded-md" src={faker.image.url()} alt="pembayaran" />
                        </figure>
                        <div className='flex flex-col max-w-72'>
                            <h2>{item.name}</h2>
                            <h3>{item.type}</h3>
                            <h3>Rp. {item.price}</h3>
                            <p>{item.description}</p>
                        </div>
                    </div>
                    <ListJamLapangan lapangan={item} />
                    <div className='grid grid-cols-2'>
                        <div className='flex flex-col gap-2'>
                            <h2>Total</h2>
                            <h2>Total</h2>
                            <h2>Total</h2>
                            <h2>Total</h2>
                            <h2>Total</h2>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <h2>Rp. 100.000</h2>
                            <h2>Rp. 100.000</h2>
                            <h2>Rp. 100.000</h2>
                            <h2>Rp. 100.000</h2>
                            <h2>Rp. 100.000</h2>
                        </div>
                    </div>
                    <Button type="submit" className="btn-success">Checkout</Button>
                </div>
            </form>

        </ModalLayout>
    )
}

export default Checkout