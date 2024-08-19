const PaginationLayout = (data) => {
    const numberPage = []

    for(let i = 0; i < data?.totalPage; i++) {
        numberPage.push(i + 1)
    }

    return (
        <div className="join">
            <button className={`join-item btn btn-outline ${data?.prevPage ? "" : "btn-disabled"}`}>Back</button>
            {
                numberPage.map((item, index) => (
                    <button key={index} className="join-item btn btn-outline">{item}</button>

                ))
            }
            <button className={`join-item btn btn-outline ${data?.nextPage ? "" : "btn-disabled"}`}>Next</button>
        </div>
    )
}

export default PaginationLayout