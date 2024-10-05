"use client"
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

    return (
        <div className="toast toast-bottom toast-end z-50 translate-x-72">
            <div className="alert alert-success text-white font-medium rounded-md">
                <span>Message sent successfully.</span>
            </div>
        </div>
    )
}

export default Toast