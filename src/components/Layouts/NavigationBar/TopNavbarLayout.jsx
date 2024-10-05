import Button from '../../Elements/Button'
import MenuNavbar from '@/components/Fragments/MenuNavbar/MenuNavbar'
import { Menu, X } from 'react-feather'
import { usePostLogout } from '@/features/auth'
import ImagePreview from '@/components/Elements/Image'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useStorePublic } from '@/store/storePublic'
import ButtonSide from '@/components/Elements/Button/ButtonSide'

const TopNavbarLayout = () => {
    const { data: session, status } = useSession()
    const router = useRouter()

    const [isMenu, setMenu] = useStorePublic((state) => [state.isMenu, state.setMenu])

    const renderStatusLogin = () => {

        if (status === "authenticated") {
            return (
                <div className="dropdown dropdown-bottom dropdown-end">
                    <figure tabIndex={0} role="button" className='flex items-center gap-4 max-w-12 border-4 rounded-full cursor-pointer'>
                        <ImagePreview className='rounded-full aspect-square' width={35} src={`${process.env.NEXT_PUBLIC_API}/api/v1/user/picture/${session?.user.picture}`} alt="" />
                    </figure>
                    <ul tabIndex={0} className="mt-5 dropdown-content space-y-2 menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                        <li>
                            <Button className='btn-success btn-outline min-w-32' onClick={() => router.push("/profil")}>Profil</Button>

                        </li>
                        <li>
                            <Button className='btn-error min-w-32' onClick={usePostLogout}>Keluar</Button>
                        </li>
                    </ul>
                </div>

            )
        } else {
            return (
                <div className='inline-flex gap-4'>
                    <Button className='hidden md:flex btn-warning min-w-32' onClick={() => signIn()}>Login</Button>
                    <Link href="/register" className='hidden md:flex btn text-white btn-outline hover:bg-warning hover:border-warning min-w-32'>Daftar</Link>
                </div>
            )
        }

    }

    return (
        <div className='flex w-full h-fit items-center justify-center sticky top-0 z-50 shadow-md'>
            <div className='bg-success w-full p-2'>
                <nav className='w-full'>
                    <ul className='flex w-full flex-row items-center justify-start gap-6 z-50'>
                        <div className='relative sm:hidden btn btn-outline btn-success'>
                            {
                                isMenu ? <X size={32} color='white' onClick={() => setMenu(!isMenu)} /> : <Menu size={32} color='white' onClick={() => setMenu(!isMenu)} />
                            }
                        </div>
                        <Link href='/' className='w-fit hidden md:inline-flex md:items-center md:justify-center md:gap-4'>
                            <figure className='aspect-auto max-w-12'>
                                <ImagePreview src="/Logo.png" />
                            </figure>
                            <h1 className='text-3xl text-white font-semibold hover:scale-[101%] transition-transform'>SportFields</h1>
                        </Link>
                        <div className='hidden sm:block'>
                            <div className='flex w-fit gap-4 items-center'>
                                <ButtonSide className="w-fit" href="/">Home</ButtonSide>
                                <ButtonSide className="w-fit" href="/lapangan?page=1">Lapangan</ButtonSide>
                                {
                                    status == "authenticated" ? (
                                        <ButtonSide className="w-fit" href="/pemesanan">Pemesanan</ButtonSide>
                                    ) : <></>
                                }
                            </div>
                        </div>
                        <div className='ml-auto'>
                            {renderStatusLogin()}
                        </div>
                    </ul>
                </nav>
            </div>
            <MenuNavbar />
        </div>
    )
}

export default TopNavbarLayout