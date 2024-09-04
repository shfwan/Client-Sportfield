import React from 'react'
import ModalLayout from '../Layouts/ModalLayout'
// import FormPembayaran from '@/components/Fragments/Form/FormPembayaran'
import { useOrderStore } from '@/store/orderStore'
import ImagePreview from '../Elements/Image'
import { faker } from '@faker-js/faker'
import Button from '../Elements/Button'
// import ListJamLapangan from './List/Jam/ListJamLapangan'

const Pembayaran = () => {
    const [isOrder, setOrder] = useOrderStore((state) => [state.isOrder, state.setOrder])
    
    return (
        <ModalLayout className="bg-white" open={isOrder} onClick={() => setOrder(!isOrder)} isBtnX={false}>
            <div className='flex flex-col gap-4'>
                <div className='flex flex-row gap-4'>
                    <figure className='max-w-[20rem]'>
                        <ImagePreview className="rounded-md" src={faker.image.url()} alt="pembayaran" />
                    </figure>
                    <div className='flex flex-col max-w-72'>
                        <h2>Lapangan 1</h2>
                        <h3>Futsal</h3>
                        <h3>Rp. 100.000</h3>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi totam perspiciatis, aspernatur ullam facilis quisquam porro tempora ducimus, tempore nisi odit explicabo placeat, quis voluptate quidem ut officiis suscipit id.</p>
                    </div>
                </div>
                {/* <ListJamLapangan  /> */}
                <div className='grid grid-cols-5 gap-2'>
                    {
                        Array.from({length: 10}).map((_, i) => (
                            <Button className="btn-info" key={i}>1</Button>
                        ))
                    }
                </div>
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
                <Button onClick={() => setOrder(!isOrder)} className="btn-success">Checkout</Button>
            </div>
            {/* {
                open ? (
                    <FormPembayaran onClick={() => setOrder(!isOrder)} />
                ) : ""
            } */}
        </ModalLayout>
    )
}

export default Pembayaran