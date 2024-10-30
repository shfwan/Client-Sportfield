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
    const [selectDate, setSelectDate] = useState(currentDate);

    // generateDate()[0].date.

    console.log();
    

    return (
        <div className='w-full flex flex-col items-center justify-start'>
            <div className="inline-flex items-start justify-start gap-4 w-full">
                <RadioGroup value={date} onChange={(e) => setDate(e.target.value)}>
                    <div className=' overflow-x-scroll no-scrollbar p-1'>
                        <div className="flex flex-row gap-4 w-full">
                            {
                                generateDate(today.month(), today.year()).map(
                                    ({ date, currentMonth, today }, index) => {
                                        console.log(date.toDate().toLocaleDateString().split("/"));
                                        
                                        return (
                                            <RadioButton key={index} value={date.toDate().toLocaleDateString()}>
                                                <span className='flex items-center justify-center flex-col gap-2'>
                                                    <label className='text-gray-400 text-sm' htmlFor="">{hari[date.day()]}</label>
                                                    <label className='text-gray-800 text-base' htmlFor="">{date.toDate().toLocaleDateString().split("/")[1]} {months[date.toDate().toLocaleDateString().split("/")[0] - 1]}</label>
                                                </span>
                                            </RadioButton>
                                        );
                                    })
                            }
                        </div>
                    </div>
                </RadioGroup>
                <DropdownLayout className="bg-white absolute -translate-x-[28.9rem] w-[21rem] md:translate-x-0 md:w-fit mt-20 z-50" icon={<Calendar />} title="Calendar" >
                    <AppCalendar />
                </DropdownLayout>
            </div>
        </div>
    )
}

export default ListTanggal