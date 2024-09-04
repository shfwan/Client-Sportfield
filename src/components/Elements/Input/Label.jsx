const Label = ({ htmlFor, children }) => {
    return (
        <label className='label text-black font-semibold text-xl' htmlFor={htmlFor}>{children}</label>
    )
}

export default Label