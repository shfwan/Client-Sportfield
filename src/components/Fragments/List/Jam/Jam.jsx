import React, { useState } from 'react'
import { CheckboxButton } from '../../CheckboxButton'
import { useOrderStore } from '@/store/orderStore'

const Jam = ({ item }) => {
    const [setJam, removeJam] = useOrderStore((state) => [state.setJam, state.removeJam])
    const [isChecked, setChecked] = useState(false)
    
    const handleInput = () => {
        if (isChecked) {   
            console.log(JSON.parse(JSON.stringify(item)));
                     
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
            <div className='inline-flex justify-center gap-4 min-w-24'>
                <label className='text-md font-bold' htmlFor="">{item.open}</label>
                <label className='text-md font-bold' htmlFor="">{item.close}</label>
            </div>
        </CheckboxButton>
    )
}

export default Jam