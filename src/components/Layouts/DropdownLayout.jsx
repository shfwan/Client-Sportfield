import { useState } from 'react'
import Button from '../Elements/Button'

const DropdownLayout = ({ className, title, icon, children }) => {
    const [isDropdown, setDropdown] = useState(false)

    const renderContentDropdown = () => {
        return (
                <div className={`${className} card card-compact z-10  p-2 shadow`}>
                    <div className='card-body'>
                        {children}
                    </div>
                </div>
        )
    }
    return (
        <div className={`flex flex-col gap-4 w-fit h-full`}>
            <Button className=" btn-info w-fit" onClick={() => setDropdown(!isDropdown)}>{icon}{title}</Button>
            {isDropdown && renderContentDropdown()}
        </div>
    )
}

export default DropdownLayout