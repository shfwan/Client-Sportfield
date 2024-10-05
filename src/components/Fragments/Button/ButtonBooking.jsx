import ModalLayout from '@/components/Layouts/ModalLayout'
import { IoPulse } from 'react-icons/io5'
import ListBookingLapangan from '../List/ListBookingLapangan'

const ButtonBooking = () => {
    const handleBtnOrder = () => {
        document.getElementById("orderManual").showModal()

    }

    return (
        <>
            <span className="bg-success p-4 rounded-full w-fit h-fit cursor-pointer hover:scale-105 transition-all" onClick={handleBtnOrder}><IoPulse color='white' size={36} /></span>
            <ModalLayout id="orderManual" title="Booking Lapangan" onClick={() => document.getElementById("orderManual").close()}>
                <ListBookingLapangan />
            </ModalLayout>
        </>
    )
}

export default ButtonBooking