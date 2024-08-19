import Link from "next/link"


const ButtonActive = ({ className, type = "button", to, children }) => {
  const Active = ({ isActive }) => {
    return {
      backgroundColor: isActive ? "white" : "transparent",
      color: isActive ? ["#14A44D"] : "white",
    }
  }

  return (
    <Link className={`btn font-semibold whitespace-nowrap ${className}`} type={type} href={to} >{children}</Link>
  )
}

export default ButtonActive