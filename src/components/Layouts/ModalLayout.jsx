import { useEffect } from "react"
import { X } from "react-feather"

const ModalLayout = ({ id, title, children, onClick, btnX = true }) => {
    return (
        <dialog id={id} className="modal bg-black/30 ">
            <div className="relative">
                <span className={`absolute top-0 -right-10 cursor-pointer hover:scale-105 hover:bg-black/30 rounded-full transition-all ${btnX ? "visible" : "hidden"}`} onClick={onClick}><X size={26} color="white" /></span>
                <div className="modal-box max-w-7xl min-w-full">
                    <h3 className="font-bold text-xl mb-3 text-center w-full">{title}</h3>
                    <hr />
                    <br />
                    {children}
                </div>
            </div>
        </dialog>
    )
}

export default ModalLayout