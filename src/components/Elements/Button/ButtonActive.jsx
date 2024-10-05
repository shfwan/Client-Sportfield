import Link from "next/link"
import { usePathname } from "next/navigation"


const ButtonActive = ({ onClick, to, children }) => {
  const pathname = usePathname()

  return (
    <Link
      className={pathname == to ? "btn text-success bg-white min-w-56" : "btn btn-outline border-none  text-white font-semibold hover:scale-[101%] hover:font-bold"} href={to}
      onClick={onClick}>
      {children}
    </Link>

  )
}

export default ButtonActive