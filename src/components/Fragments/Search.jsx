// import { useRouter } from 'next/router'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const Search = () => {
    const router = useRouter()
    const [search, setSearch] = useState('')
    
    
    const handleSearch = () => {
        router.push(`/home?search=${search}`)
        // router.push({
        //     href: '/home',
        //     query: {
        //         search: search
        //     }
        // })
    }
    return (
        <div className='inline-flex max-w-2xl  gap-x-4'>
            <div className='border max-w-2xl'>
                <input className='input input-md w-full' type="search" name="search" id="" onChange={(e) => setSearch(e.target.value)} />
            </div>
            <button className='btn' type="button" onClick={handleSearch}>search</button>
        </div>
    )
}

export default Search