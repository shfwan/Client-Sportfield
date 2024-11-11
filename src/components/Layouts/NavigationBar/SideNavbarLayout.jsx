"use client"

import ButtonSide from "@/components/Elements/Button/ButtonSide"
import ImagePreview from "@/components/Elements/Image"
import { usePostLogout } from "@/features/auth"
import { useStorePublic } from "@/store/storePublic"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { Home, Menu, X } from "react-feather"
import { LuClipboardList, LuShoppingCart, LuLogOut, LuUser, LuUserCircle, LuHistory } from "react-icons/lu"
import { SlOptionsVertical } from "react-icons/sl"

const SideNavbarLayout = ({ children }) => {
    const { data: session } = useSession()
    const [isMenu, setMenu] = useStorePublic((state) => [state.isMenu, state.setMenu])



    return (
        <div className={`flex flex-row lg:min-h-screen lg:relative lg:w-fit z-${isMenu ? 50 : 0}`}>
            <nav className="flex items-center justify-start gap-4 lg:hidden bg-success sticky md:fixed p-4 min-w-full z-20">
                <label className="btn btn-circle bg-transparent border-none swap swap-rotate">
                    {/* this hidden checkbox controls the state */}
                    <input type="checkbox" />

                    {/* hamburger icon */}
                    <svg
                        color="white"
                        className="swap-off fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 512 512"
                        onClick={() => setMenu(!isMenu)}>
                        <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
                    </svg>

                    {/* close icon */}
                    <svg
                        color="white"
                        className="swap-on fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 512 512"
                        onClick={() => setMenu(!isMenu)}>
                        <polygon
                            points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
                    </svg>
                </label>
                <Link href='/' className='inline-flex items-center justify-center hover:scale-[101%] transition-all'>
                    <h1 className=' text-2xl text-white font-bold '>SportFields</h1>
                </Link>
            </nav>
            <aside className={`h-full top-16 lg:top-0 ${isMenu ? "-translate-x-0" : "-translate-x-64"} lg:translate-x-0 transition-all fixed ease-linear lg:relative w-fit z-50 max-w-64 min-w-64`}>
                <nav className='h-full flex flex-col bg-success/70 lg:bg-success backdrop-blur-sm border-r shadow-sm p-4 gap-4'>

                    <Link href='/' className='hidden lg:inline-flex items-center justify-center hover:scale-[101%] transition-all'>
                        <figure className="aspect-square max-w-20">
                            <ImagePreview src='/Logo.png' />
                        </figure>
                        <h1 className=' text-3xl text-white font-semibold '>SportFields</h1>
                    </Link>

                    <ButtonSide className="w-full" onClick={() => setMenu(!isMenu)} href="/dashboard"><Home size={26} />Dashboard</ButtonSide>
                    <ButtonSide className="w-full" onClick={() => setMenu(!isMenu)} href="/management"><LuClipboardList size={26} />Lapangan</ButtonSide>
                    <ButtonSide className="w-full" onClick={() => setMenu(!isMenu)} href="/pemesanan"><LuShoppingCart size={26} />Pesanan</ButtonSide>
                    <ButtonSide className="w-full" onClick={() => setMenu(!isMenu)} href="/riwayat"><LuHistory size={26} />Riwayat</ButtonSide>

                    {/* Profil */}
                    <div className="hidden mt-auto lg:flex items-center justify-between relative bg-white  rounded-md w-full h-fit p-2">
                        <div className="dropdown dropdown-right dropdown-end w-full h-full">
                            <div tabIndex={0} role="button" className="inline-flex gap-x-4 w-full h-full items-center justify-start">
                                <div className="avatar">
                                    <div className='max-w-10 rounded-full'>
                                        <ImagePreview className=' aspect-square' width={35} src={`${process.env.NEXT_PUBLIC_API}/api/v1/user/picture/${session?.user.picture}`} alt="" />
                                    </div>
                                </div>
                                <span className='text-lg text-black font-semibold'>{session?.user.fullname.split(" ")[0]}</span>
                            </div>
                            <div className="dropdown-content menu translate-x-10 translate-y-3 rounded-md bg-base-100 z-[1] min-w-52 p-2 shadow gap-2 text-white">
                                <Link
                                    href="/profil"
                                    className="btn text-gray-400 btn-outline border-none w-full justify-start hover:bg-success"
                                >
                                    <LuUserCircle size={26} />Profil
                                </Link>
                                <button
                                    className="btn text-red-500 btn-outline border-none w-full justify-start hover:bg-red-500"
                                    onClick={usePostLogout}
                                >
                                    <LuLogOut size={26} />Keluar
                                </button>
                            </div>
                        </div>
                    </div>
                </nav>
            </aside>
        </div>
    )
}

export default SideNavbarLayout