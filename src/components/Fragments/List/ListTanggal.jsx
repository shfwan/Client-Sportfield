import React from 'react'
import DropdownLayout from '../../Layouts/DropdownLayout'
import { Calendar } from 'react-feather'
import AppCalendar from '@/components/Fragments/Calendar/AppCalendar'
import { RadioButton, RadioGroup } from '../RadioButton'
import { useOrderStore } from '@/store/orderStore'


const ListTanggal = () => {
    const tanggal = new Date()
    const [date, setDate] = useOrderStore((state) => [state.date, state.setDate])

    return (
            <div className="inline-flex items-start justify-start gap-4">
                <RadioGroup value={date} onChange={(e) => setDate(e.target.value)}>
                    {
                        Array.from({ length: 7 }).map((_, i) => (
                            <RadioButton key={i} value={tanggal.getDate() + i}>{tanggal.getDate() + i}</RadioButton>
                        ))
                    }
                </RadioGroup>
                <DropdownLayout className="bg-white absolute -translate-x-[28.9rem] w-[21rem] md:translate-x-0 md:w-fit mt-20 z-50" icon={<Calendar />} >
                    <AppCalendar />
                </DropdownLayout>
            </div>
    )
}

export default ListTanggal