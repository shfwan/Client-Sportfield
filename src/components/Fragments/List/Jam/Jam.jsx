import React, { useState } from 'react'
import { CheckboxButton } from '../../CheckboxButton'
import { useOrderStore } from '@/store/orderStore'

const Jam = ({item}) => {
    const [setJam, removeJam] = useOrderStore((state) => [state.setJam, state.removeJam])
    const [isChecked, setChecked] = useState()

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
            onChange={(event) => setChecked(event.target.checked)}>
            {item.open} {item.close}
        </CheckboxButton>
    )
}

export default Jam