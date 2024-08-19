import { useEffect } from "react"
import { X } from "react-feather"

const ModalLayout = ({ className, open, children, onClick = () => { }, isBtnX }) => {
    useEffect(() => {
        if (open) {
            document.body.classList.add("overflow-hidden")
        } else {
            document.body.classList.remove("overflow-hidden")
        }
    }, [open])
    return (
        // Backdrop
        <div className={`fixed inset-0 flex z-40 justify-center backdrop-blur-sm items-center transition-colors ${open ? "visible bg-black/40" : "hidden"}`} onClick={onClick}>
            {/* Modal */}
            <div onClick={(event) => event.stopPropagation()} className={`${className} p-8 z-50 rounded-md w-fit h-fit relative ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}`} >
                {/* Content */}
                {children}

                {/* Button Exit */}
                <button className={`${isBtnX ? "visible" : "hidden"} w-fit h-fit absolute top-2 right-2 bg-opacity-100 bg-white rounded-full`} onClick={onClick}>
                    <X color="black" />
                </button>
            </div>
        </div>
    )
}

export default ModalLayout