import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import React from 'react'

const Pagination = ({ item }) => {
    const router = useRouter()
    const query = useSearchParams()

    const numberPage = []

    for (let i = 0; i < item?.data.totalPage; i++) {
        numberPage.push(i + 1)
    }

    const handleNextButton = () => {
        router.push(`?page=${(parseInt(query.get("page")) + 1)}`)
    }

    const handleBackButton = () => {
        router.push(`?page=${(parseInt(query.get("page")) - 1)}`)
    }

    return (
        <div className="join">
            <button className={`join-item btn btn-outline ${item?.data.prevPage ? "" : "btn-disabled"}`} onClick={handleBackButton}>Back</button>
            {
                numberPage.map((item, index) => (
                    <button
                        key={index}
                        onClick={() => router.push(`/lapangan?page=${item}`)}
                        className={`join-item btn btn-outline ${parseInt(query.get("page")) === item ? "btn-active" : ""}`}>
                        {item}
                    </button>
                ))
            }
            <button className={`join-item btn btn-outline ${item?.data.nextPage ? "" : "btn-disabled"}`} onClick={handleNextButton}>Next</button>
        </div>
    )
}

export default Pagination