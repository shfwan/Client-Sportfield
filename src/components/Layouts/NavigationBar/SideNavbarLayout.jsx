// import { useNavigate } from 'react-router-dom'
// import Button from '../../Elements/Button'

const SideNavbarLayout = () => {
    // const navigate = useNavigate()
    return (
        <aside className='h-screen  fixed z-10'>
            <nav className='h-full flex flex-col bg-white  border-r shadow-sm'>
                <ul className='flex flex-col items-start w-full justify-center gap-4'>
                    <li className=' btn'>Home</li>
                    {/* <Button className='btn-outline w-full' onClick={() => navigate("/")}>Home</Button>
                    <Button className='btn-outline w-full' onClick={() => navigate("pemesanan")}>Pemesanan</Button> */}
                    {/* {
                        !isLoading ? (
                            <>
                                <Button className='btn-error' onClick={handleLogout}>Keluar</Button>
                                <Button className="btn-outline shadow-xl" onClick={() => navigate("profil")}>
                                    <figure className='flex items-center gap-4 text-black'>
                                        <img className='rounded-full' width={45} src={`${import.meta.env.VITE_API}/api/v1/user/picture/${dataProfil?.data.data.picture}`} alt="" />
                                        <span>{dataProfil?.data.data.fullname.split(" ")[0]}</span>
                                    </figure>
                                </Button>
                            </>
                        ) : <Button className='btn-warning' onClick={handleLogout}>Login</Button>
                    } */}
                </ul>
            </nav>
        </aside>
    )
}

export default SideNavbarLayout