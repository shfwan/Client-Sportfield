import Button from '../../Elements/Button'
import ButtonActive from '@/components/Elements/Button/ButtonActive'
import MenuNavbar from '@/components/Fragments/MenuNavbar/MenuNavbar'
import { useState } from 'react'
import { Menu } from 'react-feather'
import { useGetProfil } from '@/features/profil'
import { useStoreSportField } from '@/store/store'
import { usePostLogout } from '@/features/auth'
import ImagePreview from '@/components/Elements/Image'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { signIn, useSession } from 'next-auth/react'
import { jwtDecode } from 'jwt-decode'

const TopNavbarLayout = () => {
    const { data: session, status } = useSession()
    const [active, setActive] = useState(false)
    const showMenu = () => {
        setActive(!active)
    }
    const router = useRouter()

    const pathname = usePathname()

    const renderStatusLogin = () => {
        const handleLogin = () => {
            signIn()
        }

        if (status === "authenticated") {
            return (
                <div className='inline-flex gap-4'>
                    <Button className="whitespace-nowrap w-36  shadow-xl" onClick={() => router.push("/profil")}>
                        <figure className='flex items-center gap-4 max-w-10'>
                            <ImagePreview className='rounded-full aspect-square' width={35} src={`${process.env.NEXT_PUBLIC_API}/api/v1/user/picture/${session?.user.picture}`} alt="" />
                        </figure>
                        <span className='whitespace-nowrap text-black '>{session?.user.fullname.split(" ")[0]}</span>
                    </Button>
                    <Button className='btn-error' onClick={usePostLogout}>Keluar</Button>
                </div>

            )
        } else {
            return <Button className = 'btn-warning' onClick = { handleLogin }>Login</Button>
        }

    }

    return (
        <div className='flex w-full h-fit bg-success items-center justify-center sticky top-0 shadow-md p-2 z-20'>
            <nav className='w-[95%]'>
                <ul className='flex w-full flex-row items-center justify-between gap-4 px-6'>
                    <div className='relative sm:hidden scale-150'>
                        <Menu
                            className='text-white sm:scale-150 cursor-pointer '
                            onClick={showMenu}
                        />
                    </div>
                    <Link href='/' className='w-fit hidden md:block'>
                        <h1 className=' text-3xl text-white font-semibold hover:scale-[101%] transition-transform'>SportFields</h1>
                    </Link>
                    <div className='hidden sm:block'>
                        <div className='flex w-fit gap-4 items-center'>
                            <Link className={pathname == "/" ? "btn text-success bg-white" : " text-white font-semibold hover:scale-[101%] hover:font-bold"} href="/">Home</Link>
                            <Link href="/lapangan?page=1" className={pathname == "/lapangan" ? "btn text-success bg-white" : " text-white font-semibold hover:scale-[101%] hover:font-bold"}>Lapangan</Link>
                            {
                                status == "authenticated" ? (
                                    <>
                                        <Link className={pathname == "/pemesanan" ? "btn text-success bg-white" : " text-white font-semibold hover:scale-[101%] hover:font-bold"} href="/pemesanan">Pemesanan</Link>
                                        <Link className={pathname == "/riwayat" ? "btn text-success bg-white" : " text-white font-semibold hover:scale-[101%] hover:font-bold"} href="/riwayat" >Riwayat</Link>
                                    </>
                                ) : <></>
                            }
                        </div>
                    </div>
                    {renderStatusLogin()}
                </ul>
                <MenuNavbar showMenu={showMenu} active={active} />
            </nav>
        </div>
    )
}

export default TopNavbarLayout