import React from 'react'

const GalleryMasonryLayout = ({ children }) => {
    return (
        <div className='columns-2 md:columns-3 mx-auto gap-2 space-y-2 p-4 rounded-md w-full'>
            {children}
        </div>
    )
}

export default GalleryMasonryLayout