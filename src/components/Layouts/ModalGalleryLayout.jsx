import React from 'react'

const ModalGalleryLayout = ({ id, children }) => {
    return (
        <dialog id={id} className="modal bg-black/30 ">            
            <div className='flex flex-col w-screen h-screen justify-center'>
                {children}
            </div>
        </dialog>
    )
}

export default ModalGalleryLayout