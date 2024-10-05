import React from 'react'

const GalleryMasonryLayout = ({ children }) => {
    return (
        <div className='columns-4 md:columns-5 mx-auto gap-2 space-y-2 p-4 rounded-md'>
            {children}
        </div>
    )
}

export default GalleryMasonryLayout