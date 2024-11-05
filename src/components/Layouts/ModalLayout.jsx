import { useEffect } from "react"
import { X } from "react-feather"


const ModalLayout = ({ id, className = "min-h-fit", title, children }) => {    
    return (
        <dialog id={id} className="modal bg-black/30 ">
            {/* <div className="relative"> */}
            {/* <span className={`absolute top-0 -right-10 cursor-pointer hover:scale-105 hover:bg-black/30 rounded-full transition-all ${btnX ? "visible" : "hidden"}`} onClick={onClick}><X size={26} color="white" /></span> */}
            {/* </div> */}
            <div className={`modal-box min-w-fit ${className} `}>
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-xl">✕</button>
                </form>
                <h3 className="font-bold text-xl mb-3 text-center w-full">{title}</h3>
                <hr />
                <br />
                {children}
            </div>
        </dialog>
    )
}

export default ModalLayout