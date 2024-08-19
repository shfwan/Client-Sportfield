import { Menu } from 'react-feather'
import ButtonActive from '@/components/Elements/Button/ButtonActive'
const MenuNavbar = ({ showMenu, active }) => {

    return (
        <div>
            <ul className={
                active ? "flex-col flex h-fit fixed uppercase p-8 backdrop-blur-lg bg-success/60 inset-0 z-50 md:hidden" : "hidden"
            }>
                <div className='hover:bg-white/30 rounded-md w-fit h-fit p-1'>
                    <Menu
                        className='text-white hover:text-success text-3xl'
                        onClick={showMenu}
                    />
                </div>
                <div className  ='flex flex-col items-center gap-y-6 text-2xl'>
                    <ButtonActive to="/" >Home</ButtonActive>
                    <ButtonActive to="/pemesanan" >Pemesanan</ButtonActive>
                    <ButtonActive to="/pemesanan" >Riwayat</ButtonActive>
                </div>
            </ul>
        </div>
    )
}

export default MenuNavbar