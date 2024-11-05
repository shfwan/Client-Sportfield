import React from 'react'

const GalleryMasonryLayout = ({ children }) => {
    return (
        <div className='columns-1 sm:columns-2 md:columns-3 lg:columns-4  gap-4 p-4 rounded-md w-full space-y-4'>
            {children}
        </div>
    )
}

export default GalleryMasonryLayout