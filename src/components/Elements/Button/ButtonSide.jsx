import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const ButtonSide = ({className, children, href, onClick }) => {
    
    const pathname = usePathname()
    
    return (
        <Link className={`btn btn-outline border-none ${className} hover:bg-white hover:text-success ${"/" + pathname.split("/")[1] == href.split("?")[0] ? "bg-white text-success font-semibold" : "text-white"}`} href={href} onClick={onClick}>
            <div className="inline-flex gap-2 w-full items-center justify-start">
                {children}
            </div>
        </Link>
    )
}

export default ButtonSide