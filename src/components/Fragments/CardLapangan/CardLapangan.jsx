1
const CardLapangan = ({ className, children, onClick = () => {} }) => {

    return (
        <div
            className={`card bg-base-100 ${className} shadow-md transition-all bg-white`}
            onClick={onClick}
        >
            {children}
        </div>
    )
}



const Header = ({children}) => {
    return (
        children
    )
}
const Body = ({ className, children }) => {
    return (
        <div className={className}>
            {children}
        </div>
    )
}
const Footer = ({children, className}) => {
    return (
        <div className={`card-actions justify-between p-4 ${className}`}>
            {children}
        </div>
    )
}

CardLapangan.Header = Header
CardLapangan.Body = Body
CardLapangan.Footer = Footer

export default CardLapangan