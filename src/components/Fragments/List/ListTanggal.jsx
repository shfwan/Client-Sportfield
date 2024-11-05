import React, { useState } from 'react'
import DropdownLayout from '../../Layouts/DropdownLayout'
import { Calendar } from 'react-feather'
import AppCalendar from '@/components/Fragments/Calendar/AppCalendar'
import { RadioButton, RadioGroup } from '../RadioButton'
import { useOrderStore } from '@/store/orderStore'
import dayjs from 'dayjs'
import { generateDate } from '../Calendar/calendar'
import Button from '@/components/Elements/Button'


const ListTanggal = () => {
    const tanggal = new Date()
    const [date, setDate] = useOrderStore((state) => [state.date, state.setDate])    

    const hari = [
        "Minggu",
        "Senin",
        "Selasa",
        "Rabu",
        "Kamis",
        "Jumat",
        "Sabtu",
    ]

    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "Sep",
        "Okt",
        "Nov",
        "Des",
    ]

    const currentDate = dayjs();
    const [today, setToday] = useState(currentDate);
    

    return (
        <div className='w-full flex flex-col items-center justify-start'>
            <div className="inline-flex items-start justify-start gap-4 w-full">
                <RadioGroup value={date} onChange={(e) => setDate(e.target.value)}>
                    <div className=' overflow-x-scroll no-scrollbar p-1'>
                        <div className="flex flex-row gap-4 w-full">
                            {
                                generateDate(today.month(), today.year()).map(
                                    ({ date:tanggal }, index) => {
                                        const checkDate = currentDate.date() > tanggal.date()
                                        const checkMonth = currentDate.month() > tanggal.month()

                                        const disableDate = !checkMonth ? checkDate ? "text-gray-400": "text-gray-800" : "text-gray-400"
                                        const disableDateBtn = !checkMonth ? checkDate ? "btn-disabled": "" : "btn-disabled"
                                        
                                        return (
                                            <RadioButton className={disableDateBtn} key={index} value={tanggal.toDate().toLocaleDateString()}>
                                                <span className='flex items-center justify-center flex-col gap-2'>
                                                    <h2 className='text-gray-400 text-sm' htmlFor="">{hari[tanggal.day()]}</h2>
                                                    <h2 className={`${disableDate} text-base`} htmlFor="">{tanggal.toDate().toLocaleDateString().split("/")[1]} {months[tanggal.toDate().toLocaleDateString().split("/")[0] - 1]}</h2>
                                                </span>
                                            </RadioButton>
                                        );
                                    })
                            }
                        </div>
                    </div>
                </RadioGroup>
                <DropdownLayout className="bg-white absolute w-[21rem] md:-translate-x-52  md:w-fit mt-24 z-50" icon={<Calendar />} title="Calendar" >
                    <AppCalendar />
                </DropdownLayout>
            </div>
        </div>
    )
}

export default ListTanggal