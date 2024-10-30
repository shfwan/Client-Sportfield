import { faker } from '@faker-js/faker'

const GalleryLapanganLayout = () => {
    return (
        <div>
            <div className="container rounded-md relative p-2 border overflow-hidden">
                <div className="grid grid-cols-4 gap-1 w-full h-full whitespace-nowrap">
                    {
                        Array.from({ length: 9 }).map((_, i) => (
                            <img key={i} className="rounded-md" src={faker.image.url()} loading="lazy" />
                        ))
                    }
                </div>
                <div className="absolute bottom-0 h-40 w-full bg-gray-500 bg-opacity-50 backdrop-blur-sm flex items-end justify-center p-4">
                    <Button className="text-white h-fit w-fit  border-2 btn btn-success bg-opacity-50 hover:bg-opacity-70 p-3 rounded-full text-white">Load more..</button>
                </div>
            </div>
        </div>
    )
}

export default GalleryLapanganLayout