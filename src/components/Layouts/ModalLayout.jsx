import { useEffect } from "react"
import { X } from "react-feather"

const ModalLayout = ({ id, title, children, onClick, btnX = true }) => {
    return (
        <dialog id={id} className="modal ">
            <div className="modal-box w-11/12 max-w-fit">
                <h3 className="font-bold text-xl mb-3 text-center w-full">{title}</h3>
                <hr />
                <span className={`absolute top-4 right-4 cursor-pointer ${btnX ? "visible" : "hidden"}`} onClick={onClick}><X size={32} color="gray" /></span>
                <br />
                {children}
            </div>
        </dialog>
    )
}

export default ModalLayout