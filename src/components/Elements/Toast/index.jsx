import { useEffect, useState } from "react"

const Toast = ({ className, children }) => {
    const [msg, setMsg] = useState(null)
    useEffect(() => {
        const timer = setTimeout(() => {
            setMsg(null)
        }, 8000)
        if (msg) {
            return () => clearTimeout(timer)
        }
    }, [msg])

    return msg ? (
        <div className={`fixed w-fit bottom-4 transition-opacity left-4 alert text-white rounded-md ${className}`}>
            <span>{children}</span>
        </div>
    ) : ""
}

export default Toast