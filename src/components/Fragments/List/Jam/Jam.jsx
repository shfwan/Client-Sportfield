import React, { useState } from 'react'
import { CheckboxButton } from '../../CheckboxButton'
import { useOrderStore } from '@/store/orderStore'
import { ToRupiah } from '@/lib/toRupiah'

const Jam = ({ item }) => {
    const [setJam, removeJam] = useOrderStore((state) => [state.setJam, state.removeJam])
    const [isChecked, setChecked] = useState(false)

    const handleInput = () => {
        if (isChecked) {

            setJam(JSON.parse(JSON.stringify(item)))
        } else {
            removeJam(item)
        }
    }

    // Render List Checkbox Jam
    return (
        <CheckboxButton key={item.id}
            value={JSON.stringify(item)}
            onInput={handleInput}
            isChecked={isChecked}
            disabled={!item.isAvailable}
            onChange={(event) => setChecked(!isChecked)}>
            <div className='flex flex-col gap-2 p-3'>
                <label className={`font-semibold text-xs ${!item.isAvailable ? "text-gray-400" : isChecked ? "text-success" : "text-gray-400"} }`} htmlFor="">60 menit</label>
                <div className='inline-flex justify-center gap-4 min-w-24 w-full'>
                    <label className={`text-[17px] ${!item.isAvailable ? "text-gray-400" : isChecked ? "text-success" : "text-gray-700"}  font-bold`} htmlFor="">{item.open}</label>
                    <label className={`text-[17px] ${!item.isAvailable ? "text-gray-400" : isChecked ? "text-success" : "text-gray-700"}  font-bold`} htmlFor="">{item.close}</label>
                </div>
                <label className={`text-lg font-normal ${!item.isAvailable ? "text-gray-400" : isChecked ? "text-success" : "text-gray-700"} `} htmlFor="">{ToRupiah(50000)}</label>
            </div>
        </CheckboxButton>
    )
}

export default Jam