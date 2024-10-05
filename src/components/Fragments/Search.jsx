"use client"

import { useQueryClient } from '@tanstack/react-query'
import { useFormik } from 'formik'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { Search as SearchIcon } from 'react-feather'

const Search = () => {
    const queryClient = useQueryClient()
    const query = useSearchParams()
    const router = useRouter()
    
    const formik = useFormik({
        initialValues: {
            value: query.get("value") || ""
        },
        onSubmit: async () => {
            event.preventDefault()
            if(formik.values.value !== "") {
                router.push('?value=' + formik.values.value)
                queryClient.invalidateQueries()
            }
        }
    })

    const handleFormikInput = (event) => {
        formik.setFieldValue(event.target.name, event.target.value)
    }
    return (
        <form onSubmit={formik.handleSubmit}>
            <div className='flex items-center justify-between bg-white w-full mt-3 px-3 py-2 text-xl rounded-md shadow shadow-black/20 border border-white'>
                <input
                    name='value'
                    type='text'
                    placeholder='Search'
                    className='text-black bg-white w-full outline-none text-lg'
                    value={formik.values.value}
                    onChange={handleFormikInput}
                />
                <button className='btn btn-success w-fit px-2 h-fit' type="submit">
                    <SearchIcon color='white' size={24} />
                </button>
            </div>
        </form>
    )
}

export default Search