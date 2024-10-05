const Button = ({className, type = "button", onClick, children}) => {
    
    return (
        <button
            className={`btn font-semibold text-white whitespace-nowrap ${className}`} 
            type={type}
            onClick={onClick}
            >
                {children}
        </button>
    )
}

export default Button