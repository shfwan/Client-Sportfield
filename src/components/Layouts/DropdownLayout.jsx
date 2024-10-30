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
        <div className={`flex flex-col gap-4 w-fith-full`}>
            <Button className="text-white  btn-info p-4 h-full" onClick={() => setDropdown(!isDropdown)}>{icon}{title}</Button>
            {isDropdown && renderContentDropdown()}
        </div>
    )
}

export default DropdownLayout