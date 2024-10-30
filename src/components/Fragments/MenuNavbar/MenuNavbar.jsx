import Button from '@/components/Elements/Button'
import ButtonActive from '@/components/Elements/Button/ButtonActive'
import { usePostLogout } from '@/features/auth'
import { useStorePublic } from '@/store/storePublic'
import { signIn, useSession } from 'next-auth/react'
const MenuNavbar = () => {
    const { status } = useSession()
    const [isMenu, setMenu] = useStorePublic((state) => [state.isMenu, state.setMenu])

    return (
        <div className={`flex-col flex h-fit absolute md:hidden top-16 uppercase p-4 gap-4 backdrop-blur-lg bg-success/70 inset-0 -z-50 transition-all ease-in-out ${isMenu ? "-translate-y-0" : "-translate-y-80"}`}>
            <div className='flex flex-col w-full gap-4'>
                <ButtonActive className="btn-outline" onClick={() => setMenu(!isMenu)} to="/" >Home</ButtonActive>
                <ButtonActive className="btn-outline" onClick={() => setMenu(!isMenu)} to="/lapangan?page=1" >Lapangan</ButtonActive>
                <ButtonActive className="btn-outline" onClick={() => setMenu(!isMenu)} to="/pemesanan" >Pemesanan</ButtonActive>
                {
                    status === "authenticated" ? <Button className="text-white btn-error" onClick={() => usePostLogout}>Keluar</Button> : <Button className='btn-warning' onClick={() => signIn()}>Login</Button>
                }  
            </div>
        </div>
    )
}

export default MenuNavbar